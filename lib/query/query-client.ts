import { defaultShouldDehydrateQuery, isServer, QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false
      },
      mutations: {
        retry: 1
      },
      dehydrate: {
        shouldDehydrateQuery: query => defaultShouldDehydrateQuery(query) || query.state.status === "pending"
      }
    }
  });
}

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};
