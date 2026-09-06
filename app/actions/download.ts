'use server';

import { createClient } from '@/utils/supabase/server';
import { getSupabaseEnv } from '@/utils/supabase/env';
import type { ActionResult } from '@/lib/types';

const DEFAULT_EXPIRY = 300;

export async function getDocumentDownloadUrl(
  documentId: number,
): Promise<ActionResult<string>> {
  if (!getSupabaseEnv()) {
    return { error: 'Supabase is not configured yet. Add your keys to .env.local.' };
  }

  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase is not configured yet.' };

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { error: 'Not signed in.' };

  const { data, error } = await supabase
    .from('documents')
    .select('file_path, title')
    .eq('id', documentId)
    .single();

  if (error || !data) return { error: 'Document not found.' };

  // Legacy/external source: the path is a full URL (e.g. migrated Drive link).
  if (/^https?:\/\//i.test(data.file_path)) {
    return { data: data.file_path };
  }

  const expiry = Number(process.env.DOWNLOAD_URL_EXPIRY) || DEFAULT_EXPIRY;
  const { data: signed, error: signError } = await supabase.storage
    .from('course-content')
    .createSignedUrl(data.file_path, expiry, {
      download: data.title,
    });

  if (signError || !signed) {
    return { error: 'Could not generate a download link for this file.' };
  }

  return { data: signed.signedUrl };
}
