"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BadgePlus } from "lucide-react";
import { CategoryForm } from "./category-form/category-form";

type CategoryDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categoryId?: string;
  refetch?: () => void;
};

export const CategoryDialog: React.FC<CategoryDialogProps> = ({ refetch, categoryId, isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BadgePlus className="text-green-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm danh mục</DialogTitle>
        </DialogHeader>
        <CategoryForm
          categoryId={categoryId}
          onSuccess={() => {
            refetch?.();
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
