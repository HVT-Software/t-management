import { RowAction } from '@app/(authenticated)/_components/row-action';
import { tableOptions } from '@config/table-options';
import { useTRPC } from '@config/trpc';
import { Category } from '@modules/category/models/category';
import { CategoryFilter } from '@modules/category/models/category-filter';
import { SortDirection } from '@shared/dto/pagination-dto';
import { useAppForm } from '@shared/utilities/form-context';
import { useStore } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Updater } from '@tanstack/react-table';
import { MRT_SortingState, type MRT_TableOptions, useMaterialReactTable } from 'material-react-table';
import { useRef } from 'react';
import { toast } from 'sonner';

import { CategoryPopup } from '../category-form/category-popup';
import { categoryColumns } from './category-table.columns';

const getRowId = (row: Category) => row.id + '';

export const useCategoryTable = (initFilter: CategoryFilter) => {
  const trpc = useTRPC();
  const form = useAppForm({
    defaultValues: initFilter
  });

  const formData = useStore(form.store);

  const { data, isFetching } = useQuery(trpc.category.list.queryOptions(formData.values));
  const { mutateAsync: xoa } = useMutation(
    trpc.category.delete.mutationOptions({
      onError: (error) => toast.error(error?.message)
    })
  );

  const currentSorting = [
    {
      id: formData.values?.sort?.sortPropertyName ?? '',
      desc: formData.values?.sort?.sortDirection === SortDirection.Desc
    }
  ];

  const handleSortingChange = (updater: Updater<MRT_SortingState>) => {
    const sorting = updater instanceof Function ? updater(currentSorting) : updater;

    if (sorting?.length === 0) {
      form.setFieldValue('sort.sortPropertyName', '');
      form.setFieldValue('sort.sortDirection', SortDirection.None);
    } else {
      form.setFieldValue('sort.sortPropertyName', sorting[0].id);
      form.setFieldValue('sort.sortDirection', sorting[0].desc ? SortDirection.Desc : SortDirection.Asc);
    }
  };

  const handlePaginationChange = (updater: Updater<{ pageIndex: number; pageSize: number }>) => {
    const pagination =
      updater instanceof Function
        ? updater({ pageIndex: formData.values?.pageIndex, pageSize: formData.values?.pageSize })
        : updater;

    form.setFieldValue('pageIndex', pagination.pageIndex);
    form.setFieldValue('pageSize', pagination.pageSize);
  };

  const table = useMaterialReactTable({
    ...(tableOptions as MRT_TableOptions<Category>),
    columns: categoryColumns,
    data: data?.items || [],
    enableGlobalFilter: true,
    enableColumnFilters: false,
    enableSorting: true,
    enableEditing: true,

    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    state: {
      pagination: formData.values,
      showSkeletons: isFetching,
      globalFilter: formData.values.searchText,
      sorting: formData.values?.sort?.sortPropertyName ? currentSorting : []
    },
    initialState: {
      showGlobalFilter: true,
      density: 'compact'
    },
    getRowId,
    rowCount: data?.totalCount ?? 0,
    renderCreateRowDialogContent: ({ table, row }) => <CategoryPopup table={table} row={row} isCreate />,
    renderEditRowDialogContent: ({ table, row }) => <CategoryPopup table={table} row={row} />,
    renderRowActions: ({ table, row }) => (
      <RowAction
        table={table}
        row={row}
        xoa={async (id) => {
          await xoa(id);
        }}
      />
    )
  });

  const stableReturn = useRef<{ form: typeof form; table: typeof table } | null>(null);

  if (!stableReturn.current) {
    stableReturn.current = { form, table };
  } else {
    stableReturn.current.form = form;
    stableReturn.current.table = table;
  }

  return stableReturn.current;
};
