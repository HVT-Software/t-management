import { getSession } from "@/query/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản của bạn để tiếp tục."
};

async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/transactions");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
