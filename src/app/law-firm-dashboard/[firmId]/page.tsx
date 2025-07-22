
'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Users, BarChart2, Loader2, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '@/context/auth-context';

interface Staff {
  name: string;
  role: string;
  experience: string;
  imageHint: string;
}

interface FirmData {
  id: string;
  firmName: string;
  practiceArea: string;
  // Add other fields as necessary from your firestore document
}

interface Case {
    status: string;
    caseCategory: string;
}


export default function LawFirmDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const firmId = params.firmId as string;
  const { user, loading: authLoading } = useAuth();

  const [firmData, setFirmData] = useState<FirmData | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firmId) return;

    if (authLoading) return;
    if (!user) {
        router.push('/register?type=login');
        return;
    }

    async function fetchFirmData() {
      try {
        const firmDocRef = doc(db, 'lawFirms', firmId);
        const firmDocSnap = await getDoc(firmDocRef);

        if (firmDocSnap.exists()) {
          const firmDocData = firmDocSnap.data();
          if(firmDocData.userId !== user?.uid){
            setError('You do not have permission to view this dashboard.');
            setIsLoading(false);
            return;
          }

          setFirmData({ id: firmDocSnap.id, ...firmDocData } as FirmData);

          setStaff([
            { name: 'Lead Counsel', role: 'Managing Partner', experience: '20 Years', imageHint: 'senior male lawyer' },
            { name: 'Associate Lawyer', role: 'Associate', experience: '5 Years', imageHint: 'junior female lawyer' },
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
          setError('Law firm not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch firm details.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchFirmData();
  }, [firmId, user, authLoading, router]);

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

  if (!firmData) {
    return null;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline text-3xl font-bold">Law Firm Dashboard</h1>
        <Button onClick={() => router.push('/case-status')} variant="outline">
          <ArrowLeft className="mr-2" /> Back to Case Lists
        </Button>
      </div>

      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <Building className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">{firmData.firmName}</CardTitle>
              <CardDescription className="text-lg">
                <Badge>{firmData.practiceArea}</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Welcome to your firm's dashboard. Here you can manage staff, track cases, and view analytics.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users /> Team Management</CardTitle>
              <CardDescription>Current staff and their roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {staff.map((member, index) => (
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
             <CardFooter>
                <Button className="w-full" variant="outline">Manage Staff</Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart2 /> Firm Analytics</CardTitle>
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
