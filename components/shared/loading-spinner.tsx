import { Loader2Icon } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <Loader2Icon className="w-8 h-8 text-gray-500 animate-spin" />
    </div>
  );
}
