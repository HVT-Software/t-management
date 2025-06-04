import { z } from "zod";

export const reminderSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống").max(100, "Tiêu đề không được quá 100 ký tự"),
  content: z.string().min(1, "Nội dung không được để trống").max(1000, "Nội dung không được quá 1000 ký tự"),
  email: z.string().email("Email không hợp lệ").min(1, "Email không được để trống"),
  date: z
    .date({
      required_error: "Ngày gửi là bắt buộc"
    })
    .refine(date => date >= new Date(), {
      message: "Ngày gửi phải là ngày trong tương lai"
    }),
  time: z
    .string()
    .min(1, "Giờ gửi không được để trống")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Định dạng giờ không hợp lệ"),
  frequency: z.enum(["once", "daily", "weekly", "monthly"], {
    required_error: "Tần suất gửi là bắt buộc"
  })
});

export type ReminderFormData = z.infer<typeof reminderSchema>;
