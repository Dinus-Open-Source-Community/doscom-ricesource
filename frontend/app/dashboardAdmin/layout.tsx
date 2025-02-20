"use client"

import TopBar from "@/components/admin/topBar";
import { useEffect } from "react";
import Sidebar from "@/components/admin/sidebar";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token) redirect("/loginAdmin")
  },[])
  return (
    <section className="bg-white h-screen overflow-hidden flex">
      <Sidebar />
      <div className="flex-1 flex flex-col px-4 sm:ml-64">
        {/* <TopBar /> */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
