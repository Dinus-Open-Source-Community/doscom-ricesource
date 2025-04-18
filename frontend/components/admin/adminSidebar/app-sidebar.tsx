"use client"

import * as React from "react"
import {
  Settings,
  Cog,
  UserRound,
  ShieldUser,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "maaas@example.com",
    avatar: "/image/pic.jpg",
  },
  navMain: [
    {
      title: "Playgrounddd",
      url: "#",
      icon: Cog,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboardAdmin/",
      icon: LayoutDashboard,
    },
    {
      name: "Admin users",
      url: "/dashboardAdmin/userAdmin",
      icon: ShieldUser,
    },
    {
      name: "RiceSource users",
      url: "/dashboardAdmin/users",
      icon: UserRound,
    },
    {
      name: "Config",
      url: "/dashboardAdmin/configForm",
      icon: Cog,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-900 text-sidebar-primary-foreground">
                  <img src="/Group.svg" className="size-6" alt="" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">RiceSource</span>
                  <span className="">Admin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
