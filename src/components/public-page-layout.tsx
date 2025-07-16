'use client';
import Link from "next/link";
import { Bot, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";

export function PublicPageLayout({
  children,
  showHeader = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}) {
  const { user } = useAuth();

  return (
    <div className="relative flex min-h-screen flex-col">
      {showHeader && (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
            <div className="mr-auto flex items-center">
                <Link className="mr-6 flex items-center space-x-2" href="/">
                <Bot className="h-6 w-6" />
                <span className="font-bold sm:inline-block font-headline text-xl">
                    QuizForge
                </span>
                </Link>
                <nav className="hidden space-x-6 text-sm font-medium md:flex">
                <Link href="/#features" className="transition-colors hover:text-foreground/80">Features</Link>
                <Link href="/#pricing" className="transition-colors hover:text-foreground/80">Pricing</Link>
                <Link href="/#faq" className="transition-colors hover:text-foreground/80">FAQ</Link>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                   <Button asChild size="sm">
                     <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                   </Button>
                ) : (
                    <Button asChild size="sm">
                        <Link href="/signup">Start For Free</Link>
                    </Button>
                )}
            </div>
            </div>
        </header>
      )}
      <main className="flex-1">{children}</main>
       {showFooter && (
        <footer className="border-t border-border/40 py-12">
            <div className="container">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div>
                <div className="flex items-center space-x-2 mb-4">
                    <Bot className="h-6 w-6" />
                    <span className="font-bold text-xl">QuizForge</span>
                </div>
                <p className="text-sm text-muted-foreground">The easiest way to create and share quizzes with the power of AI.</p>
                </div>
                <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground">Terms</a></li>
                    <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                </ul>
                </div>
                <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground">Contact</a></li>
                    <li><a href="#" className="hover:text-foreground">FAQ</a></li>
                </ul>
                </div>
                <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground">About</a></li>
                    <li><a href="#" className="hover:text-foreground">Blog</a></li>
                </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-border/40 pt-8 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} QuizForge. All rights reserved.</p>
                <p className="text-sm text-muted-foreground">Made with 💓 by an AI</p>
            </div>
            </div>
        </footer>
      )}
    </div>
  )
}
