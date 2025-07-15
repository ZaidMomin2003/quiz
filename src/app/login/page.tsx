import { LoginForm } from "@/components/login-form";
import { PublicPageLayout } from "@/components/public-page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
    return (
        <PublicPageLayout showFooter={false}>
            <div className="w-full max-w-md mx-auto flex items-center min-h-[calc(100vh-4rem)]">
                <Card className="w-full">
                    <CardHeader className="text-center">
                        <CardTitle>Welcome Back!</CardTitle>
                        <CardDescription>Sign in to continue to QuizForge</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                        <p className="text-center text-sm text-muted-foreground mt-4">
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-semibold text-primary hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </PublicPageLayout>
    );
}
