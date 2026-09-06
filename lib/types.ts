export type SearchType = 'papers' | 'questions';

export interface Subject {
  id: string;
  name: string;
  prefix: string;
  icon: string;
  description: string;
  color: string;
}

export interface CourseModule {
  id: number;
  subject_id: string;
  code: string;
  title: string;
  college: string;
  year?: string | null;
}

export interface DocumentRecord {
  id: number;
  course_id: number;
  title: string;
  category: string;
  year?: string | null;
  file_path: string;
  file_type?: string | null;
  file_size?: number | null;
  created_at: string;
}

export interface CourseDocument extends DocumentRecord {
  courses: Pick<CourseModule, 'code' | 'title' | 'college'> | null;
}

export interface SubjectGroup {
  id: string;
  name: string;
  prefix: string;
  icon: string;
  description: string;
  color: string;
  courses: (CourseModule & { entries: number })[];
  totalEntries: number;
}

export interface SearchResult {
  id: number;
  module: string;
  title: string;
  category: string;
  year?: string | null;
  college?: string | null;
}

export interface ActionResult<T> {
  data?: T;
  error?: string;
}
