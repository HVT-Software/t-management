import { TransactionFilter } from "../../_model/transaction-filter";
import { useTransactionTable } from "./use-transaction-table";

interface TransactionTableProps {
  filter: TransactionFilter;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ filter }) => {
  const { control, getValues, table, setValue } = useTransactionTable(filter);

  return (
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{/* Transaction rows will go here */}</tbody>
    </table>
  );
};
