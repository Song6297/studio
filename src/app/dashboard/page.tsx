
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const citizenCases = [
  // English
  { id: 'CASE-001', title: 'Property Dispute', status: 'In Review', lawyer: 'Adv. Sharma' },
  { id: 'CASE-002', title: 'Divorce Filing', status: 'Hearing Scheduled', lawyer: 'Adv. Verma' },
  // Kannada
  { id: 'ಪ್ರಕರಣ-೦೦೩', title: 'ಆಸ್ತಿ ವಿವಾದ', status: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ', lawyer: 'ವಕೀಲ ಶರ್ಮಾ' },
  // Hindi
  { id: 'मामला-००४', title: 'संपत्ति विवाद', status: 'समीक्षा में', lawyer: 'अधिवक्ता शर्मा' },
];

const lawyerCases = [
  // English
  { id: 'CASE-001', title: 'Property Dispute', status: 'In Review', client: 'R. Kumar' },
  { id: 'CASE-003', title: 'Bail Application', status: 'Awaiting Documents', client: 'S. Singh' },
  // Kannada
  { id: 'ಪ್ರಕರಣ-೦೦೪', title: 'ಒಪ್ಪಂದ ಉಲ್ಲಂಘನೆ', status: 'ಸಮಾಲೋಚನೆ', client: 'ಪಿ. ಗುಪ್ತಾ' },
  // Hindi
  { id: 'मामला-००५', title: 'जमानत याचिका', status: 'दस्तावेजों का इंतजार', client: 'एस. सिंह' },
];

const ngoCases = [
  // English
  { id: 'NGO-PIL-01', title: 'Public Interest Litigation for Clean Air', status: 'Filed', lead: 'Adv. Mehta' },
  // Kannada
  { id: 'ಎನ್‌ಜಿಒ-ಪಿಐಎಲ್-೦೨', title: 'ಸ್ವಚ್ಛ ಗಾಳಿಗಾಗಿ ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿ ಮೊಕದ್ದಮೆ', status: 'ದಾಖಲಿಸಲಾಗಿದೆ', lead: 'ವಕೀಲ ಮೆಹ್ತಾ' },
  // Hindi
  { id: 'एनजीओ-पीआईएल-०३', title: 'कानूनी जागरूकता शिविर - ग्रामीण क्षेत्र', status: 'पूर्ण', lead: 'टीम लीड' },
];


export default function DashboardPage() {
  const {t} = useLanguage();
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <LayoutDashboard className="h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Manage your cases and track your progress.</p>
      </div>

      <Tabs defaultValue="citizen" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="citizen">Citizen View</TabsTrigger>
          <TabsTrigger value="lawyer">Lawyer View</TabsTrigger>
          <TabsTrigger value="ngo">NGO View</TabsTrigger>
        </TabsList>
        <TabsContent value="citizen" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {citizenCases.map((c) => (
              <Card key={c.id} className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-headline">{c.title}</CardTitle>
                  <CardDescription>{c.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={c.status.includes('Review') || c.status.includes('ಪರಿಶೀಲನೆ') || c.status.includes('समीक्षा') ? 'secondary' : 'default'}>{c.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lawyer:</span>
                    <span className="font-medium">{c.lawyer}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lawyer" className="mt-6">
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lawyerCases.map((c) => (
              <Card key={c.id} className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-headline">{c.title}</CardTitle>
                  <CardDescription>{c.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary">{c.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Client:</span>
                    <span className="font-medium">{c.client}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ngo" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ngoCases.map((c) => (
              <Card key={c.id} className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-headline">{c.title}</CardTitle>
                  <CardDescription>{c.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge>{c.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lead:</span>
                    <span className="font-medium">{c.lead}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
