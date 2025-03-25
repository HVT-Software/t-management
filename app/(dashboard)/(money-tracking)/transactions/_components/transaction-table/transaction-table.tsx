"use client";

import { DataTable } from "@components/data-table/data-table";
import { useDataTable } from "@hooks/use-data-table";
import { Transaction } from "@lib/models/transaction";
import { useQueryTransactions } from "../../_queries/use-query-transactions";
import { transactionColumns } from "./transaction-table.define";
import { TransactionFilter } from "../../_lib/transaction-validations";
import { DataTableToolbar } from "@components/data-table/data-table-toolbar";
import { trpcClient } from "@app/_trpc/client";
import { useMemo } from "react";
import { transactionFilter } from "./transaction-table.filter";

interface TransactionTableProps {
  filter: TransactionFilter;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ filter }) => {
  const { data } = useQueryTransactions(filter);
  const { data: categories } = trpcClient.category.all.useQuery();

  const { table } = useDataTable<Transaction>({
    data: data?.items ?? [],
    columns: transactionColumns,
    pageCount: data?.totalCount ? Math.ceil(data.totalCount / filter.pageSize) : 0,
    getRowId: originalRow => originalRow.id,
    shallow: false,
    clearOnDefault: true
  });

  const filterFields = useMemo(() => transactionFilter({ categories: categories ?? [] }), [categories]);

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        {/* <TasksTableToolbarActions table={table} /> */}
      </DataTableToolbar>
    </DataTable>
  );
};
