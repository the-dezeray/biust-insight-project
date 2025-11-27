'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { User, Loader2 } from 'lucide-react';
import { navigationItems } from '@/app/browse/NavigationItems';
import { CollapsibleSubjectGroup } from '@/components/sidebar/CollapsibleSubjectGroup';
import { useSubjectData } from '@/hooks/useSubjectData';
import { toast } from "sonner";

interface AppSidebarProps {
  selectedCourse?: string | null;
  onCourseSelect?: (courseCode: string) => void;
  onUploadClick?: () => void;
}

export function AppSidebar({ selectedCourse, onCourseSelect, onUploadClick }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { subjectGroups, isLoading, error } = useSubjectData();

  const handleCourseSelect = (courseCode: string) => {
    if (onCourseSelect) {
      onCourseSelect(courseCode);
    } else {
      // Default behavior: navigate to browse page
      // We could pass the course code via query param if needed
      router.push('/browse'); 
    }
  };

  return (
    <Sidebar className="border-r border-gray-200/60 bg-white/90 backdrop-blur-xl shadow-sm">
      <SidebarHeader className="border-b border-gray-200/50 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 bg-white rounded-md"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">insight-04.2</h2>
            <p className="text-xs text-gray-600 font-medium">BIUST Resource Hub</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.url;
                
                if (item.title === "Upload" && onUploadClick) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={onUploadClick}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:shadow-sm`}
                      >
                        <item.icon size={20} />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-teal-50 text-teal-700 shadow-sm' 
                          : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:shadow-sm'
                      }`}
                    >
                      <a href={item.url} className="flex items-center gap-3 w-full">
                        <item.icon size={20} />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4 px-2">
            Academic Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {error ? (
              <div className="text-red-600 text-sm p-4 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            ) : isLoading ? (
              <div className="flex items-center gap-3 p-4 text-gray-600">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-sm font-medium">Loading modules...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {subjectGroups.map((subject) => (
                  <CollapsibleSubjectGroup
                    key={subject.id}
                    subject={subject}
                    selectedCourse={selectedCourse || undefined}
                    onCourseSelect={handleCourseSelect}
                  />
                ))}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/50 p-4 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:shadow-sm">
              <button onClick={() => toast("Will be implemented in the future")} className="flex items-center gap-3 w-full">
                <User size={20} />
                <span className="font-medium">Profile</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
