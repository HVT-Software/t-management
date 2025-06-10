import { HydrateClient, trpcServer } from "@/app/_trpc/server";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Params } from "@/types/base/common";
import { Suspense } from "react";
import { TransactionTable } from "./_components/transaction-table/transaction-table";
import { transactionParamsCache } from "./_lib/transaction-validations";

const TransactionsPage: React.FC<Params> = async ({ searchParams }) => {
  const params = await searchParams;
  const search = transactionParamsCache.parse(params);

  await trpcServer.category.all.prefetch();
  await trpcServer.transaction.list.prefetch(search);

  return (
    <HydrateClient>
      <Suspense fallback={<DataTableSkeleton columnCount={6} cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]} shrinkZero />}>
        <TransactionTable filter={search} />
      </Suspense>
    </HydrateClient>
  );
};

export default TransactionsPage;
