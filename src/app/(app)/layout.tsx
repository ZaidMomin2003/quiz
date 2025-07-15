// src/app/(app)/layout.tsx
'use client';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Pencil, Bot, LogOut, User as UserIcon, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
                  <SidebarMenuButton asChild tooltip="Practice Quiz">
                    <a href="/practice-quiz">
                       <Pencil />
                        <span>Practice Quiz</span>
                    </a>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
              </SidebarMenu>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-2 rounded-md w-full text-left transition-colors hover:bg-sidebar-accent">
                   <Avatar className="h-8 w-8">
                     <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} />
                      <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                   </Avatar>
                   <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                     <span className="text-sm font-medium text-sidebar-foreground">
                       {user.email.split('@')[0]}
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
                <DropdownMenuItem>
                   <Settings className="mr-2 h-4 w-4" />
                   <span>Settings</span>
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
