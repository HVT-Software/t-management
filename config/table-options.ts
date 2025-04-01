import { TableOptions, getCoreRowModel } from "@tanstack/react-table";

export const tableOptions: Partial<TableOptions<any>> = {
  columnResizeMode: "onChange",
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    minSize: 100
  }
};
