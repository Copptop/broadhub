'use client'

import Sidebar from '@/components/navigation/sidebar/Sidebar';
import TopBar from '@/components/navigation/topbar/Topbar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer = ({ children }: ContentContainerProps) => {
  // Get the current pathname
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if the user is on the auth page
  if (pathname.startsWith('/auth/')) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pl-72">
          <TopBar topbarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="pd-4">
            <div className="pd-4 sm:pd-6 lg:pd-8 ">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ContentContainer;
