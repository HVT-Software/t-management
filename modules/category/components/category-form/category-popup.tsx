'use client';

import { Category, categoryDefault, categorySchema } from '@modules/category/models/category';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { BackButon, SaveButon } from '@shared/components/buttons';
import { useAppForm } from '@shared/utilities/form-context';
import { MRT_TableInstance } from 'material-react-table';

import { api } from '@config/trpc/react';
import CategoryForm from './category-form';

interface CategoryPopupProps {
  id?: string
  table: MRT_TableInstance<Category>;
}

export const CategoryPopup: React.FC<CategoryPopupProps> = ({ table, id }) => {
  const ultil = api.useUtils();

  const { data } = api.category.get.useQuery(id)
  const { mutateAsync: save } = api.category.save.useMutation({
    onSuccess: () => {
      ultil.category.list.invalidate();
      ultil.category.all.invalidate();
    }
  })

  const form = useAppForm({
    validators: {
      onSubmit: categorySchema
    },
    defaultValues: id && data ? data as any : categoryDefault,
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
        <BackButon onClick={() => (id ? table.setEditingRow(null) : table.setCreatingRow(null))} />
      </DialogActions>
    </Dialog>
  );
};
