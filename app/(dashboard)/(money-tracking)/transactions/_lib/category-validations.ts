import { createSearchParamsCache, parseAsArrayOf, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";
import { z } from "zod";

export const categoryParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(20),
  isCount: parseAsBoolean.withDefault(true),
  searchText: parseAsString.withDefault(""),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  categoryId: parseAsArrayOf(z.coerce.string()).withDefault([])
});

export interface CategoryFilter extends ListRequest {}
