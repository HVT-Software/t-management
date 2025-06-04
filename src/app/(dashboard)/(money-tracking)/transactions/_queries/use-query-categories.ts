import { keepPreviousData } from "@tanstack/react-query";

import type { ApiRouterOutput } from "@/app/_trpc";
import { trpcClient } from "@/app/_trpc/client";
import { CategoryFilter } from "../_lib/category-validations";

const select = (data: ApiRouterOutput["category"]["list"]) => {
  return { ...data, items: data.items };
};

export const useQueryCategories = (filter: CategoryFilter) => {
  return trpcClient.category.list.useQuery(filter, {
    placeholderData: keepPreviousData,
    select
  });
};
