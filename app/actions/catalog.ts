'use server';

import { createClient } from '@/utils/supabase/server';
import { getSupabaseEnv } from '@/utils/supabase/env';
import type { ActionResult, SubjectGroup, CourseDocument } from '@/lib/types';

export interface PlatformStats {
  documents: number;
  subjects: number;
  courses: number;
}

export async function getSubjectGroups(): Promise<ActionResult<SubjectGroup[]>> {
  if (!getSupabaseEnv()) {
    return { error: 'Supabase is not configured yet. Add your keys to .env.local.' };
  }

  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase is not configured yet.' };

  const [subjectsRes, coursesRes] = await Promise.all([
    supabase.from('subjects').select('*').order('sort_order').order('name'),
    supabase.from('courses').select('id, subject_id, code, title, college, year, documents(count)').order('code'),
  ]);

  if (subjectsRes.error) return { error: subjectsRes.error.message };
  if (coursesRes.error) return { error: coursesRes.error.message };

  const groups: SubjectGroup[] = (subjectsRes.data ?? []).map((subject) => {
    const subjectCourses = (coursesRes.data ?? [])
      .filter((course) => course.subject_id === subject.id)
      .map((course) => ({
        id: course.id,
        subject_id: course.subject_id,
        code: course.code,
        title: course.title,
        college: course.college,
        year: course.year,
        entries:
          course.documents && course.documents.length > 0
            ? Number(course.documents[0].count ?? 0)
            : 0,
      }));

    return {
      id: subject.id,
      name: subject.name,
      prefix: subject.prefix,
      icon: subject.icon,
      description: subject.description,
      color: subject.color,
      courses: subjectCourses,
      totalEntries: subjectCourses.reduce((sum, c) => sum + c.entries, 0),
    };
  });

  return { data: groups.filter((g) => g.courses.length > 0 || g.totalEntries > 0) };
}

export async function getCourseDocuments(
  courseCode: string,
): Promise<ActionResult<CourseDocument[]>> {
  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase is not configured yet.' };

  const { data, error } = await supabase
    .from('documents')
    .select('*, courses!inner(code, title, college)')
    .eq('courses.code', courseCode)
    .order('year', { ascending: false })
    .order('title');

  if (error) return { error: error.message };

  const documents: CourseDocument[] = (data ?? []).map((row) => ({
    id: row.id,
    course_id: row.course_id,
    title: row.title,
    category: row.category,
    year: row.year,
    file_path: row.file_path,
    file_type: row.file_type,
    file_size: row.file_size,
    created_at: row.created_at,
    courses: row.courses ?? null,
  }));

  return { data: documents };
}

export async function getPlatformStats(): Promise<ActionResult<PlatformStats>> {
  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase is not configured yet.' };

  const [documentsRes, subjectsRes, coursesRes] = await Promise.all([
    supabase.from('documents').select('id', { count: 'exact', head: true }),
    supabase.from('subjects').select('id', { count: 'exact', head: true }),
    supabase.from('courses').select('id', { count: 'exact', head: true }),
  ]);

  if (documentsRes.error) return { error: documentsRes.error.message };
  if (subjectsRes.error) return { error: subjectsRes.error.message };
  if (coursesRes.error) return { error: coursesRes.error.message };

  return {
    data: {
      documents: documentsRes.count ?? 0,
      subjects: subjectsRes.count ?? 0,
      courses: coursesRes.count ?? 0,
    },
  };
}
