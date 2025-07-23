
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, AlertTriangle, FileText, Download, Scale } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/context/language-context';


interface Case {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  caseCategory: string;
  description: string;
  status: 'new' | 'in-progress' | 'resolved';
  submittedAt: Timestamp;
}

export default function CaseDetailsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const caseId = params.caseId as string;

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) return;

    async function fetchCase() {
      try {
        const caseDocRef = doc(db, 'cases', caseId);
        const docSnap = await getDoc(caseDocRef);

        if (docSnap.exists()) {
          setCaseData({ id: docSnap.id, ...docSnap.data() } as Case);
        } else {
          setError('Case not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch case details.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCase();
  }, [caseId]);

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
    return timestamp.toDate().toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Scale className="h-12 w-12 animate-bounce text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-bold text-destructive">{error}</h2>
        <Button onClick={() => router.back()} className="mt-6">
          <ArrowLeft className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  if (!caseData) {
    return null;
  }

  return (
    <div className="container py-12 md:py-16">
      <Button onClick={() => router.back()} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2" /> Back to Case List
      </Button>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardDescription>Case Details</CardDescription>
              <CardTitle className="font-mono text-xl">{caseData.id}</CardTitle>
            </div>
            <Badge variant={getStatusVariant(caseData.status)}>
              {t(`caseStatus.statusLabels.${caseData.status}`)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p>{caseData.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email Address</p>
              <p>{caseData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
              <p>{caseData.phone}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Case Category</p>
              <p>{caseData.caseCategory}</p>
            </div>
             <div>
              <p className="text-sm font-medium text-muted-foreground">Submitted On</p>
              <p>{formatDate(caseData.submittedAt)}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Case Description</p>
            <p className="whitespace-pre-wrap mt-1">{caseData.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t pt-6">
          <Button variant="outline" onClick={() => console.log('Edit case clicked')}>
            <Edit className="mr-2" /> Edit Case
          </Button>
          <Button variant="destructive" onClick={() => console.log('Withdraw case clicked')}>
            <Trash2 className="mr-2" /> Withdraw Case
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
