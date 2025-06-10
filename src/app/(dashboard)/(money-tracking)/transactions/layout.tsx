import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý giao dịch",
  description: "Quản lý giao dịch"
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
