
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Download, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Party {
    name: string;
    role: string;
}

interface CaseEvent {
    date: string;
    description: string;
}

interface Case {
  id: string;
  fullName: string;
  caseCategory: string;
  status: 'new' | 'in-progress' | 'resolved';
  submittedAt: Timestamp;
  description: string;
  parties: Party[];
  events: CaseEvent[];
  userId: string;
}

// Extend jsPDF with autoTable method
interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: any) => jsPDFWithAutoTable;
}


function DashboardPage() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/register?type=login');
      } else {
        fetchCases(user.uid);
      }
    }
  }, [user, authLoading, router]);

  async function fetchCases(userId: string) {
    setIsLoading(true);
    try {
      const casesCollection = collection(db, 'cases');
      const q = query(casesCollection, where("userId", "==", userId), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const casesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
              id: doc.id,
              fullName: data.fullName,
              caseCategory: data.caseCategory,
              status: data.status,
              submittedAt: data.submittedAt,
              description: data.description || 'No description provided.',
              parties: data.parties || [{name: data.fullName, role: 'Petitioner'}],
              events: data.events || [{date: data.submittedAt.toDate().toLocaleDateString(), description: 'Case registered.'}],
              userId: data.userId
          };
      }) as Case[];
      setCases(casesData);
    } catch (err) {
      console.error(err);
      setError(t('caseStatus.error.fetch'));
    } finally {
      setIsLoading(false);
    }
  }

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
  
  const generateEbrief = (caseData: Case) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;

    // Title
    doc.setFontSize(18);
    doc.text(`eBrief: Case ID ${caseData.id}`, 14, 22);

    // Case Details
    doc.setFontSize(12);
    doc.text(`Category: ${caseData.caseCategory}`, 14, 32);
    doc.text(`Status: ${caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}`, 14, 38);
    doc.text(`Submitted On: ${formatDate(caseData.submittedAt)}`, 14, 44);

    // Description
    doc.setFontSize(14);
    doc.text("Case Summary", 14, 60);
    doc.setFontSize(10);
    const splitDescription = doc.splitTextToSize(caseData.description, 180);
    doc.text(splitDescription, 14, 66);
    
    // Parties Table
    doc.autoTable({
        startY: 90,
        head: [['Parties Involved', 'Role']],
        body: caseData.parties.map(p => [p.name, p.role]),
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] }
    });

    // Events Table
    const finalY = (doc as any).autoTable.previous.finalY + 10;
    doc.autoTable({
        startY: finalY,
        head: [['Date', 'Event/Update']],
        body: caseData.events.map(e => [e.date, e.description]),
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save(`eBrief_${caseData.id}.pdf`);
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
        <p className="text-center text-muted-foreground">{t('caseStatus.noCases')}</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map(caseItem => (
          <Card key={caseItem.id} className="flex flex-col">
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
            <CardFooter>
              <Button className="w-full" onClick={() => generateEbrief(caseItem)}>
                <Download className="mr-2 h-4 w-4" />
                {t('dashboard.generateEbrief')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
