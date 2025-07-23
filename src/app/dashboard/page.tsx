
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, User, Shield, Gavel, Scale, FileSignature, ArrowRight, Bot } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


interface Case {
  id: string;
  category: string;
  description: string;
  status: 'Bidding Open' | 'In Progress' | 'Resolved';
  submittedAt: string;
  bids?: {
    advocateName: string;
    specialization: string;
    bidAmount: string;
    avatarHint: string;
  }[];
  judgment?: string;
}

const userCases: Case[] = [
    {
        id: 'CYB-2024-001',
        category: 'UPI Transaction Fraud',
        description: 'Lost ₹25,000 through a fraudulent UPI request disguised as a refund.',
        status: 'Bidding Open',
        submittedAt: '2 days ago',
        bids: [
            { advocateName: 'Adv. Vikram Singh', specialization: 'Cyber Law & IP', bidAmount: '₹10,000', avatarHint: 'man tech professional' },
            { advocateName: 'Adv. Alok Sharma', specialization: 'Criminal Law', bidAmount: '₹12,500', avatarHint: 'male lawyer portrait serious' }
        ]
    },
    {
        id: 'CYB-2024-002',
        category: 'Social Media Harassment',
        description: 'Facing continuous harassment and defamation from a fake profile on social media.',
        status: 'In Progress',
        submittedAt: '1 week ago',
    },
    {
        id: 'CYB-2023-087',
        category: 'Online Shopping Scam',
        description: 'Ordered a product from an e-commerce site, but received a fake item. Company is unresponsive.',
        status: 'Resolved',
        submittedAt: '6 months ago',
        judgment: 'The consumer forum ruled in favor of the user. The e-commerce company was ordered to refund the full amount of ₹15,000 and pay an additional ₹5,000 as compensation for mental distress.'
    }
];


function DashboardPage() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
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
    <div className="container py-12 md:py-16 bg-muted/20">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Sidebar for Profile & Actions */}
        <aside className="lg:col-span-4">
            <div className="space-y-6 sticky top-24">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user portrait" />
                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>Welcome!</CardTitle>
                            <CardDescription className="truncate">{user.email}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Button onClick={() => router.push('/case-submission')} className="w-full">
                           <FileSignature className="mr-2"/> Register New Cyber Crime Case
                         </Button>
                         <Button onClick={() => router.push('/ai-legal-guide')} variant="secondary" className="w-full">
                           <Bot className="mr-2"/> Ask AI Legal Advisor
                         </Button>
                    </CardContent>
                </Card>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
                 <LayoutDashboard className="h-8 w-8 text-primary" />
                 <h1 className="font-headline text-3xl font-bold">Citizen Dashboard</h1>
            </div>
            <Tabs defaultValue="active-cases">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active-cases">My Active Cases</TabsTrigger>
                    <TabsTrigger value="case-history">Case History & Judgments</TabsTrigger>
                </TabsList>
                
                {/* Active Cases Tab */}
                <TabsContent value="active-cases" className="mt-6 space-y-6">
                    {userCases.filter(c => c.status !== 'Resolved').map(caseItem => (
                        <Card key={caseItem.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge variant="secondary" className="mb-2">{caseItem.category}</Badge>
                                        <CardTitle>{caseItem.id}</CardTitle>
                                    </div>
                                     <Badge variant={caseItem.status === 'Bidding Open' ? 'default' : 'outline'}>{caseItem.status}</Badge>
                                </div>
                                <CardDescription>{caseItem.description}</CardDescription>
                            </CardHeader>
                            {caseItem.bids && caseItem.bids.length > 0 && (
                                <>
                                    <CardContent>
                                        <h4 className="font-semibold mb-4 flex items-center gap-2"><Gavel/> Advocate Bids</h4>
                                        <div className="space-y-4">
                                            {caseItem.bids.map(bid => (
                                                <div key={bid.advocateName} className="flex items-center gap-4 p-3 rounded-md border bg-background">
                                                    <Avatar>
                                                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint={bid.avatarHint} />
                                                        <AvatarFallback>{bid.advocateName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="font-bold">{bid.advocateName}</p>
                                                        <p className="text-sm text-muted-foreground">{bid.specialization}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-lg">{bid.bidAmount}</p>
                                                        <Button size="sm" variant="outline">View Profile</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Accept a Bid & Finalize Advocate</Button>
                                    </CardFooter>
                                </>
                            )}
                             {caseItem.status === 'In Progress' && (
                                <CardFooter>
                                    <Button onClick={() => router.push(`/case-status/${caseItem.id}`)} className="w-full">
                                        Track Case Progress <ArrowRight className="ml-2"/>
                                    </Button>
                                </CardFooter>
                             )}
                        </Card>
                    ))}
                </TabsContent>

                {/* Case History Tab */}
                <TabsContent value="case-history" className="mt-6 space-y-6">
                    {userCases.filter(c => c.status === 'Resolved').map(caseItem => (
                        <Card key={caseItem.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge variant="secondary" className="mb-2">{caseItem.category}</Badge>
                                        <CardTitle>{caseItem.id}</CardTitle>
                                    </div>
                                     <Badge variant="outline" className="text-green-600 border-green-600">Resolved</Badge>
                                </div>
                                <CardDescription>{caseItem.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold mb-2 flex items-center gap-2"><Scale /> Final Judgment</h4>
                                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground bg-background p-4 rounded-r-md">
                                    {caseItem.judgment}
                                </blockquote>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
