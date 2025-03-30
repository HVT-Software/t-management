import { getTransactionTypeList } from "@/lib/enums/transaction-type";
import { Category } from "@/lib/models/category";
import { Transaction } from "@/lib/models/transaction";
import { DataTableFilterField, Option } from "@/lib/types";

type Props = {
  categories: Array<Category>;
};

export const transactionFilter = ({ categories }: Props): DataTableFilterField<Transaction>[] => [
  {
    id: "categoryId",
    label: "Nhóm chi tiêu",
    placeholder: "Nhóm chi tiêu",
    options: categories.map(item => ({
      label: item.name,
      value: item.id!
    }))
  },
  {
    id: "type",
    label: "Loại",
    placeholder: "Chọn loại",
    options: getTransactionTypeList().map(
      item =>
        ({
          label: item.label,
          value: item.value
        }) as Option<any>
    )
  }
];
