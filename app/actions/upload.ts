'use server';

import { revalidatePath } from 'next/cache';
import { createClient, createAdminClient } from '@/utils/supabase/server';
import { getSupabaseEnv } from '@/utils/supabase/env';
import type { ActionResult } from '@/lib/types';

export const UPLOAD_CATEGORIES = [
  'exam',
  'test',
  'quiz',
  'supplementary',
  'special',
  'notes',
  'assignment',
] as const;

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const BUCKET = 'course-content';

function sanitizeSegment(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9._ -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-.*/, '')
    .slice(0, 120);
}

async function requireAdmin(): Promise<ActionResult<{ userId: string }>> {
  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase is not configured yet.' };

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { error: 'Not signed in.' };

  const allowedEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const email = user.email?.toLowerCase() ?? '';
  const isAdminRole = (user.user_metadata as Record<string, unknown> | null)?.role === 'admin';

  if (!isAdminRole && (!email || !allowedEmails.includes(email))) {
    return { error: 'You do not have permission to upload documents.' };
  }

  return { data: { userId: user.id } };
}

export interface UploadDocumentInput {
  file: File;
  moduleCode: string;
  title: string;
  category: string;
  year?: string;
}

export async function uploadDocument(
  input: UploadDocumentInput,
): Promise<ActionResult<{ documentId: number }>> {
  if (!getSupabaseEnv()) {
    return { error: 'Supabase is not configured yet.' };
  }

  const adminCheck = await requireAdmin();
  if (adminCheck.error || !adminCheck.data) {
    return { error: adminCheck.error };
  }

  const { file, moduleCode, title, category, year } = input;

  if (!(UPLOAD_CATEGORIES as readonly string[]).includes(category)) {
    return { error: `Invalid category "${category}".` };
  }
  if (!file || file.size === 0) return { error: 'Please choose a file.' };
  if (file.size > MAX_FILE_SIZE) {
    return { error: 'File exceeds the 50MB limit.' };
  }

  const codeMatch = moduleCode.trim().toUpperCase().match(/^([A-Z]{2,5})\s*(\d{1,4}[A-Z]?)$/);
  if (!codeMatch) {
    return { error: 'Module code must look like "ALSS 101".' };
  }
  const [, prefix, number] = codeMatch;
  const fullCode = `${prefix} ${number}`;

  // Use the service-role client when available so uploads work even before
  // the caller's account has been promoted to admin via user metadata.
  const client = (await createAdminClient()) ?? (await createClient());
  if (!client) return { error: 'Supabase is not configured yet.' };

  // Make sure a matching subject exists (seed script normally creates these).
  const { data: subject } = await client
    .from('subjects')
    .select('id')
    .eq('prefix', prefix)
    .maybeSingle();

  if (!subject) {
    return { error: `No subject with prefix "${prefix}" exists yet. Run the seed script first.` };
  }

  // Upsert the course by code.
  const { data: existingCourse } = await client
    .from('courses')
    .select('id')
    .eq('code', fullCode)
    .maybeSingle();

  let courseId: number;
  if (existingCourse) {
    courseId = existingCourse.id;
  } else {
    const { data: newCourse, error: insertError } = await client
      .from('courses')
      .insert({
        subject_id: subject.id,
        code: fullCode,
        title: `${fullCode} Resources`,
        college: '',
        year: year ?? null,
      })
      .select('id')
      .single();
    if (insertError) return { error: insertError.message };
    courseId = newCourse.id;
  }

  // Upload the binary to storage.
  const safeCourse = sanitizeSegment(fullCode);
  const safeName = sanitizeSegment(file.name);
  const filePath = `${safeCourse}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await client.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) return { error: `Upload failed: ${uploadError.message}` };

  const { data: docRow, error: docError } = await client
    .from('documents')
    .insert({
      course_id: courseId,
      title: title.trim() || file.name,
      category,
      year: year?.trim() || null,
      file_path: filePath,
      file_type: file.name.split('.').pop()?.toLowerCase() ?? null,
      file_size: file.size,
      uploaded_by: adminCheck.data.userId,
    })
    .select('id')
    .single();

  if (docError) {
    // Roll back the orphaned storage object so the bucket stays clean.
    await client.storage.from(BUCKET).remove([filePath]);
    return { error: docError.message };
  }

  revalidatePath('/browse');
  revalidatePath('/');
  return { data: { documentId: docRow.id } };
}
