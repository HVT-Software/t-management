import { HydrateClient, trpcServer } from "@app/_trpc/server";
import { DataTableSkeleton } from "@components/data-table/data-table-skeleton";
import { SearchParams } from "@lib/types";
import { Suspense } from "react";
import { TransactionTable } from "./_components/transaction-table/transaction-table";
import { searchParamsCache, TransactionFilter } from "./_lib/validations";
import { Card } from "@components/ui/card";

interface TransactionPageProps {
  searchParams: Promise<SearchParams>;
}

const TransactionsPage: React.FC<TransactionPageProps> = async ({ searchParams }) => {
  const searchParamsValue = await searchParams;
  const defaultFilter: TransactionFilter = searchParamsCache.parse(searchParamsValue);

  await trpcServer.transaction.list.prefetch(defaultFilter);

  return (
    <HydrateClient>
      <div>
        <Card></Card>
        <Card>
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
