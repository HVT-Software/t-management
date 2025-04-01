import { HydrateClient, trpcServer } from "@/app/_trpc/server";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card } from "@/components/ui/card";
import { Params } from "@/lib/types/common";
import { Suspense } from "react";
import { TransactionQuickActions } from "./_components/quick-actions";
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
        <Card className="h-10"></Card>
        <Card className="flex flex-col">
          <TransactionQuickActions />
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={6}
                searchableColumnCount={1}
                filterableColumnCount={2}
                cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
                shrinkZero
              />
            }
          >
            <TransactionTable filter={defaultFilter} />
          </Suspense>
        </Card>
      </div>
    </HydrateClient>
  );
};

export default TransactionsPage;
