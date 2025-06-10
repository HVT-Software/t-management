import { createSearchParamsCache, parseAsArrayOf, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";
import { z } from "zod";

export const categoryParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(20),
  isCount: parseAsBoolean.withDefault(true),
  searchText: parseAsString.withDefault(""),
  date: parseAsArrayOf(z.coerce.number()).withDefault([])
});

export interface CategoryFilter extends ListRequest {
  date?: number[];
}
