"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const Providers: React.FC<WrappedComponentProps> = ({ children }) => {
  return (
    <SessionProvider basePath={`/api/auth`}>
      {children}
      <Toaster richColors />
    </SessionProvider>
  );
};

export default Providers;
