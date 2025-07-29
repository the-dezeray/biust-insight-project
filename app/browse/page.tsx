'use client';

import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon, Grid3x3, PlusIcon, User, FileText, Folder, BookOpen, Calculator, Atom, FlaskConical, TrendingUp, Binary, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "Search",
    icon: SearchIcon,
    url: "/",
  },
  {
    title: "Browse All",
    icon: Grid3x3,
    url: "/browse",
    isActive: true,
  },
  {
    title: "Upload",
    icon: PlusIcon,
    url: "/upload",
  },
];

const moduleItems = [
  {
    title: "Mathematics",
    icon: Calculator,
    url: "/modules/math",
    description: "Advanced mathematics courses and resources",
  },
  {
    title: "Physics",
    icon: Atom,
    url: "/modules/physics",
    description: "Physics theory and practical applications",
  },
  {
    title: "Chemistry",
    icon: FlaskConical,
    url: "/modules/chemistry",
    description: "Chemical sciences and laboratory work",
  },
  {
    title: "Computer Science",
    icon: Binary,
    url: "/modules/computer",
    description: "Programming and computational thinking",
  },
  {
    title: "Statistics",
    icon: TrendingUp,
    url: "/modules/statistics",
    description: "Statistical analysis and data science",
  },
  {
    title: "Biology",
    icon: Folder,
    url: "/modules/biology",
    description: "Life sciences and biological systems",
  },
];

export default function BrowsePage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
        <Sidebar className="border-r border-gray-200/60 bg-white/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-gray-200/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">insight-04.2</h2>
                <p className="text-xs text-gray-500">BIUST Resource Hub</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          item.isActive 
                            ? 'bg-teal-50 border-teal-200 text-teal-700 shadow-sm' 
                            : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <a href={item.url} className="flex items-center gap-3 w-full">
                          <item.icon size={18} />
                          <span className="font-medium">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Academic Modules
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {moduleItems.map((module) => (
                    <SidebarMenuItem key={module.title}>
                      <SidebarMenuButton
                        onClick={() => setSelectedModule(module.title)}
                        className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          selectedModule === module.title
                            ? 'bg-teal-50 border-teal-200 text-teal-700 shadow-sm'
                            : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <module.icon size={18} className="mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{module.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{module.description}</div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200/50 p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200">
                  <a href="/profile" className="flex items-center gap-3 w-full">
                    <User size={18} />
                    <span className="font-medium">Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-xl p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
              <div className="flex items-center gap-2">
                <Grid3x3 size={20} className="text-teal-600" />
                <h1 className="text-xl font-semibold text-gray-900">Browse Resources</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Academic Resources</h2>
                <p className="text-gray-600">
                  Discover comprehensive study materials, research papers, and course content across various academic disciplines.
                </p>
              </div>

              {/* Selected Module Content */}
              {selectedModule ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    {moduleItems.find(m => m.title === selectedModule)?.icon && (
                      <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                        {(() => {
                          const IconComponent = moduleItems.find(m => m.title === selectedModule)?.icon;
                          return IconComponent ? <IconComponent size={20} className="text-teal-600" /> : null;
                        })()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedModule}</h3>
                      <p className="text-sm text-gray-600">
                        {moduleItems.find(m => m.title === selectedModule)?.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                    Content for {selectedModule} will be loaded here. This could include:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Course materials and lecture notes</li>
                      <li>Research papers and publications</li>
                      <li>Assignment templates and examples</li>
                      <li>Video resources and tutorials</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {moduleItems.map((module) => (
                    <div
                      key={module.title}
                      onClick={() => setSelectedModule(module.title)}
                      className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 hover:shadow-md hover:border-teal-200 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors duration-200">
                          <module.icon size={24} className="text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-200">
                            {module.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FileText size={14} />
                        <span>Multiple resources available</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200/60 p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">150+</div>
                  <div className="text-xs text-gray-600">Documents</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200/60 p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">8</div>
                  <div className="text-xs text-gray-600">Modules</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200/60 p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">25+</div>
                  <div className="text-xs text-gray-600">Contributors</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200/60 p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">1.2k</div>
                  <div className="text-xs text-gray-600">Downloads</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
