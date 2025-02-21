import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUp, Settings, Trash2 } from "lucide-react";
import * as React from "react";
import Monaco, { MonacoProps } from "./monaco";
import { HoTaTooltip } from "@/components/hota-tooltip";

interface EditorPannelProps extends MonacoProps {
  id?: string;
  className?: string;
}

export const EditorPannel: React.FC<EditorPannelProps> = ({ className, ...props }) => {
  return (
    <div className={`h-full w-full ${className}`}>
      <Card className="flex items-center justify-end p-1 w-full rounded-none border-x-0">
        <div className="gap-2 flex">
          <HoTaTooltip content="Cài đặt">
            <Button variant="outline" size="icon">
              <Settings />
            </Button>
          </HoTaTooltip>
          <HoTaTooltip content="Tải lên">
            <Button variant="outline" size="icon">
              <FileUp color="green" />
            </Button>
          </HoTaTooltip>
          <HoTaTooltip content="Xóa">
            <Button variant="outline" size="icon" title="Clear">
              <Trash2 color="red" />
            </Button>
          </HoTaTooltip>
        </div>
      </Card>
      <Card className="h-full w-full overflow-hidden rounded-none border-x-0">
        <Monaco {...props} />
      </Card>
    </div>
  );
};
