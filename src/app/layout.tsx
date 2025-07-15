import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Bot, LogIn } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QuizForge',
  description: 'Generate quizzes with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <div className="mr-auto flex items-center">
                  <Link className="mr-6 flex items-center space-x-2" href="/">
                    <Bot className="h-6 w-6 text-primary" />
                    <span className="font-bold sm:inline-block font-headline text-xl">
                      QuizForge
                    </span>
                  </Link>
                  <nav className="hidden space-x-6 text-sm font-medium md:flex">
                    <Link href="/quiz" className="transition-colors hover:text-primary/80">Quiz</Link>
                    <Link href="#features" className="transition-colors hover:text-primary/80">Features</Link>
                    <Link href="#pricing" className="transition-colors hover:text-primary/80">Pricing</Link>
                    <Link href="#faq" className="transition-colors hover:text-primary/80">FAQ</Link>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">
                      <LogIn className="mr-2"/>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/signup">Start For Free</Link>
                  </Button>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
             <footer className="border-t border-border/40 py-12">
              <div className="container">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                       <Bot className="h-6 w-6 text-primary" />
                       <span className="font-bold text-xl">QuizForge</span>
                    </div>
                    <p className="text-sm text-muted-foreground">The easiest way to create and share quizzes with the power of AI.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary">Terms</a></li>
                      <li><a href="#" className="hover:text-primary">Privacy</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary">Contact</a></li>
                      <li><a href="#" className="hover:text-primary">FAQ</a></li>
                    </ul>
                  </div>
                   <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary">About</a></li>
                      <li><a href="#" className="hover:text-primary">Blog</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-border/40 pt-8 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} QuizForge. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
