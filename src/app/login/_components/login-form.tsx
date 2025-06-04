"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define form validation schema
const loginFormSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập Tên đăng nhập"),
  password: z.string().min(1, "Vui lòng nhập Mật khẩu")
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(`Đăng nhập không thành công.`);
      router.replace("/login");
    }
  }, [searchParams, router]);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false
      });

      if (result?.error) {
        toast.error("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
      } else {
        toast.success("Đăng nhập thành công!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đăng nhập.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { popup: true }).catch(error => {
      setIsLoading(false);
      toast.error(`Đăng nhập với ${provider} không thành công.`);
      console.error(error);
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Chào mừng trở lại</h1>
                  <p className="text-balance text-muted-foreground">Đăng nhập vào tài khoản của bạn</p>
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">Tên đăng nhập</FormLabel>
                      <FormControl>
                        <Input id="username" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                        <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                          Quên mật khẩu?
                        </a>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">Hoặc</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full" onClick={() => handleProviderSignIn("google")} disabled={isLoading} type="button">
                    <Image src="/assets/icons/google.svg" alt="Google logo" width={24} height={24} />
                    <span className="sr-only">Đăng nhập với Google</span>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleProviderSignIn("github")} disabled={isLoading} type="button">
                    <Image src="/assets/icons/github.svg" alt="GitHub logo" width={24} height={24} />
                    <span className="sr-only">Đăng nhập với GitHub</span>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleProviderSignIn("discord")} disabled={isLoading} type="button">
                    <Image src="/assets/icons/discord.svg" alt="Discord logo" width={24} height={24} />
                    <span className="sr-only">Đăng nhập với Discord</span>
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Chưa có tài khoản ?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Đăng ký
                  </a>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/assets/images/login-banner.jpg"
              alt="Login banner image"
              fill
              sizes="(max-width: 768px) 0px, 50vw"
              priority
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a>.
      </div>
    </div>
  );
}
