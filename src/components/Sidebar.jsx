'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

// NAV DATA
const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <Home className="w-4 h-4" />, section: 'main' },
  { label: 'Directory & Networking', path: '/directory', icon: <Users className="w-4 h-4" />, section: 'main' },
  { label: 'Career & Job Opportunities', path: '/career', icon: <Target className="w-4 h-4" />, section: 'main' },
  { label: 'Training & Learnings', path: '/training', icon: <BookOpen className="w-4 h-4" />, section: 'main' },
  { label: 'Achievements & Recognition', path: '/achievements', icon: <Award className="w-4 h-4" />, section: 'main' },
  { label: 'Events & Community Engagement', path: '/', icon: <Calendar className="w-4 h-4" />, section: 'main' },
  { label: 'Announcements', path: '/announcements', icon: <Bell className="w-4 h-4" />, section: 'main' },
  { label: 'Mentorship & Volunteer Programs', path: '/mentorship', icon: <Layers className="w-4 h-4" />, section: 'main' },
  { label: 'Documents & Records', path: '/documents', icon: <FileText className="w-4 h-4" />, section: 'main' },
  { label: 'Profile', path: '/profile', icon: <User className="w-4 h-4" />, section: 'others' },
];

// GROUP HELPERS
const groupNavItems = (items) =>
  items.reduce(
    (acc, item) => {
      acc[item.section].push(item);
      return acc;
    },
    { main: [], others: [] }
  );

function SidebarSection({ title, items, collapsed, isAnchor }) {
  const pathname = usePathname();

  return (
    <div className={`px-3 py-1 ${isAnchor ? 'mt-auto' : ''}`}>
      <p
        className={`font-inter m-0 py-[10px] px-[10px] pb-1.5 text-[8px] uppercase tracking-[0.12em] text-[#C9C9C9] ${
          collapsed ? 'text-center' : ''
        }`}
      >
        {title}
      </p>

      <nav className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              title={item.label}
              className={[
                'flex items-center gap-3 py-2.5 px-3 rounded-xl text-white border border-transparent transition-all duration-150',
                collapsed ? 'justify-center p-2.5' : '',
                isActive
                  ? 'bg-[#DAB619] text-[#2c2c2c] border-black/10'
                  : 'hover:bg-white/8',
              ].join(' ')}
            >
              <span
                className={`inline-flex items-center justify-center text-sm ${isActive ? 'text-[#2C2C2C]' : 'text-[#C9C9C9]'}`}
              >
                {item.icon}
              </span>

              {!collapsed && (
                <span className="font-inter text-xs whitespace-nowrap text-white">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const grouped = useMemo(() => groupNavItems(NAV_ITEMS), []);

  return (
    <aside
      className={`sticky top-0 flex flex-col h-screen bg-[#3F3F3F] text-white border-r border-[#AAA9A9] transition-all duration-[180ms] ${
        collapsed ? 'w-[84px]' : 'w-[280px]'
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between py-5 px-[18px] pb-2.5 border-b border-[#4B4B4B] gap-2.5">
        <div
          className={`flex items-center gap-3 font-bold tracking-[0.3em] transition-opacity duration-150 ${
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
            className="w-[38px] h-[38px] object-contain rounded-[10px]"
          />
          {!collapsed && (
            <span className="text-lg text-[#DAB619]">HSI</span>
          )}
        </div>

        {!collapsed && (
          <button
            type="button"
            className="w-9 h-9 rounded-[10px] border border-[#4B4B4B] bg-transparent text-white inline-flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-white/6"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* NAVIGATION */}
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
