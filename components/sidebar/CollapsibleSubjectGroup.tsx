'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Calculator, Atom, FlaskConical, Binary, TrendingUp, Folder, BookOpen, Cpu, Zap, Earth } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub } from '@/components/ui/sidebar';
import { CourseMenuItem } from './CourseMenuItem';
import { SubjectGroup } from '@/lib/types';

interface CollapsibleSubjectGroupProps {
  subject: SubjectGroup;
  selectedCourse?: string;
  onCourseSelect: (courseCode: string) => void;
}

// Icon mapping for subject groups
const iconMap: Record<string, any> = {
  Calculator,
  Atom,
  FlaskConical,
  Binary,
  TrendingUp,
  Folder,
  BookOpen,
  Cpu,
  Zap,
  Earth,
};

export function CollapsibleSubjectGroup({ subject, selectedCourse, onCourseSelect }: CollapsibleSubjectGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconMap[subject.icon] || Folder;

  return (
    <SidebarMenu>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <IconComponent />
              <span>{subject.name}</span>
              {isOpen ? <ChevronDown /> : <ChevronRight />}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {subject.courses.map((course) => (
                <CourseMenuItem
                  key={course.code}
                  course={course}
                  isSelected={selectedCourse === course.code}
                  onSelect={() => onCourseSelect(course.code)}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}