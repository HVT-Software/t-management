import { createSearchParamsCache, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";

export const categoryParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(20),
  isCount: parseAsBoolean.withDefault(true),
  searchText: parseAsString.withDefault("")
});

export interface CategoryFilter extends ListRequest {}
