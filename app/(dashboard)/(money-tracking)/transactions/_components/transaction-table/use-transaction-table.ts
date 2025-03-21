import { Transaction } from "@/lib/models/transaction";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ColumnFiltersState, TableOptions, useReactTable } from "@tanstack/react-table";
import { plainToInstance } from "class-transformer";
import { useForm, useWatch } from "react-hook-form";
import { TransactionFilter } from "../../_model/transaction-filter";
import { useMemo, useState } from "react";
import { useQueryTransactions } from "../../_queries/use-query-transactions";
import { tableOptions } from "@/lib/configs/table-options";
import { transactionCollumns as transactionColumns } from "./transaction-table.define";

const resolver = classValidatorResolver(TransactionFilter);

const getRowId = (row: Transaction) => row.id;

export const useTransactionTable = (filter: TransactionFilter) => {
  const { control, getValues, setValue } = useForm({
    resolver,
    defaultValues: plainToInstance(TransactionFilter, filter),
    mode: "onChange"
  });
  const [pagination, setPagination] = useState({
    pageIndex: filter.pageIndex ?? 0,
    pageSize: filter.pageSize ?? 15
  });

  const currentFilters = useWatch({ control }) as TransactionFilter;

  const { data, isFetching } = useQueryTransactions({
    ...currentFilters,
    ...pagination
  });

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    return Object.entries(currentFilters).map(([key, value]) => ({
      id: key,
      value
    }));
  }, [currentFilters]);

  const table = useReactTable({
    ...(tableOptions as TableOptions<Transaction>),
    columns: transactionColumns,
    data: data?.items || [],
    enableGlobalFilter: false,
    enableColumnFilters: false,
    enableSorting: true,
    state: {
      pagination,
      columnFilters
    },
    getRowId,
    onPaginationChange: setPagination,
    rowCount: data?.totalCount ?? 0
  });

  return {
    table,
    control,
    getValues,
    setValue
  };
};
