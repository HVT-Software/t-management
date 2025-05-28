import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Clock, Mail, Power, PowerOff, Trash2 } from "lucide-react";
import React from "react";
import { EmailReminder } from "../_models/email-remider";

interface ReminderListProps {
  reminders: EmailReminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const frequencyLabels = {
  once: "Một lần",
  daily: "Hàng ngày",
  weekly: "Hàng tuần",
  monthly: "Hàng tháng"
};

const frequencyColors = {
  once: "default",
  daily: "secondary",
  weekly: "outline",
  monthly: "destructive"
} as const;

export const ReminderList: React.FC<ReminderListProps> = ({ reminders, onToggle, onDelete }) => {
  if (reminders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Mail className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-2">Chưa có nhắc nhở nào</p>
          <p className="text-sm text-muted-foreground text-center">Tạo nhắc nhở đầu tiên của bạn để bắt đầu nhận thông báo qua email</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách nhắc nhở ({reminders.length})</CardTitle>
        <CardDescription>Quản lý các nhắc nhở đã thiết lập</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder, index) => (
            <div key={reminder.id}>
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{reminder.title}</h3>
                    <Badge variant={frequencyColors[reminder.frequency]} className="text-xs">
                      {frequencyLabels[reminder.frequency]}
                    </Badge>
                    <Badge variant={reminder.isActive ? "default" : "secondary"} className="text-xs">
                      {reminder.isActive ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{reminder.content}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {reminder.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(reminder.date, "dd/MM/yyyy", { locale: vi })} lúc {reminder.time}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => onToggle(reminder.id)} className="flex items-center gap-1">
                    {reminder.isActive ? (
                      <>
                        <PowerOff className="h-4 w-4" />
                        Tạm dừng
                      </>
                    ) : (
                      <>
                        <Power className="h-4 w-4" />
                        Kích hoạt
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc chắn muốn xóa nhắc nhở "{reminder.title}"? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(reminder.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              {index < reminders.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
