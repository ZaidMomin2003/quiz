
// src/app/(app)/layout.tsx
'use client';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Bot, LogOut, User as UserIcon, Settings, History, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [bookmarkCount, setBookmarkCount] = useState(0);


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const updateBookmarkCount = () => {
        const storedBookmarks = localStorage.getItem('bookmarks');
        if (storedBookmarks) {
            try {
                const bookmarks = JSON.parse(storedBookmarks);
                setBookmarkCount(Array.isArray(bookmarks) ? bookmarks.length : 0);
            } catch {
                setBookmarkCount(0);
            }
        } else {
            setBookmarkCount(0);
        }
    }

    updateBookmarkCount();

    // Listen for changes in localStorage from other tabs/windows
    window.addEventListener('storage', updateBookmarkCount);

    // Also listen for a custom event for same-tab updates
    const handleBookmarkUpdate = () => updateBookmarkCount();
    window.addEventListener('bookmarksUpdated', handleBookmarkUpdate);

    return () => {
        window.removeEventListener('storage', updateBookmarkCount);
        window.removeEventListener('bookmarksUpdated', handleBookmarkUpdate);
    }
  }, []);

  if (loading || !user) {
    return (
       <div className="flex h-screen items-center justify-center">
         <p>Loading...</p>
       </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <SidebarProvider>
      <Sidebar>
          <div className="flex flex-col h-full p-2">
            <div className="p-2 mb-2">
              <Link className="flex items-center gap-2" href="/dashboard">
                <Bot className="h-6 w-6" />
                <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">QuizForge</span>
              </Link>
            </div>
            <div className="flex-1">
              <SidebarMenu>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <a href="/dashboard">
                       <LayoutDashboard />
                        <span>Dashboard</span>
                    </a>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="History">
                    <a href="/history">
                       <History />
                        <span>History</span>
                    </a>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Learn">
                    <a href="/learn">
                       <BookOpen />
                        <span>Learn</span>
                    </a>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Bookmarks">
                        <a href="/bookmarks">
                            <Bookmark />
                            <span>Bookmarks</span>
                        </a>
                    </SidebarMenuButton>
                    {bookmarkCount > 0 && <SidebarMenuBadge className="bg-primary text-primary-foreground">{bookmarkCount}</SidebarMenuBadge>}
                 </SidebarMenuItem>
              </SidebarMenu>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-2 rounded-md w-full text-left transition-colors hover:bg-sidebar-accent">
                   <Avatar className="h-8 w-8">
                     <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                   </Avatar>
                   <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                     <span className="text-sm font-medium text-sidebar-foreground">
                       {user.name}
                     </span>
                     <span className="text-xs text-sidebar-foreground/70">
                        {user.email}
                     </span>
                   </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mb-2 w-56" side="top" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                   <div className="flex items-center justify-between w-full">
                     <Label htmlFor="theme-toggle" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Theme</span>
                     </Label>
                     <Switch 
                        id="theme-toggle"
                        checked={theme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                     />
                   </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                   <LogOut className="mr-2 h-4 w-4" />
                   <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b h-16">
           <SidebarTrigger className="md:hidden" />
           <div />
        </header>
        <main className="p-4 md:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
