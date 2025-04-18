"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import { CategoryForm } from "./category-form/category-form";

type CategoryDialogProps = {
  categoryId?: string;
  refetch?: () => void;
};

export const CategoryDialog: React.FC<CategoryDialogProps> = ({ refetch, categoryId }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BadgePlus />
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
