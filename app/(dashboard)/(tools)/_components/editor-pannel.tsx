import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, FileUp, Settings, Trash2 } from "lucide-react";
import * as React from "react";
import Monaco, { MonacoProps } from "./monaco";
import { HoTaTooltip } from "@/components/hota-tooltip";
import { toastComingSoon } from "@/lib/utils/toast-comming-soon";
import { toast } from "sonner";

interface EditorPannelProps extends MonacoProps {
  id?: string;
  className?: string;
}

export const EditorPannel: React.FC<EditorPannelProps> = ({ className, value, onChange, readOnly, ...props }) => {
  return (
    <div className={`h-full w-full ${className}`}>
      <Card className="flex items-center justify-end p-1 w-full rounded-none border-x-0 h-12">
        <div className="gap-2 flex">
          {!readOnly && (
            <>
              <HoTaTooltip content="Cài đặt">
                <Button variant="outline" size="icon" onClick={toastComingSoon}>
                  <Settings />
                </Button>
              </HoTaTooltip>
              <HoTaTooltip content="Tải lên">
                <Button variant="outline" size="icon" onClick={toastComingSoon}>
                  <FileUp color="green" />
                </Button>
              </HoTaTooltip>
              <HoTaTooltip content="Xóa">
                <Button variant="outline" size="icon" onClick={() => onChange?.("")}>
                  <Trash2 color="red" />
                </Button>
              </HoTaTooltip>
            </>
          )}
          {readOnly && (
            <HoTaTooltip content="Sao chép">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(value || "");
                  toast.success("Đã sao chép");
                }}
              >
                <Copy />
              </Button>
            </HoTaTooltip>
          )}
        </div>
      </Card>
      <div className="h-[calc(100%-3rem)] w-full rounded-none border-none border-b mt-4">
        <Monaco value={value} onChange={onChange} {...props} />
      </div>
    </div>
  );
};
