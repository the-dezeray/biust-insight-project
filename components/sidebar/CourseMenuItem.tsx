'use client';

import { FileText } from 'lucide-react';
import { SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { CourseModule } from '@/lib/parsers/courseParser';

interface CourseMenuItemProps {
  course: CourseModule;
  isSelected: boolean;
  onSelect: () => void;
}

export function CourseMenuItem({ course, isSelected, onSelect }: CourseMenuItemProps) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        onClick={onSelect}
      >
        <FileText />
        <span>{course.code}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}