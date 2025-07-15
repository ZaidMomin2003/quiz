
import { LoginForm } from "@/components/login-form";
import { PublicPageLayout } from "@/components/public-page-layout";
import { Bot } from "lucide-react";
import Link from "next/link";
import { AuthCarousel } from "@/components/auth-carousel";


export default function LoginPage() {
    return (
        <PublicPageLayout showHeader={false} showFooter={false}>
            <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
                <div className="hidden bg-black lg:block">
                   <div className="flex flex-col justify-between h-full p-8 text-white">
                        <Link className="flex items-center gap-2 font-semibold" href="/">
                            <Bot className="h-6 w-6" />
                            <span className="font-headline text-xl">QuizForge</span>
                        </Link>
                        <div className="flex items-center justify-center h-full">
                            <AuthCarousel />
                        </div>
                        <div/>
                   </div>
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <div className="flex justify-center">
                                <Bot className="h-12 w-12 text-purple-500" />
                            </div>
                            <h1 className="text-3xl font-bold">Welcome Back!</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <LoginForm />
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline font-semibold text-primary">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
