
'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Users, BarChart2, Loader2, AlertTriangle, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '@/context/auth-context';

interface Junior {
  name: string;
  role: string;
  experience: string;
  imageHint: string;
}

interface AdvocateData {
  id: string;
  fullName: string;
  specialization: string;
  // Add other fields as necessary from your firestore document
}

interface Case {
    status: string;
    caseCategory: string;
}

export default function AdvocateDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const advocateId = params.advocateId as string;
  const { user, loading: authLoading } = useAuth();

  const [advocateData, setAdvocateData] = useState<AdvocateData | null>(null);
  const [juniors, setJuniors] = useState<Junior[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!advocateId) return;

    if (authLoading) return;
    if (!user) {
        router.push('/register?type=login');
        return;
    }

    async function fetchAdvocateData() {
      try {
        const advocateDocRef = doc(db, 'advocates', advocateId);
        const advocateDocSnap = await getDoc(advocateDocRef);

        if (advocateDocSnap.exists()) {
          const advocateDocData = advocateDocSnap.data();
           if(advocateDocData.userId !== user?.uid){
            setError('You do not have permission to view this dashboard.');
            setIsLoading(false);
            return;
          }

          setAdvocateData({ id: advocateDocSnap.id, ...advocateDocData } as AdvocateData);

          setJuniors([
            { name: 'Ria Sharma', role: 'Junior Advocate', experience: '2 Years', imageHint: 'young female lawyer' },
            { name: 'Sameer Singh', role: 'Paralegal', experience: '1 Year', imageHint: 'young male professional' },
          ]);
          
          const casesCollection = collection(db, 'cases');
          const querySnapshot = await getDocs(casesCollection);
          const cases = querySnapshot.docs.map(doc => doc.data() as Case);
          
          const analytics: {[key: string]: {solved: number, pending: number}} = {};
          cases.forEach(c => {
              if(!analytics[c.caseCategory]){
                  analytics[c.caseCategory] = { solved: 0, pending: 0};
              }
              if(c.status === 'resolved'){
                  analytics[c.caseCategory].solved++;
              } else {
                  analytics[c.caseCategory].pending++;
              }
          });

          setAnalyticsData(Object.entries(analytics).map(([key, value]) => ({category: key, ...value})));

        } else {
          setError('Advocate not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch advocate details.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdvocateData();
  }, [advocateId, user, authLoading, router]);

  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-bold text-destructive">{error}</h2>
        <Button onClick={() => router.push('/')} className="mt-6">
          <ArrowLeft className="mr-2" /> Go Home
        </Button>
      </div>
    );
  }

  if (!advocateData) {
    return null;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline text-3xl font-bold">Advocate Dashboard</h1>
        <Button onClick={() => router.push('/case-status')} variant="outline">
          <ArrowLeft className="mr-2" /> Back to Case Lists
        </Button>
      </div>

      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="male lawyer portrait" />
                <AvatarFallback>{advocateData.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-3xl">{advocateData.fullName}</CardTitle>
              <CardDescription className="text-lg">
                <Badge>{advocateData.specialization || 'General Practice'}</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Welcome to your dashboard. Here you can manage your team, track cases, and view analytics.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users /> Team Management</CardTitle>
              <CardDescription>Your current juniors and paralegals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {juniors.map((member, index) => (
                <div key={index} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50">
                   <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={member.imageHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role} ({member.experience})</p>
                  </div>
                </div>
              ))}
            </CardContent>
             <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" variant="outline">Manage Team</Button>
                <Button className="w-full"><UserPlus className="mr-2"/> Hire Law Graduate</Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart2 /> Case Analytics</CardTitle>
              <CardDescription>Cases Solved vs. Pending by Category</CardDescription>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="solved" fill="hsl(var(--primary))" name="Solved" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="hsl(var(--muted))" name="Pending" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
