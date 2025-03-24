import { Book, Hammer } from "lucide-react";
import { usePathname } from "next/navigation";
import { dashboardPath, jsonToTypescriptPath, transactionPath } from "../constants/routes";
import { SideBarConfig } from "../models/sidebar";
import Logo from "../../public/assets/images/t-management-logo.png";

export const sideBarItems: SideBarConfig = {
  user: {
    name: "Hồ Văn Toàn",
    email: "it.vantoan@.com",
    avatar: ""
  },
  teams: [
    {
      name: "Tools",
      logo: Logo.src,
      plan: "Free"
    }
  ],
  navMain: [
    { title: "Thống kê", url: dashboardPath, icon: Book },
    {
      title: "Học tập",
      url: "#",
      icon: Book,
      isActive: true,
      items: [
        {
          title: "Từ vựng",
          url: "#"
        },
        {
          title: "Listening",
          url: "#"
        }
      ]
    },
    {
      title: "Công cụ",
      url: "",
      icon: Hammer,
      items: [
        {
          title: "Json to Typescript",
          url: jsonToTypescriptPath
        }
      ]
    },
    {
      title: "Quản lý chi tiêu",
      url: "",
      icon: Hammer,
      items: [
        {
          title: "Giao dịch",
          url: transactionPath
        }
      ]
    }
  ]
};

export const useActivePath = (): SideBarConfig => {
  const url = usePathname();
  const path = url.split("/").slice(1);
  const routes = { ...sideBarItems, navMain: sideBarItems.navMain.map(item => ({ ...item })) };

  routes.navMain.forEach(item => {
    item.isActive = item.items?.some(subItem => path.includes(subItem.url.replace("/", ""))) || path.includes(item.url?.replace("/", "") || "");
    if (item.isActive && item.items) {
      item.items = item.items.map(subItem => ({
        ...subItem,
        isActive: path.includes(subItem.url.replace("/", ""))
      }));
    }
  });

  return routes;
};
