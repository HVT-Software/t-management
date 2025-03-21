import { keepPreviousData } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import type { ApiRouterOutput } from "@/app/_trpc";
import { trpcClient } from "@/app/_trpc/client";
import { Transaction } from "@/lib/models/transaction";
import { TransactionFilter } from "../_model/transaction-filter";

const select = (data: ApiRouterOutput["transaction"]["list"]) => {
  const items = plainToInstance(Transaction, data.items);
  return { ...data, items };
};

export const useQueryTransactions = (filter: TransactionFilter) => {
  return trpcClient.transaction.list.useQuery(filter, {
    placeholderData: keepPreviousData,
    select
  });
};
