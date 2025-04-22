"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { DialogClose } from "../ui/dialog";

const GoBack: React.FC = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.back();
  }, []);
  return <DialogClose onClick={handleClick}>Trở Lại</DialogClose>;
};

export default GoBack;
