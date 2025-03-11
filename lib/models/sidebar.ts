import { LucideIcon } from "lucide-react";

export interface NavData {
  user: NavAuth;
  teams: NavTeam[];
  navMain: Route[];
}

export interface NavAuth {
  name: string;
  email: string;
  avatar: string;
}

export interface NavTeam {
  name: string;
  logo: any;
  plan: string;
}

export interface Route {
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
