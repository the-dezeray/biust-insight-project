// Seeds the Supabase database with subjects/courses/documents.
//
// Usage:
//   1. Copy .env.example to .env.local and fill in your Supabase keys.
//   2. Run the SQL in supabase/migrations/0001_init.sql (Dashboard > SQL Editor).
//   3. Seed metadata only:            pnpm seed
//      Import legacy Drive links too: pnpm seed -- --import-legacy
//      Upload a folder of files:      pnpm seed -- --upload ./path-to-files
//
// Bulk-upload filename convention: "<MODULE CODE> - <Title>.pdf"
// e.g. "ALSS 101 - 2019 Exam.pdf" -> module "ALSS 101", year 2019, category "exam".
// Category keywords detected from the title: exam, test, quiz, supplementary,
// special, notes, assignment (defaults to "notes").

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const importLegacy = args.includes('--import-legacy');
const uploadIdx = args.indexOf('--upload');
const uploadDir = uploadIdx !== -1 ? args[uploadIdx + 1] : null;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer the service role key; fall back to anon key (requires permissive RLS).
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and ' +
      '(preferably) SUPABASE_SERVICE_ROLE_KEY in .env.local.',
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const BUCKET = 'course-content';

const SUBJECTS = [
  { id: 'computer-science', name: 'Computer Science', prefix: 'COMP', icon: 'Binary', description: 'Programming, algorithms, and computational thinking', color: 'bg-blue-50 text-blue-700 border-blue-200', sort_order: 1 },
  { id: 'physics', name: 'Physics', prefix: 'PHYS', icon: 'Atom', description: 'Physics theory and practical applications', color: 'bg-purple-50 text-purple-700 border-purple-200', sort_order: 2 },
  { id: 'chemistry', name: 'Chemistry', prefix: 'CHEM', icon: 'FlaskConical', description: 'Chemical sciences and laboratory work', color: 'bg-green-50 text-green-700 border-green-200', sort_order: 3 },
  { id: 'biology', name: 'Biology', prefix: 'BIO', icon: 'Folder', description: 'Life sciences and biological systems', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', sort_order: 4 },
  { id: 'mathematics', name: 'Mathematics', prefix: 'MATH', icon: 'Calculator', description: 'Mathematical analysis and computation', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', sort_order: 5 },
  { id: 'statistics', name: 'Statistics', prefix: 'STAT', icon: 'TrendingUp', description: 'Statistical analysis and data science', color: 'bg-orange-50 text-orange-700 border-orange-200', sort_order: 6 },
  { id: 'electrical-engineering', name: 'Electrical Engineering', prefix: 'EEEN', icon: 'Zap', description: 'Electrical systems and engineering', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', sort_order: 7 },
  { id: 'information-systems', name: 'Information Systems', prefix: 'INFS', icon: 'Cpu', description: 'Information systems and data management', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', sort_order: 8 },
  { id: 'geology', name: 'Geology', prefix: 'GEOL', icon: 'Earth', description: 'Earth sciences and geological studies', color: 'bg-amber-50 text-amber-700 border-amber-200', sort_order: 9 },
  { id: 'academic-literacy', name: 'Academic Literacy', prefix: 'ALSS', icon: 'BookOpen', description: 'Academic language and study skills', color: 'bg-rose-50 text-rose-700 border-rose-200', sort_order: 10 },
];

function detectCategory(title) {
  const t = title.toLowerCase();
  if (t.includes('supplementary')) return 'supplementary';
  if (t.includes('special')) return 'special';
  if (t.includes('quiz')) return 'quiz';
  if (t.includes('test') || t.includes('question')) return 'test';
  if (t.includes('assignment')) return 'assignment';
  if (t.includes('note') || t.includes('lecture') || t.includes('tutorial')) return 'notes';
  if (t.includes('exam')) return 'exam';
  return 'notes';
}

async function upsertCourse(prefix, moduleCode, college = '') {
  const { data: subject } = await supabase
    .from('subjects')
    .select('id')
    .eq('prefix', prefix)
    .maybeSingle();

  if (!subject) {
    console.warn(`  ! No subject for prefix "${prefix}", skipping ${moduleCode}`);
    return null;
  }

  const { data: existing } = await supabase
    .from('courses')
    .select('id')
    .eq('code', moduleCode)
    .maybeSingle();
  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from('courses')
    .insert({
      subject_id: subject.id,
      code: moduleCode,
      title: `${moduleCode} Resources`,
      college,
    })
    .select('id')
    .single();

  if (error) {
    console.warn(`  ! Could not create course ${moduleCode}: ${error.message}`);
    return null;
  }
  return created.id;
}

async function insertDocument(courseId, { title, category, year, filePath, fileType }) {
  const { data: existing } = await supabase
    .from('documents')
    .select('id')
    .eq('course_id', courseId)
    .eq('title', title)
    .maybeSingle();
  if (existing) {
    console.log(`  = Already exists: "${title}"`);
    return null;
  }

  const { data, error } = await supabase
    .from('documents')
    .insert({
      course_id: courseId,
      title,
      category,
      year,
      file_path: filePath,
      file_type: fileType ?? null,
    })
    .select('id')
    .single();

  if (error) {
    console.warn(`  ! Failed to insert "${title}": ${error.message}`);
    return null;
  }
  console.log(`  + Inserted "${title}" (${category}${year ? `, ${year}` : ''})`);
  return data.id;
}

async function seedSubjects() {
  console.log('Seeding subjects...');
  const { error } = await supabase.from('subjects').upsert(SUBJECTS, { onConflict: 'id' });
  if (error) throw new Error(`Subject seed failed: ${error.message}`);
  console.log(`  + ${SUBJECTS.length} subjects ready.`);
}

async function importLegacyDocuments() {
  const legacyPath = path.join(process.cwd(), 'public', 'data', 'alss.json');
  if (!fs.existsSync(legacyPath)) {
    console.log('--import-legacy: public/data/alss.json not found, skipping.');
    return;
  }

  console.log('Importing legacy documents (Drive links kept as external URLs)...');
  const raw = JSON.parse(fs.readFileSync(legacyPath, 'utf-8'));
  const documents = raw.documents ?? [];

  for (const doc of documents) {
    const codeMatch = String(doc.module).toUpperCase().match(/^([A-Z]{2,5})\s*(\d{1,4}[A-Z]?)$/);
    if (!codeMatch) continue;

    const [, prefix, number] = codeMatch;
    const moduleCode = `${prefix} ${number}`;
    const courseId = await upsertCourse(prefix, moduleCode);
    if (!courseId) continue;

    await insertDocument(courseId, {
      title: doc.title,
      category: detectCategory(`${doc.category} ${doc.title}`),
      year: doc.year ?? null,
      filePath: doc.link,
      fileType: doc.link.includes('/presentation/') ? 'pptx' : 'pdf',
    });
  }
}

async function uploadFolder(dir) {
  const resolved = path.resolve(process.cwd(), dir);
  if (!fs.existsSync(resolved)) {
    console.error(`Upload folder not found: ${resolved}`);
    process.exit(1);
  }

  console.log(`Uploading files from ${resolved}...`);
  const files = fs.readdirSync(resolved).filter((f) => fs.statSync(path.join(resolved, f)).isFile());

  for (const fileName of files) {
    // Convention: "<MODULE CODE> - <Title>.<ext>"
    const match = fileName.match(/^([A-Za-z]{2,5}\s*\d{1,4}[A-Z]?)\s*-\s*(.+)\.([A-Za-z0-9]+)$/);
    if (!match) {
      console.warn(`  ! Skipping "${fileName}" - expected "<MODULE CODE> - <Title>.<ext>"`);
      continue;
    }

    const [, rawModule, rawTitle, ext] = match;
    const moduleCode = rawModule.toUpperCase().replace(/^([A-Z]+)\s*(\d)/, '$1 $2');
    const [, prefix] = moduleCode.match(/^([A-Z]+)/);
    const yearMatch = rawTitle.match(/\b((?:19|20)\d{2})(?:[/\-](?:19|20)?\d{2})?\b/);
    const year = yearMatch ? yearMatch[1] : null;
    const cleanTitle = rawTitle.replace(/[_-]+/g, ' ').trim();

    const courseId = await upsertCourse(prefix, moduleCode);
    if (!courseId) continue;

    const storagePath = `${moduleCode}/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._ -]/g, '')}`;
    const body = fs.readFileSync(path.join(resolved, fileName));

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, body, {
      contentType: `application/${ext.toLowerCase() === 'pdf' ? 'pdf' : 'octet-stream'}`,
      upsert: false,
    });
    if (uploadError) {
      console.warn(`  ! Storage upload failed for "${fileName}": ${uploadError.message}`);
      continue;
    }

    await insertDocument(courseId, {
      title: cleanTitle,
      category: detectCategory(rawTitle),
      year,
      filePath: storagePath,
      fileType: ext.toLowerCase(),
    });
  }
}

async function main() {
  try {
    await seedSubjects();

    if (importLegacy) await importLegacyDocuments();

    if (uploadDir) await uploadFolder(uploadDir);

    if (!importLegacy && !uploadDir) {
      console.log('\nMetadata seeded. Next steps:');
      console.log('  - Import old Drive links:        pnpm seed -- --import-legacy');
      console.log('  - Upload fresh files from disk:  pnpm seed -- --upload ./my-pdfs');
    }

    console.log('\nDone.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
