
'use client';

import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Building, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function NgoDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();

    useEffect(() => {
        if (authLoading) {
            return; 
        }
        if (!user) {
            router.push('/register?type=login');
        }
    }, [user, authLoading, router]);


    if (authLoading || !user) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
                <Scale className="h-12 w-12 animate-bounce text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-12 md:py-24">
            <Card className="mx-auto max-w-3xl">
                <CardHeader className="text-center">
                    <Building className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="mt-4 font-headline text-3xl md:text-4xl">NGO Dashboard</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">
                        Welcome, {user?.email}! Manage your organization's activities.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">NGO-specific content will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
