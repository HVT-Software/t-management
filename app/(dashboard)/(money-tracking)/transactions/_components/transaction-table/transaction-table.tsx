"use client";

import { trpcClient } from "@/app/_trpc/client";
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Card } from "@/components/ui/card";
import { useDataTable } from "@/hooks/use-data-table";
import { Transaction } from "@/lib/models/transaction";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { TransactionFilter } from "../../_lib/transaction-validations";
import { useQueryTransactions } from "../../_queries/use-query-transactions";
import { QuickEditTransactionDialog } from "../transaction-dialog";
import { transactionColumns } from "./transaction-table.define";

interface TransactionTableProps {
  filter: TransactionFilter;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ filter }) => {
  const { data, refetch } = useQueryTransactions(filter);
  const { data: categories } = trpcClient.category.all.useQuery();
  const { mutateAsync: deleteProduct } = trpcClient.transaction.delete.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Xóa giao dịch thành công");
    }
  });

  const [transactionId, setTransactionId] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const onEdit = (id: string) => {
    setTransactionId(id);
    setIsOpen(true);
  };

  const columns = useMemo(() => transactionColumns(categories ?? [], onEdit, id => deleteProduct(id)), [categories, onEdit, deleteProduct]);

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
        <QuickEditTransactionDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSuccess={() => refetch()}
          transactionId={transactionId}
          setTransactionId={setTransactionId}
        />
      </div>
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </Card>
  );
};
