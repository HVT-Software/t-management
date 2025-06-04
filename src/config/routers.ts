import { categoryPath, jsonToTypescriptPath, reminderSetting, transactionPath } from "@/lib/constants/routes";
import { SideBarConfig } from "@/lib/models/sidebar";
import Logo from "@/assets/images/t-management-logo.png";
import { Coins, Hammer, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export const sideBarItems: SideBarConfig = {
  user: {
    name: "Hồ Văn Toàn",
    email: "it.vantoan@/.com",
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
      icon: Coins,
      items: [
        {
          title: "Giao dịch",
          url: transactionPath
        },
        {
          title: "Danh mục",
          url: categoryPath
        }
      ]
    },
    {
      title: "Cài đặt",
      url: "",
      icon: Settings,
      items: [
        {
          title: "Thông báo email",
          url: reminderSetting
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
