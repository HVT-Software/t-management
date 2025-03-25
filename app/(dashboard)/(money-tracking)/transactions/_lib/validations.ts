import { createSearchParamsCache, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  isCount: parseAsBoolean.withDefault(true),
  searchText: parseAsString.withDefault("")
});

export type TransactionFilter = {
  pageIndex: number;
  pageSize: number;
  isCount: boolean;
  searchText: string;
};
