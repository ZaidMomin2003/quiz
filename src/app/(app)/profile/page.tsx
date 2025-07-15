// src/app/(app)/profile/page.tsx
'use client';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return null;

    const userInitial = user.name.charAt(0).toUpperCase();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your account's profile information and email address.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue={user.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={user.email} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us a little bit about yourself" defaultValue="I love creating and taking quizzes on QuizForge! It's the best way to learn new things and test my knowledge."/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="flex flex-col items-center text-center p-6">
                        <CardHeader className="p-0 mb-4">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} />
                                <AvatarFallback className="text-3xl">{userInitial}</AvatarFallback>
                            </Avatar>
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Button variant="outline">Change Photo</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your account settings.</CardDescription>
                        </Header>
                        <CardContent>
                            <Button variant="destructive" className="w-full">Delete Account</Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
