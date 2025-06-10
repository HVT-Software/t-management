export interface EmailReminder {
  id: string;
  title: string;
  content: string;
  email: string;
  date: Date;
  time: string;
  frequency: "once" | "daily" | "weekly" | "monthly";
  isActive: boolean;
  createdAt: Date;
}

export interface ReminderFormData {
  title: string;
  content: string;
  email: string;
  date: Date;
  time: string;
  frequency: "once" | "daily" | "weekly" | "monthly";
}
