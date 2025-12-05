'use client';

import { FileText, Video, TrendingUp, Sparkles } from 'lucide-react';

interface DiscoverItem {
  id: number;
  title: string;
  module?: string;
  type: string;
  date?: string;
  link: string;
}

interface DiscoverData {
  whatsNew: DiscoverItem[];
  recentDocuments: DiscoverItem[];
  videos: DiscoverItem[];
  trending: DiscoverItem[];
}

// This would typically come from an API or JSON file
const discoverData: DiscoverData = {
  whatsNew: [
    { id: 1, title: "New CSI 311 Past Papers Added", type: "announcement", date: "Nov 28", link: "#" },
    { id: 2, title: "Physics Lab Manual Updated", type: "update", date: "Nov 27", link: "#" },
    { id: 3, title: "Math 201 Solutions Available", type: "announcement", date: "Nov 26", link: "#" },
  ],
  recentDocuments: [
    { id: 1, title: "Database Systems Final 2024", module: "CSI 321", type: "exam", link: "#" },
    { id: 2, title: "Calculus II Mid-Semester", module: "MAT 201", type: "test", link: "#" },
    { id: 3, title: "Operating Systems Notes", module: "CSI 341", type: "notes", link: "#" },
    { id: 4, title: "Physics Mechanics Lab Report", module: "PHY 111", type: "lab", link: "#" },
  ],
  videos: [
    { id: 1, title: "Data Structures Explained", module: "CSI 211", type: "lecture", link: "#" },
    { id: 2, title: "Linear Algebra Tutorial", module: "MAT 121", type: "tutorial", link: "#" },
    { id: 3, title: "Chemistry Lab Safety", module: "CHE 101", type: "guide", link: "#" },
  ],
  trending: [
    { id: 1, title: "Software Engineering Final", module: "CSI 431", type: "exam", link: "#" },
    { id: 2, title: "Statistics Formulas Sheet", module: "STA 121", type: "notes", link: "#" },
    { id: 3, title: "Network Security Notes", module: "CSI 421", type: "notes", link: "#" },
    { id: 4, title: "Algorithms Past Paper 2023", module: "CSI 311", type: "exam", link: "#" },
  ],
};

function SectionHeader({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={16} className={color} />
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
    </div>
  );
}

function ItemCard({ item, showModule = true }: { item: DiscoverItem; showModule?: boolean }) {
  return (
    <a
      href={item.link}
      className="block p-2 bg-white rounded border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-colors"
    >
      <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
      <p className="text-xs text-gray-500 mt-0.5 truncate">
        {showModule && item.module ? `${item.module} • ` : ''}{item.type}{item.date ? ` • ${item.date}` : ''}
      </p>
    </a>
  );
}

function VideoCard({ item }: { item: DiscoverItem }) {
  return (
    <a
      href={item.link}
      className="block p-2 bg-white rounded border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
          <Video size={14} className="text-purple-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
          <p className="text-xs text-gray-500 truncate">{item.module} • {item.type}</p>
        </div>
      </div>
    </a>
  );
}

export default function DiscoverSection() {
  return (
    <div className="mt-8 space-y-6">
      {/* What's New */}
      <div>
        <SectionHeader icon={Sparkles} title="What's New" color="text-amber-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {discoverData.whatsNew.map((item) => (
            <div
              key={item.id}
              className="p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded border border-amber-200 hover:border-amber-400 transition-colors cursor-pointer"
            >
              <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
              <p className="text-xs text-amber-600 mt-0.5">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Added Documents */}
      <div>
        <SectionHeader icon={FileText} title="Recently Added" color="text-teal-600" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {discoverData.recentDocuments.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Videos */}
      <div>
        <SectionHeader icon={Video} title="Released Videos" color="text-purple-600" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {discoverData.videos.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div>
        <SectionHeader icon={TrendingUp} title="Trending Now" color="text-rose-500" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {discoverData.trending.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
