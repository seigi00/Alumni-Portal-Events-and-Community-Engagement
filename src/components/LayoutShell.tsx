'use client';

import Sidebar from '@/components/Sidebar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#EFEFEF]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
