
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Download } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Party {
  name: string;
  role: string;
  contact: string;
}

interface TimelineEvent {
  date: string;
  event: string;
}

interface CaseDocument {
  name: string;
  type: string;
  dateAdded: string;
}

interface Case {
  id: string;
  title: string;
  status: string;
  lawyer?: string;
  client?: string;
  lead?: string;
  parties: Party[];
  timeline: TimelineEvent[];
  documents: CaseDocument[];
}

const citizenCases: Case[] = [
  { 
    id: 'CASE-001', 
    title: 'Property Dispute', 
    status: 'In Review', 
    lawyer: 'Adv. Sharma',
    parties: [
      { name: 'Ramesh Kumar', role: 'Petitioner', contact: 'ramesh@email.com' },
      { name: 'Suresh Singh', role: 'Respondent', contact: 'suresh@email.com' },
    ],
    timeline: [
      { date: '2023-01-15', event: 'Case Filed' },
      { date: '2023-02-01', event: 'First Hearing Notice Sent' },
      { date: '2023-02-20', event: 'First Hearing' },
    ],
    documents: [
      { name: 'PropertyDeed.pdf', type: 'Evidence', dateAdded: '2023-01-15' },
      { name: 'LegalNotice.pdf', type: 'Notice', dateAdded: '2023-01-10' },
    ]
  },
  { 
    id: 'CASE-002', 
    title: 'Divorce Filing', 
    status: 'Hearing Scheduled', 
    lawyer: 'Adv. Verma',
    parties: [
      { name: 'Anita Desai', role: 'Petitioner', contact: 'anita@email.com' },
      { name: 'Vijay Desai', role: 'Respondent', contact: 'vijay@email.com' },
    ],
    timeline: [
      { date: '2023-03-10', event: 'Petition Filed' },
      { date: '2023-03-25', event: 'Mediation Session 1' },
      { date: '2023-04-10', event: 'Hearing Scheduled for 2023-05-05' },
    ],
    documents: [
      { name: 'MarriageCert.pdf', type: 'Evidence', dateAdded: '2023-03-10' },
      { name: 'DivorcePetition.pdf', type: 'Pleading', dateAdded: '2023-03-10' },
    ]
  },
];

const lawyerCases: Case[] = [
   { 
    id: 'CASE-001', 
    title: 'Property Dispute', 
    status: 'In Review', 
    client: 'R. Kumar',
    parties: [
      { name: 'R. Kumar', role: 'Client (Petitioner)', contact: 'rkumar@email.com' },
      { name: 'S. Singh', role: 'Opposing Party', contact: 'ssingh@email.com' },
    ],
    timeline: [
      { date: '2023-01-15', event: 'Case Filed' },
      { date: '2023-02-01', event: 'Notice Served' },
    ],
    documents: [
      { name: 'PropertyTitle.pdf', type: 'Evidence', dateAdded: '2023-01-15' },
    ]
  },
  { 
    id: 'CASE-003', 
    title: 'Bail Application', 
    status: 'Awaiting Documents', 
    client: 'S. Singh',
     parties: [
      { name: 'S. Singh', role: 'Client (Accused)', contact: 's.singh@email.com' },
      { name: 'State of Maharashtra', role: 'Opposing Party', contact: 'n/a' },
    ],
    timeline: [
      { date: '2023-04-01', event: 'Arrested' },
      { date: '2023-04-02', event: 'Retained for Bail Application' },
    ],
    documents: [
      { name: 'FIR_Copy.pdf', type: 'Police Report', dateAdded: '2023-04-02' },
    ]
  },
];

const ngoCases: Case[] = [
  { 
    id: 'NGO-PIL-01', 
    title: 'Public Interest Litigation for Clean Air', 
    status: 'Filed', 
    lead: 'Adv. Mehta',
    parties: [
      { name: 'Clean Air Foundation', role: 'Petitioner (NGO)', contact: 'info@caf.org' },
      { name: 'Union of India', role: 'Respondent', contact: 'n/a' },
    ],
    timeline: [
      { date: '2023-02-01', event: 'PIL Drafted' },
      { date: '2023-02-15', event: 'PIL Filed in Supreme Court' },
    ],
    documents: [
      { name: 'PIL_Writ.pdf', type: 'Pleading', dateAdded: '2023-02-15' },
      { name: 'ExpertReport_AirQuality.pdf', type: 'Evidence', dateAdded: '2023-02-10' },
    ]
  },
];


