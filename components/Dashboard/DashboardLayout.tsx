"use client";

import { Sidebar } from "@/components/Navigation/sidebar";
import Navbar from "@/components/Navigation/Navbar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0118] text-white">
      <Navbar />
      <div className="flex h-screen pt-[65px]">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
