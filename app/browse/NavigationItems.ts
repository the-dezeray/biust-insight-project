
import { SearchIcon, Grid3x3, PlusIcon, User } from 'lucide-react';

export const navigationItems = [
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