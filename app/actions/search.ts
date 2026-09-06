'use server';

import { createClient } from '@/utils/supabase/server';
import { getSupabaseEnv } from '@/utils/supabase/env';
import type { ActionResult, SearchType, SearchResult } from '@/lib/types';

const PAPER_CATEGORIES = ['exam', 'supplementary', 'special'];
const QUESTION_CATEGORIES = ['test', 'quiz'];

// Supabase returns the joined course as an object (many-to-one), but without
// generated types TS infers a union shape - normalize it defensively.
type JoinedDoc = {
  id: number;
  title: string;
  category: string;
  year: string | null;
  courses: { code: string; title: string; college: string } | { code: string; title: string; college: string }[] | null;
};

function toSearchResult(row: JoinedDoc): SearchResult {
  const course = Array.isArray(row.courses) ? row.courses[0] : row.courses;
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    year: row.year,
    module: course?.code ?? '',
    college: course?.college ?? null,
  };
}

export async function searchDocuments(
  query: string,
  searchType: SearchType,
): Promise<ActionResult<SearchResult[]>> {
  const trimmed = query.trim();
  if (!trimmed) return { data: [] };

  if (!getSupabaseEnv()) {
    return { error: 'Supabase is not configured yet. Add your keys to .env.local.' };
  }

  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase is not configured yet.' };

  // Require a valid session even though RLS already enforces this.
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { error: 'Not signed in.' };

  const categories = searchType === 'questions' ? QUESTION_CATEGORIES : PAPER_CATEGORIES;

  let request = supabase
    .from('documents')
    .select('id, title, category, year, courses(code, title, college)')
    .in('category', categories)
    .limit(50);

  if (trimmed.length >= 3) {
    request = request.textSearch('fts', trimmed, { type: 'websearch', config: 'english' });
  } else {
    request = request.ilike('title', `%${trimmed}%`);
  }

  const { data, error } = await request;
  if (error) return { error: error.message };

  let results = ((data ?? []) as unknown as JoinedDoc[]).map(toSearchResult);
  if (results.length > 0) return { data: results };

  // No title hits: try matching the query as a course code (e.g. "alss101").
  const codeMatch = trimmed.toUpperCase().match(/^([A-Z]{2,5})\s*(\d{1,4}[A-Z]?)$/);
  if (!codeMatch) return { data: results };

  const code = `${codeMatch[1]} ${codeMatch[2]}`;
  const { data: byCode, error: codeError } = await supabase
    .from('documents')
    .select('id, title, category, year, courses!inner(code, title, college)')
    .eq('courses.code', code)
    .in('category', categories)
    .limit(50);

  if (codeError) return { data: results };
  results = ((byCode ?? []) as unknown as JoinedDoc[]).map(toSearchResult);
  return { data: results };
}
