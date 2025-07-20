
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Loader2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

interface Case {
  id: string;
  fullName: string;
  caseCategory: string;
  status: 'new' | 'in-progress' | 'resolved';
  submittedAt: Timestamp;
  userId: string;
}

function DashboardPage() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      // Wait until authentication status is resolved
      return;
    }
    if (!user) {
      router.push('/register?type=login');
      return;
    }

    async function fetchCases(userId: string) {
      setIsLoading(true);
      try {
        const casesCollection = collection(db, 'cases');
        const q = query(casesCollection, where("userId", "==", userId), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const casesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Case[];
        setCases(casesData);
      } catch (err) {
        console.error(err);
        setError(t('caseStatus.error.fetch'));
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCases(user.uid);
  }, [user, authLoading, router, t]);

  const handleCardClick = (caseId: string) => {
    router.push(`/case-status/${caseId}`);
  };

  if (authLoading || isLoading) {
      return (
          <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
      );
  }

  const getStatusVariant = (status: Case['status']) => {
    switch (status) {
      case 'new': return 'secondary';
      case 'in-progress': return 'default';
      case 'resolved': return 'outline';
      default: return 'secondary';
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleDateString();
  };
  
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <LayoutDashboard className="h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('dashboard.title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('dashboard.description')}</p>
      </div>
      
      {error && <p className="text-center text-destructive">{error}</p>}
      {!isLoading && !error && cases.length === 0 && (
         <div className="text-center text-muted-foreground bg-card border rounded-lg p-8">
            <h3 className="text-xl font-semibold">{t('caseStatus.noCases')}</h3>
            <p className="mt-2">You have not submitted any cases yet.</p>
            <Button onClick={() => router.push('/case-submission')} className="mt-4">
              Register a New Case <ArrowRight className="ml-2" />
            </Button>
          </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map(caseItem => (
          <Card key={caseItem.id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCardClick(caseItem.id)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>{t('caseStatus.table.caseId')}</CardDescription>
                    <CardTitle className="font-mono text-base truncate">{caseItem.id}</CardTitle>
                  </div>
                  <Badge variant={getStatusVariant(caseItem.status)}>
                    {t(`caseStatus.statusLabels.${caseItem.status}`)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('caseStatus.table.name')}</p>
                    <p>{caseItem.fullName}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('caseStatus.table.category')}</p>
                    <p>{caseItem.caseCategory}</p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('caseStatus.table.submitted')}</p>
                    <p>{formatDate(caseItem.submittedAt)}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-4 border-t">
               <Button variant="outline" size="sm">
                View Details <ArrowRight className="ml-2" />
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
