// src/app/login/page.tsx
'use client';
import { PublicPageLayout } from "@/components/public-page-layout";
import { Bot, Loader2 } from "lucide-react";
import Link from "next/link";
import { AuthCarousel } from "@/components/auth-carousel";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

export default function LoginPage() {
    const { signInWithGoogle, loading } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleSignIn = async () => {
        setIsSigningIn(true);
        await signInWithGoogle();
        // The auth hook will handle redirection, so we don't need to do anything here.
        // We set isSigningIn to false in a timeout in case of errors, though the page will likely redirect away.
        setTimeout(() => setIsSigningIn(false), 3000); 
    };

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
                                <Bot className="h-12 w-12 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold">Welcome Back!</h1>
                            <p className="text-balance text-muted-foreground">
                                Sign in with Google to continue to your account.
                            </p>
                        </div>
                        <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={handleSignIn}
                            disabled={loading || isSigningIn}
                        >
                           {isSigningIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                           {isSigningIn ? 'Redirecting...' : 'Sign In with Google'}
                        </Button>
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
