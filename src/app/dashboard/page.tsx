import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard } from "lucide-react";

const citizenCases = [
  { id: 'CASE-001', title: 'Property Dispute', status: 'In Review', lawyer: 'Adv. Sharma' },
  { id: 'CASE-002', title: 'Divorce Filing', status: 'Hearing Scheduled', lawyer: 'Adv. Verma' },
];

const lawyerCases = [
  { id: 'CASE-001', title: 'Property Dispute', status: 'In Review', client: 'R. Kumar' },
  { id: 'CASE-003', title: 'Bail Application', status: 'Awaiting Documents', client: 'S. Singh' },
  { id: 'CASE-004', title: 'Contract Breach', status: 'Negotiation', client: 'P. Gupta' },
];

const ngoCases = [
  { id: 'NGO-PIL-01', title: 'Public Interest Litigation for Clean Air', status: 'Filed', lead: 'Adv. Mehta' },
  { id: 'NGO-AWR-05', title: 'Legal Awareness Camp - Rural Area', status: 'Completed', lead: 'Team Lead' },
];


export default function DashboardPage() {
  return (
    <div className="container py-12">
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
              <Card key={c.id}>
                <CardHeader>
                  <CardTitle className="font-headline">{c.title}</CardTitle>
                  <CardDescription>{c.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={c.status === 'In Review' ? 'secondary' : 'default'}>{c.status}</Badge>
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
              <Card key={c.id}>
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
              <Card key={c.id}>
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
