"use client";

import { Book, GalleryVerticalEnd, Hammer } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Hồ Văn Toàn",
    email: "it.vantoan@.com",
    avatar: "/avatars/shadcn.jpg"
  },
  teams: [
    {
      name: "HoTa",
      logo: GalleryVerticalEnd,
      plan: "Free"
    }
  ],
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: Book },
    {
      title: "Quiz",
      url: "#",
      icon: Book,
      isActive: true,
      items: [
        {
          title: "Vocabulary",
          url: "#"
        },
        {
          title: "Listening",
          url: "#"
        }
      ]
    },
    {
      title: "Tools",
      url: "",
      icon: Hammer,
      items: [
        {
          title: "Json to Typescript",
          url: "/json-to-typescript"
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
