
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';
import { FileSearch, ShieldAlert, Eye, Building, User, Scale } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';

interface Case {
  id: string;
  fullName: string;
  caseCategory: string;
  status: 'new' | 'in-progress' | 'resolved';
  submittedAt: Timestamp;
}

function CaseStatusPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This page is for admins/NGOs to see all cases.
    // Logged-in users should see their cases on their dashboard.
    // For now, let's keep it open but add a note or redirect if not an admin role in future.
    async function fetchCases() {
      try {
        const casesCollection = collection(db, 'cases');
        const q = query(casesCollection, orderBy('submittedAt', 'desc'));
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

    fetchCases();
  }, [t]);

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

  const handleRowClick = (caseId: string) => {
    router.push(`/case-status/${caseId}`);
  };

  return (
    <div className="container py-12 md:py-24">
      
      { user && (
         <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader className="flex-row items-center gap-4">
                <ShieldAlert className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Looking for your cases?</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        You can find a personalized list of all cases you've submitted on your personal dashboard.
                    </CardDescription>
                </div>
            </CardHeader>
             <CardContent>
                <Button onClick={() => router.push('/dashboard')}>Go to My Dashboard</Button>
            </CardContent>
        </Card>
      )}

      <Card className="mx-auto max-w-5xl">
        <CardHeader className="text-center p-8">
            <FileSearch className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="mt-4 font-headline text-3xl md:text-4xl">{t('caseStatus.title')}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
                {t('caseStatus.description')}
            </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4 gap-4">
            <Button variant="outline" onClick={() => router.push('/advocate-dashboard/demo')}>
              <User className="mr-2" /> View Demo Advocates
            </Button>
            <Button variant="outline" onClick={() => router.push('/law-firm-dashboard/demo')}>
              <Building className="mr-2" /> View Demo Law Firms
            </Button>
            <Button onClick={() => router.push('/case-status/demo')}>
              <Eye className="mr-2" /> View Demo Cases
            </Button>
          </div>
          {isLoading || authLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Scale className="h-12 w-12 animate-bounce text-primary" />
              <p className="mt-4 text-muted-foreground">{t('caseStatus.loading')}</p>
            </div>
          ) : error ? (
            <div className="text-center text-destructive">{error}</div>
          ) : cases.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">{t('caseStatus.noCases')}</div>
          ) : (
            <div className="border rounded-lg">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[150px]">{t('caseStatus.table.caseId')}</TableHead>
                    <TableHead>{t('caseStatus.table.name')}</TableHead>
                    <TableHead>{t('caseStatus.table.category')}</TableHead>
                    <TableHead>{t('caseStatus.table.submitted')}</TableHead>
                    <TableHead className="text-right">{t('caseStatus.table.status')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cases.map((caseItem) => (
                    <TableRow key={caseItem.id} onClick={() => handleRowClick(caseItem.id)} className="cursor-pointer">
                        <TableCell className="font-medium truncate max-w-[150px]">{caseItem.id}</TableCell>
                        <TableCell>{caseItem.fullName}</TableCell>
                        <TableCell>{caseItem.caseCategory}</TableCell>
                        <TableCell>{formatDate(caseItem.submittedAt)}</TableCell>
                        <TableCell className="text-right">
                        <Badge variant={getStatusVariant(caseItem.status)}>
                            {t(`caseStatus.statusLabels.${caseItem.status}`)}
                        </Badge>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CaseStatusPage;
