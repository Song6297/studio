
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Loader2, AlertTriangle, FileText, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/context/language-context';
import { getEbriefForCase } from './actions';
import type { GenerateEbriefOutput } from '@/ai/flows/generate-ebrief';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

function EbriefDialog({ caseData }: { caseData: Case }) {
  const { t } = useLanguage();
  const [ebrief, setEbrief] = useState<GenerateEbriefOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateEbrief = async () => {
    setIsLoading(true);
    setError(null);
    const result = await getEbriefForCase(caseData.id);
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setEbrief(result.data);
    }
    setIsLoading(false);
  };
  
  const handleDownloadPdf = () => {
    if (!ebrief) return;
    const doc = new jsPDF();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Case eBrief', 14, 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Case ID: ${caseData.id}`, 14, 30);
    doc.text(`Client Name: ${caseData.fullName}`, 14, 36);
    doc.text(`Category: ${caseData.caseCategory}`, 14, 42);

    const tableContent = [
        ['Summary', ebrief.summary],
        ['Potential Legal Issues', ebrief.legalIssues.join('\n- ')],
        ['Applicable Laws', ebrief.applicableLaws],
        ['Suggested Next Steps', ebrief.suggestedNextSteps]
    ];
    
    (doc as any).autoTable({
        startY: 50,
        head: [['Section', 'Details']],
        body: tableContent,
        theme: 'striped',
        styles: {
            cellPadding: 3,
            fontSize: 10,
        },
        headStyles: {
            fillColor: [22, 163, 74]
        },
    });

    doc.save(`eBrief-${caseData.id}.pdf`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary"><FileText className="mr-2" />{t('dashboard.generateEbrief')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{t('dashboard.generateEbrief')}</DialogTitle>
          <DialogDescription>
            Generate an AI-powered summary and analysis of this case.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!ebrief && !isLoading && !error && (
            <div className="text-center">
                <p className="mb-4">Click the button below to generate the eBrief.</p>
                <Button onClick={handleGenerateEbrief}>
                    <FileText className="mr-2" /> Generate eBrief
                </Button>
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center rounded-lg bg-background/50 p-6 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-lg font-medium text-muted-foreground">Generating eBrief...</p>
              <p className="text-sm text-muted-foreground/80">The AI is analyzing the case. This may take a moment.</p>
            </div>
          )}
          {error && (
             <Card className="bg-destructive/10 border-destructive/50">
              <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <h3 className="text-lg font-semibold text-destructive">Error Generating Brief</h3>
              </CardHeader>
              <CardContent>
                <p>{error}</p>
              </CardContent>
            </Card>
          )}
          {ebrief && (
             <Card>
                <CardHeader>
                    <CardTitle>eBrief for Case: {caseData.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-lg">Case Summary</h4>
                        <p className="text-muted-foreground text-sm">{ebrief.summary}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">Potential Legal Issues</h4>
                        <ul className="list-disc list-inside text-muted-foreground text-sm">
                            {ebrief.legalIssues.map(issue => <li key={issue}>{issue}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg">Applicable Laws</h4>
                        <p className="text-muted-foreground text-sm">{ebrief.applicableLaws}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg">Suggested Next Steps</h4>
                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{ebrief.suggestedNextSteps}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground italic">Disclaimer: AI-generated content. For informational purposes only.</p>
                    <Button onClick={handleDownloadPdf}>
                        <Download className="mr-2" /> Download as PDF
                    </Button>
                </CardFooter>
             </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
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
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
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
          <EbriefDialog caseData={caseData} />
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
