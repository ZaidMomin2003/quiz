// src/app/(app)/layout.tsx
'use client';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Pencil } from 'lucide-react';

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
            <div className="p-2">
               <SidebarMenu>
                <SidebarMenuItem>
                   <SidebarMenuButton onClick={handleLogout}>
                      <span>Sign Out</span>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
               </SidebarMenu>
            </div>
          </div>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
           <SidebarTrigger className="md:hidden" />
           <p className="text-lg font-bold tracking-tight text-foreground">Welcome back, {user.email}</p>
        </header>
        <main className="p-4 md:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
