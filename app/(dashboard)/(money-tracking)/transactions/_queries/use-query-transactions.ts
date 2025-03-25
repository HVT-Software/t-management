import { keepPreviousData } from "@tanstack/react-query";

import type { ApiRouterOutput } from "@app/_trpc";
import { trpcClient } from "@app/_trpc/client";
import { TransactionFilter } from "../_lib/transaction-validations";

const select = (data: ApiRouterOutput["transaction"]["list"]) => {
  return { ...data, items: data.items };
};

export const useQueryTransactions = (filter: TransactionFilter) => {
  return trpcClient.transaction.list.useQuery(filter, {
    placeholderData: keepPreviousData,
    select
  });
};
