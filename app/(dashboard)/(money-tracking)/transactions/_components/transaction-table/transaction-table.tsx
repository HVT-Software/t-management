"use client";

import { DataTable } from "@components/data-table/data-table";
import { useDataTable } from "@hooks/use-data-table";
import { Transaction } from "@lib/models/transaction";
import { useQueryTransactions } from "../../_queries/use-query-transactions";
import { transactionCollumns } from "./transaction-table.define";
import { TransactionFilter } from "../../_lib/validations";

interface TransactionTableProps {
  filter: TransactionFilter;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ filter }) => {
  const { data } = useQueryTransactions(filter);

  const { table } = useDataTable<Transaction>({
    data: data?.items ?? [],
    columns: transactionCollumns,
    pageCount: data?.totalCount ?? 0,
    getRowId: originalRow => originalRow.id,
    shallow: false,
    clearOnDefault: true
  });

  return (
    <DataTable
      table={table}
      // floatingBar={
      //   enableFloatingBar ? <TasksTableFloatingBar table={table} /> : null
      // }
    >
      {/* <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} />
      </DataTableToolbar> */}
    </DataTable>
  );
};
