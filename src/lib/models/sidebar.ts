import { LucideIcon } from "lucide-react";

export interface SideBarConfig {
  user: SidebarUser;
  teams: SidebarTeam[];
  navMain: SidebarRoute[];
}

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

export interface SidebarTeam {
  name: string;
  logo: string;
  plan: string;
}

export interface SidebarRoute {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: RouteChild[];
}

export interface RouteChild {
  title: string;
  url: string;
  isActive?: boolean;
}
