import React from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import QueryProvider from "@/components/provdier/QueryProvider";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">

        <LeftSidebar />
        <QueryProvider>
          {children}
        </QueryProvider>

        <RightSidebar />

    </main>
  );
}