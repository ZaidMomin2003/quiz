import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Sparkles, Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SEOtalos',
  description: 'Boost your website\'s SEO',
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
                  <a className="mr-6 flex items-center space-x-2" href="/">
                    <Bot className="h-6 w-6 text-primary" />
                    <span className="font-bold sm:inline-block font-headline text-xl">
                      SEOtalos
                    </span>
                  </a>
                  <nav className="hidden space-x-6 text-sm font-medium md:flex">
                    <a href="#" className="transition-colors hover:text-primary/80">Resources</a>
                    <a href="#" className="transition-colors hover:text-primary/80">Support</a>
                    <a href="#" className="transition-colors hover:text-primary/80">Pricing</a>
                    <a href="#" className="transition-colors hover:text-primary/80">Contact</a>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">Sign In</Button>
                  <Button size="sm">Start a Free Trial</Button>
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
                       <span className="font-bold text-xl">SEOtalos</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Best analytics app for agencies, consultants, affiliates, e-commerce, saas</p>
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
                      <li><a href="#" className="hover:text-primary">Documentation</a></li>
                    </ul>
                  </div>
                   <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary">About</a></li>
                      <li><a href="#" className="hover:text-primary">Blog</a></li>
                      <li><a href="#" className="hover:text-primary">Careers</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-border/40 pt-8 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} SEOtalos. All rights reserved.</p>
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
