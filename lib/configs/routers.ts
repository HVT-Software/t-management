import { Book, GalleryVerticalEnd, Hammer } from "lucide-react";
import { NavData } from "../types/sidebar";
import { usePathname } from "next/navigation";

export const data: NavData = {
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
    { title: "Dashboard", url: "dashboard", icon: Book },
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
          url: "json-to-typescript"
        }
      ]
    }
  ]
};

export const useActivePath = (): NavData => {
  const url = usePathname();
  const path = url.split("/").slice(1);
  const routes = { ...data, navMain: data.navMain.map(item => ({ ...item })) };

  routes.navMain.forEach(item => {
    item.isActive = item.items?.some(subItem => path.includes(subItem.url)) || path.includes(item.url || "");
    if (item.isActive && item.items) {
      item.items = item.items.map(subItem => ({
        ...subItem,
        isActive: path.includes(subItem.url)
      }));
    }
  });

  return routes;
};
