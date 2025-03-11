import { QueryClient, DefaultOptions } from "@tanstack/react-query";

const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false
  },
  mutations: {
    retry: 1
  }
};

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: defaultQueryOptions
  });
}
