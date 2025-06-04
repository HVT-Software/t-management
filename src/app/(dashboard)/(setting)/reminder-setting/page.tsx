"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Settings } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { ReminderForm } from "../_components/reminder-form";
import { ReminderList } from "../_components/reminder-list";
import { EmailReminder, ReminderFormData } from "../_models/email-remider";

const ReminderSettings: React.FC = () => {
  const [reminders, setReminders] = useState<EmailReminder[]>([]);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const handleCreateReminder = (data: ReminderFormData) => {
    const newReminder: EmailReminder = {
      id: generateId(),
      ...data,
      isActive: true,
      createdAt: new Date()
    };

    setReminders(prev => [...prev, newReminder]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => (reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder)));

    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      toast.success(`Nhắc nhở "${reminder.title}" đã được ${reminder.isActive ? "tạm dừng" : "kích hoạt"}.`);
    }
  };

  const handleDeleteReminder = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    setReminders(prev => prev.filter(reminder => reminder.id !== id));

    if (reminder) {
      toast.info(`Nhắc nhở "${reminder.title}" đã được xóa thành công.`);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Tạo nhắc nhở
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Danh sách nhắc nhở
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <ReminderForm onSubmit={handleCreateReminder} />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <ReminderList reminders={reminders} onToggle={handleToggleReminder} onDelete={handleDeleteReminder} />
        </TabsContent>
      </Tabs>

      {reminders.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{reminders.length}</p>
                <p className="text-sm text-muted-foreground">Tổng nhắc nhở</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{reminders.filter(r => r.isActive).length}</p>
                <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{reminders.filter(r => !r.isActive).length}</p>
                <p className="text-sm text-muted-foreground">Tạm dừng</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReminderSettings;