export default function DashboardPage() {
  const {t} = useLanguage();

  const generateEBrief = (caseData: Case) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPos = 20;

    // Title
    doc.setFontSize(18);
    doc.text("Case eBrief / Docket", 105, yPos, { align: "center" });
    yPos += 10;

    doc.setFontSize(14);
    doc.text(`${caseData.title} (${caseData.id})`, 105, yPos, { align: "center" });
    yPos += 15;

    // Parties Involved
    doc.setFontSize(14);
    doc.text("Parties Involved", 14, yPos);
    yPos += 5;
    (doc as any).autoTable({
      startY: yPos,
      head: [['Name', 'Role', 'Contact']],
      body: caseData.parties.map(p => [p.name, p.role, p.contact]),
      theme: 'grid',
      headStyles: { fillColor: [13, 25, 24] },
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;
    
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }

    // Case Timeline
    doc.setFontSize(14);
    doc.text("Case Timeline", 14, yPos);
    yPos += 5;
    (doc as any).autoTable({
      startY: yPos,
      head: [['Date', 'Event/Activity']],
      body: caseData.timeline.map(t => [t.date, t.event]),
      theme: 'grid',
      headStyles: { fillColor: [13, 25, 24] },
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;

    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }

    // Documents
    doc.setFontSize(14);
    doc.text("Documents Log", 14, yPos);
    yPos += 5;
    (doc as any).autoTable({
      startY: yPos,
      head: [['Document Name', 'Type', 'Date Added']],
      body: caseData.documents.map(d => [d.name, d.type, d.dateAdded]),
      theme: 'grid',
      headStyles: { fillColor: [13, 25, 24] },
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;

    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    // Legal Notice
    doc.setFontSize(14);
    doc.text("Lawyer's Notice / Summary", 14, yPos);
    yPos += 8;
    doc.setFontSize(10);
    const noticeText = `This document is a generated eBrief for case ${caseData.id}. It includes a summary of the parties involved, a timeline of significant events, and a log of documents filed. This summary is for informational purposes only and does not constitute a formal legal document. Please refer to the official court records for certified information.
    \nGenerated on: ${new Date().toLocaleDateString()}`;
    const splitText = doc.splitTextToSize(noticeText, 180);
    doc.text(splitText, 14, yPos);
    
    doc.save(`eBrief-${caseData.id}.pdf`);
  };

  const renderCaseCard = (c: Case) => (
    <Card key={c.id} className="flex flex-col bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline">{c.title}</CardTitle>
        <CardDescription>{c.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex-1">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant={c.status.includes('Review') || c.status.includes('ಪರಿಶೀಲನೆ') || c.status.includes('समीक्षा') ? 'secondary' : 'default'}>{c.status}</Badge>
        </div>
        {c.lawyer && <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground">Lawyer:</span><span className="font-medium">{c.lawyer}</span></div>}
        {c.client && <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground">Client:</span><span className="font-medium">{c.client}</span></div>}
        {c.lead && <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground">Lead:</span><span className="font-medium">{c.lead}</span></div>}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => generateEBrief(c)}>
          <Download className="mr-2 h-4 w-4" />
          Generate eBrief
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <LayoutDashboard className="h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-xl">Manage your cases, track progress, and generate eBriefs for a comprehensive overview of each case.</p>
      </div>

      <Tabs defaultValue="citizen" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="citizen">Citizen View</TabsTrigger>
          <TabsTrigger value="lawyer">Lawyer View</TabsTrigger>
          <TabsTrigger value="ngo">NGO View</TabsTrigger>
        </TabsList>
        <TabsContent value="citizen" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {citizenCases.map(renderCaseCard)}
          </div>
        </TabsContent>
        <TabsContent value="lawyer" className="mt-6">
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lawyerCases.map(renderCaseCard)}
          </div>
        </TabsContent>
        <TabsContent value="ngo" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ngoCases.map(renderCaseCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
