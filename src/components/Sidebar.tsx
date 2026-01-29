'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Home,
  Users,
  Target,
  BookOpen,
  Award,
  Calendar,
  Bell,
  Layers,
  FileText,
  User,
  ChevronLeft,
} from 'lucide-react';

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  section: 'main' | 'others';
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" />, section: 'main' },
  { label: 'Directory & Networking', path: '/directory', icon: <Users className="w-5 h-5" />, section: 'main' },
  { label: 'Career & Job Opportunities', path: '/career', icon: <Target className="w-5 h-5" />, section: 'main' },
  { label: 'Training & Learnings', path: '/training', icon: <BookOpen className="w-5 h-5" />, section: 'main' },
  { label: 'Achievements & Recognition', path: '/achievements', icon: <Award className="w-5 h-5" />, section: 'main' },
  { label: 'Events & Community Engagement', path: '/', icon: <Calendar className="w-5 h-5" />, section: 'main' },
  { label: 'Announcements', path: '/announcements', icon: <Bell className="w-5 h-5" />, section: 'main' },
  { label: 'Mentorship & Volunteer Programs', path: '/mentorship', icon: <Layers className="w-5 h-5" />, section: 'main' },
  { label: 'Documents & Records', path: '/documents', icon: <FileText className="w-5 h-5" />, section: 'main' },
  { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" />, section: 'others' },
];

const groupNavItems = (items: NavItem[]) =>
  items.reduce(
    (acc, item) => {
      acc[item.section].push(item);
      return acc;
    },
    { main: [] as NavItem[], others: [] as NavItem[] }
  );

interface SidebarSectionProps {
  title: string;
  items: NavItem[];
  collapsed: boolean;
  isAnchor?: boolean;
}

function SidebarSection({ title, items, collapsed, isAnchor }: SidebarSectionProps) {
  return (
    <div className={`px-3 py-1 ${isAnchor ? 'mt-auto' : ''}`}>
      <p
        className={`m-0 py-2.5 px-2.5 pb-1.5 text-xs uppercase tracking-widest text-[#AAA9A9] ${collapsed ? 'text-center' : ''}`}
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {title}
      </p>
      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            title={item.label}
            className="flex items-center gap-3 py-2.5 px-3 text-white text-sm transition-colors hover:bg-[#7D7D7D]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="inline-flex items-center justify-center text-[#AAA9A9]">{item.icon}</span>
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const grouped = useMemo(() => groupNavItems(NAV_ITEMS), []);

  return (
    <aside
      className={`flex flex-col h-screen bg-[#585858] text-white border-r border-[#AAA9A9] transition-all duration-180 shrink-0 sticky top-0 ${
        collapsed ? 'w-24' : 'w-80'
      }`}
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-5 px-4 pb-2.5 border-b border-[#AAA9A9] gap-2.5">
        <div
          className={`flex items-center gap-3 font-bold tracking-widest transition-opacity duration-150 ${
            collapsed ? 'cursor-pointer hover:opacity-80' : ''
          }`}
          onClick={collapsed ? () => setCollapsed(false) : undefined}
          role={collapsed ? 'button' : undefined}
          aria-label={collapsed ? 'Expand sidebar' : undefined}
          tabIndex={collapsed ? 0 : undefined}
          onKeyDown={
            collapsed
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCollapsed(false);
                  }
                }
              : undefined
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hsimodule3.vercel.app/hsi-logo.png"
            alt="HSI"
            className="w-10 h-10 object-contain"
          />
          {!collapsed && <span className="text-lg text-[#DAB619]">HSI</span>}
        </div>
        {!collapsed && (
          <button
            type="button"
            className="w-9 h-9 border border-[#AAA9A9] bg-transparent text-white inline-flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-white/10"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-3 py-2 pb-4 overflow-y-auto">
        <SidebarSection
          title="Main"
          collapsed={collapsed}
          items={grouped.main}
        />
        <SidebarSection
          title="Others"
          collapsed={collapsed}
          items={grouped.others}
          isAnchor
        />
      </div>
    </aside>
  );
}
