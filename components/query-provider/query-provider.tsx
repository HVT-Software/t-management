"use client";

import { QueryClient, QueryClientProvider } from "@/tanstack/react-query";
import { ReactQueryDevtools } from "@/tanstack/react-query-devtools";

const QueryProvider: React.FC<React.PropsWithChildren & { queryClient: QueryClient }> = ({ children, queryClient }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default QueryProvider;
