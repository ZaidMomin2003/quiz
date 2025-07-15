import { SignupForm } from "@/components/signup-form";
import { PublicPageLayout } from "@/components/public-page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
    return (
        <PublicPageLayout>
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>Get started with QuizForge for free</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignupForm />
                        <p className="text-center text-sm text-muted-foreground mt-4">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-primary hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </PublicPageLayout>
    );
}
