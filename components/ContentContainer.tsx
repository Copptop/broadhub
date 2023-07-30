'use client'

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/Topbar';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer = ({ children }: ContentContainerProps) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // * This is the content container for all auth pages.
  if (pathname.startsWith('/auth/')) {
    return (
      <>
        {children}
      </>
    );
  }

  // * This the default content container for all pages that are not auth pages.
  return (
    <>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pl-72">
          <TopBar topbarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="pd-4">
            <div className="pd-4 sm:pd-6 lg:pd-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ContentContainer;
