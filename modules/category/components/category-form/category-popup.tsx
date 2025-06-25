'use client';

import { Category, categoryDefault, categorySchema } from '@modules/category/models/category';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { BackButon, SaveButon } from '@shared/components/buttons';
import { useAppForm } from '@shared/utilities/form-context';
import { useMutation } from '@tanstack/react-query';
import { MRT_Row, MRT_TableInstance } from 'material-react-table';
import { toast } from 'sonner';

import CategoryForm from './category-form';

interface CategoryPopupProps {
  table: MRT_TableInstance<Category>;
  row: MRT_Row<Category>;
  isCreate?: boolean;
}

export const CategoryPopup: React.FC<CategoryPopupProps> = ({ table, row, isCreate = false }) => {




  const { mutateAsync: save } = useMutation(
    trpc.category.save.mutationOptions({
      onSuccess: (value) => {
        queryClient.invalidateQueries({ queryKey: trpc.category.list.queryKey() });
        queryClient.invalidateQueries({ queryKey: trpc.category.all.queryKey() });

        if (value.success) {
          toast.success('Lưu thành công');
          if (isCreate) {
            table.setCreatingRow(null);
          } else {
            table.setEditingRow(null);
          }
        } else {
          toast.error('Lưu thất bại');
        }
      },
      onError: (error) => {
        toast.error(JSON.parse(error.message));
      }
    })
  );

  const form = useAppForm({
    validators: {
      onSubmit: categorySchema
    },
    defaultValues: isCreate ? categoryDefault : (row.original as any),
    onSubmit: ({ value }) => save(value)
  });

  return (
    <Dialog
      open
      maxWidth='md'
      fullWidth
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <DialogTitle>DANH MỤC</DialogTitle>
      <DialogContent>
        <form className='py-1'>
          <CategoryForm form={form} />
        </form>
      </DialogContent>
      <DialogActions>
        <SaveButon type='submit' />
        <BackButon onClick={() => (isCreate ? table.setCreatingRow(null) : table.setEditingRow(null))} />
      </DialogActions>
    </Dialog>
  );
};
