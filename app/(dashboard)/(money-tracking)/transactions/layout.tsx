import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý giao dịch",
  description: "Quản lý giao dịch"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

