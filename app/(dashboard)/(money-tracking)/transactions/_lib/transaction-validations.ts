import { createSearchParamsCache, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";

export const transactionParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  isCount: parseAsBoolean.withDefault(true),
  searchText: parseAsString.withDefault("")
});

export interface TransactionFilter extends ListRequest {}
