import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ThemeToggle } from '@/components/theme-toggle';
import { Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'QuizForge',
  description: 'Generate MCQs on any topic with AI',
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
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
              <div className="mr-4 flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <span className="font-bold sm:inline-block font-headline text-xl">
                    QuizForge
                  </span>
                </a>
              </div>
              <div className="flex flex-1 items-center justify-end space-x-4">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
