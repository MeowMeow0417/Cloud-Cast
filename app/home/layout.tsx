import React from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <LeftSidebar />
      {/* Main content area */}
      {children}
      <RightSidebar />
      {/* Right sidebar */}
    </main>
  );
}