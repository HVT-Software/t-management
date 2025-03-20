"use client";

import { createTRPCReact } from "@trpc/react-query";

import { ApiRouter } from "./router";

export const trpcClient = createTRPCReact<ApiRouter>();

export const getUrl = () => {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    return "http://127.0.0.1:3000";
  })();
  return `${base}/api/trpc`;
};
