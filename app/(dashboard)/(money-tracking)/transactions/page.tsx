import { HydrateClient, trpcServer } from "@/app/_trpc/server";
import { filterKeys } from "@/lib/constants/cookie-keys";
import { getFromCookie } from "@/lib/utils/cookie-helper";
import { TransactionTable } from "./_components/transaction-table/transaction-table";
import { TransactionFilter } from "./_model/transaction-filter";

const TransactionsPage: React.FC = async () => {
  const defaultFilter = await getFromCookie(filterKeys.TRANSACTION_FILTER, new TransactionFilter());
  await trpcServer.transaction.list.prefetch(defaultFilter);

  console.log(defaultFilter);
  return (
    <HydrateClient>
      <TransactionTable filter={defaultFilter} />
    </HydrateClient>
  );
};

export default TransactionsPage;
