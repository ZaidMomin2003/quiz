
// src/app/signup/page.tsx
'use client';
import { PublicPageLayout } from "@/components/public-page-layout";
import { Bot, Loader2 } from "lucide-react";
import Link from "next/link";
import { AuthCarousel } from "@/components/auth-carousel";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { SignupForm } from "@/components/signup-form";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

export default function SignupPage() {
    const { signInWithGoogle, loading } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);

     const handleSignUp = async () => {
        setIsSigningIn(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Google sign up failed:", error);
            setIsSigningIn(false);
        }
    };

    return (
       <PublicPageLayout showHeader={false} showFooter={false}>
            <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
                 <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <Link href="/" className="flex justify-center lg:hidden">
                                <Bot className="h-12 w-12 text-primary" />
                            </Link>
                            <h1 className="text-3xl font-bold">Create an account</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your information below to create your account.
                            </p>
                        </div>
                        
                        <SignupForm />
                        
                         <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                                </span>
                            </div>
                        </div>

                        <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleSignUp}
                            disabled={loading || isSigningIn}
                        >
                            {isSigningIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                            {isSigningIn ? 'Redirecting...' : 'Sign Up with Google'}
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline font-semibold text-primary">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-black lg:block">
                   <div className="flex flex-col justify-between h-full p-8 text-white">
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
