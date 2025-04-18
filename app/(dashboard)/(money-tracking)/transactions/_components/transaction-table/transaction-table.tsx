"use client";

import { trpcClient } from "@/app/_trpc/client";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Transaction } from "@/lib/models/transaction";
import { TransactionFilter } from "../../_lib/transaction-validations";
import { useQueryTransactions } from "../../_queries/use-query-transactions";
import { transactionColumns } from "./transaction-table.define";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Card } from "@/components/ui/card";
import { QuickEditTransactionDialog } from "../transaction-dialog";

interface TransactionTableProps {
  filter: TransactionFilter;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ filter }) => {
  const { data, refetch } = useQueryTransactions(filter);
  const { data: categories } = trpcClient.category.all.useQuery();
  const columns = useMemo(() => transactionColumns(categories ?? []), [categories]);

  const { table } = useDataTable<Transaction>({
    data: data?.items ?? [],
    columns: columns,
    pageCount: data?.totalCount ? Math.ceil(data.totalCount / filter.pageSize) : 0,
    getRowId: originalRow => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    enableColumnFilters: true
  });

  return (
    <Card className="p-2">
      <div className="flex items-center justify-end py-2 gap-2">
        <QuickEditTransactionDialog onSuccess={() => refetch()} />
      </div>
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </Card>
  );
};
