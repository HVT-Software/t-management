"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { AlertDialogCancel } from "../ui/alert-dialog";

const GoBack: React.FC = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.back();
  }, []);
  return <AlertDialogCancel onClick={handleClick}>Trở Lại</AlertDialogCancel>;
};

export default GoBack;
