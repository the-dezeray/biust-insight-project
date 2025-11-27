import { Calculator, Atom, FlaskConical, Binary, TrendingUp, Folder, BookOpen, FileText, Cpu, Zap, Earth, Users } from 'lucide-react';

export interface CourseModule {
  code: string;
  title: string;
  college: string;
  year?: string;
  entries: number;
}

export interface SubjectGroup {
  id: string;
  name: string;
  prefix: string;
  icon: any;
  description: string;
  color: string;
  courses: CourseModule[];
  totalEntries: number;
}

// Subject mapping with icons and descriptions
const SUBJECT_MAPPING: Record<string, Omit<SubjectGroup, 'courses' | 'totalEntries'>> = {
  COMP: {
    id: 'computer-science',
    name: 'Computer Science',
    prefix: 'COMP',
    icon: Binary,
    description: 'Programming, algorithms, and computational thinking',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  PHYS: {
    id: 'physics',
    name: 'Physics',
    prefix: 'PHYS',
    icon: Atom,
    description: 'Physics theory and practical applications',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  CHEM: {
    id: 'chemistry',
    name: 'Chemistry',
    prefix: 'CHEM',
    icon: FlaskConical,
    description: 'Chemical sciences and laboratory work',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  BIO: {
    id: 'biology',
    name: 'Biology',
    prefix: 'BIO',
    icon: Folder,
    description: 'Life sciences and biological systems',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  MATH: {
    id: 'mathematics',
    name: 'Mathematics',
    prefix: 'MATH',
    icon: Calculator,
    description: 'Mathematical analysis and computation',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  STAT: {
    id: 'statistics',
    name: 'Statistics',
    prefix: 'STAT',
    icon: TrendingUp,
    description: 'Statistical analysis and data science',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  EEEN: {
    id: 'electrical-engineering',
    name: 'Electrical Engineering',
    prefix: 'EEEN',
    icon: Zap,
    description: 'Electrical systems and engineering',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  },
  INFS: {
    id: 'information-systems',
    name: 'Information Systems',
    prefix: 'INFS',
    icon: Cpu,
    description: 'Information systems and data management',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  GEOL: {
    id: 'geology',
    name: 'Geology',
    prefix: 'GEOL',
    icon: Earth,
    description: 'Earth sciences and geological studies',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  ALSS: {
    id: 'academic-literacy',
    name: 'Academic Literacy',
    prefix: 'ALSS',
    icon: BookOpen,
    description: 'Academic language and study skills',
    color: 'bg-rose-50 text-rose-700 border-rose-200'
  }
};

export function parseCourseData(rawData: string): SubjectGroup[] {
  const lines = rawData.split('\n');
  const coursesBySubject: Record<string, CourseModule[]> = {};
  
  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and headers
    if (!trimmedLine || trimmedLine.includes('Titles (') || trimmedLine.includes('Found') || /^\d+$/.test(trimmedLine)) {
      continue;
    }
    
    // Parse course entry lines
    const courseMatch = trimmedLine.match(/^(\d+)\s+([A-Z]+\s+\d+[A-Z]?.*?)\s+:\s+(.*?)\s+(\d+)$/);
    if (courseMatch) {
      const [, , courseTitle, college, entries] = courseMatch;
      
      // Extract course code from title
      const codeMatch = courseTitle.match(/^([A-Z]+)\s+(\d+[A-Z]?)/);
      if (codeMatch) {
        const [, prefix, number] = codeMatch;
        const fullCode = `${prefix} ${number}`;
        
        // Extract year if present
        const yearMatch = courseTitle.match(/\((\d{4}[\/\-]?\d{0,4})\)/);
        const year = yearMatch ? yearMatch[1] : undefined;
        
        const course: CourseModule = {
          code: fullCode,
          title: courseTitle,
          college: college,
          year: year,
          entries: parseInt(entries)
        };
        
        if (!coursesBySubject[prefix]) {
          coursesBySubject[prefix] = [];
        }
        coursesBySubject[prefix].push(course);
      }
    }
  }
  
  // Convert to SubjectGroup format
  const subjectGroups: SubjectGroup[] = [];
  
  for (const [prefix, courses] of Object.entries(coursesBySubject)) {
    const subjectInfo = SUBJECT_MAPPING[prefix];
    if (subjectInfo) {
      // Sort courses by course number
      const sortedCourses = courses.sort((a, b) => {
        const aNum = parseInt(a.code.split(' ')[1]);
        const bNum = parseInt(b.code.split(' ')[1]);
        return aNum - bNum;
      });
      
      const totalEntries = courses.reduce((sum, course) => sum + course.entries, 0);
      
      subjectGroups.push({
        ...subjectInfo,
        courses: sortedCourses,
        totalEntries
      });
    }
  }
  
  // Sort subject groups by name
  return subjectGroups.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCoursesBySubject(subjectGroups: SubjectGroup[], subjectId: string): CourseModule[] {
  const subject = subjectGroups.find(s => s.id === subjectId);
  return subject ? subject.courses : [];
}

export function searchCourses(subjectGroups: SubjectGroup[], query: string): CourseModule[] {
  const results: CourseModule[] = [];
  const lowercaseQuery = query.toLowerCase();
  
  for (const subject of subjectGroups) {
    for (const course of subject.courses) {
      if (
        course.code.toLowerCase().includes(lowercaseQuery) ||
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.college.toLowerCase().includes(lowercaseQuery)
      ) {
        results.push(course);
      }
    }
  }
  
  return results;
}