import { LoginForm } from "./_components/login-form";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản của bạn để tiếp tục."
};

async function LoginPage() {
  const session = await getServerSession(authOptions);

  // Redirect to dashboard if already authenticated
  if (session) {
    console.log(session);
    redirect("/");
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
