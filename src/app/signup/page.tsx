
import { SignupForm } from "@/components/signup-form";
import { PublicPageLayout } from "@/components/public-page-layout";
import { Bot } from "lucide-react";
import Link from "next/link";
import { AuthCarousel } from "@/components/auth-carousel";


export default function SignupPage() {
    return (
       <PublicPageLayout showHeader={false} showFooter={false}>
            <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
                 <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Create an account</h1>
                            <p className="text-balance text-muted-foreground">
                               Enter your information to get started
                            </p>
                        </div>
                        <SignupForm />
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline font-semibold text-primary">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                   <div className="flex flex-col justify-between h-full p-8 text-white bg-gradient-to-br from-gray-900 to-gray-800">
                        <Link className="flex items-center gap-2 font-semibold self-end" href="/">
                            <Bot className="h-6 w-6" />
                            <span className="font-headline text-xl">QuizForge</span>
                        </Link>
                        <div className="flex items-center justify-center h-full">
                            <AuthCarousel />
                        </div>
                         <div/>
                   </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
