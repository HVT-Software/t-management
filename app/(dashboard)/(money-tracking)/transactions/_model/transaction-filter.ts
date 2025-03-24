import { ESortDirection } from "@lib/enums/sort-direction";
import { Transaction } from "@lib/models/transaction";
import "reflect-metadata";
import type { PascalCasedProperties } from "type-fest";

export class TransactionFilter implements Omit<ListRequest, "startDate" | "endDate"> {
  constructor(isAll = false) {
    if (isAll) {
      this.isAll = isAll;
    }
  }

  pageIndex: number = 0;

  pageSize: number = 20;

  isCount?: boolean = true;

  searchText: string = "";

  isAll?: boolean = false;

  sort: {
    direction: ESortDirection;
    propertyName: keyof PascalCasedProperties<Transaction> | string;
  } = {
    direction: ESortDirection.Descending,
    propertyName: "CreatedDate"
  };
}
