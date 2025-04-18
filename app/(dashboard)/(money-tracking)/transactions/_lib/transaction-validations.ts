import { ETransactionType } from "@/lib/enums/transaction-type";
import { createSearchParamsCache, parseAsArrayOf, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";
import { z } from "zod";

export const transactionParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  isCount: parseAsBoolean.withDefault(true),
  searchText: parseAsString.withDefault(""),
  types: parseAsArrayOf(z.nativeEnum(ETransactionType)).withDefault([]),
  categoryIds: parseAsArrayOf(z.coerce.string()).withDefault([]),
  date: parseAsArrayOf(z.coerce.number()).withDefault([])
});

export interface TransactionFilter extends ListRequest {}
