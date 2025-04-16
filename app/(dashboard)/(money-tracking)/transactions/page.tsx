import { HydrateClient, trpcServer } from "@/app/_trpc/server";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Card } from "@/components/ui/card";
import { Params } from "@/types/common";
import { Suspense } from "react";
import { QuickEditTransactionDialog } from "./_components/transaction-dialog";
import { TransactionTable } from "./_components/transaction-table/transaction-table";
import { TransactionFilter, transactionParamsCache } from "./_lib/transaction-validations";

const TransactionsPage: React.FC<Params> = async ({ searchParams }) => {
  const searchParamsValue = await searchParams;
  const defaultFilter: TransactionFilter = transactionParamsCache.parse(searchParamsValue);

  await trpcServer.category.all.prefetch();
  await trpcServer.transaction.list.prefetch(defaultFilter);

  return (
    <HydrateClient>
      <div className="flex flex-col gap-2 ">
        <Card className="flex flex-col p-2">
          <div className="flex items-center justify-end py-2 gap-2">
            <QuickEditTransactionDialog />
          </div>
          <Suspense fallback={<DataTableSkeleton columnCount={6} cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]} shrinkZero />}>
            <TransactionTable filter={defaultFilter} />
          </Suspense>
        </Card>
      </div>
    </HydrateClient>
  );
};

export default TransactionsPage;
