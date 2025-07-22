
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Briefcase, BarChart2, CalendarPlus, HandHelping, Filter, CheckCircle, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const demoNgoData = {
  'justice-foundation': {
    id: 'justice-foundation',
    name: 'Justice for All Foundation',
    mission: 'To provide free, high-quality legal aid to underprivileged communities, ensuring that no one is denied justice due to lack of resources.',
    metrics: {
      casesSupported: 250,
      volunteersActive: 45,
      campsOrganized: 12,
    },
    cases: [
      { id: 'CASE-101', category: 'Family Law', status: 'In-Progress', volunteer: 'Ananya Sharma' },
      { id: 'CASE-102', category: 'Consumer Rights', status: 'Resolved', volunteer: 'Rohan Verma' },
      { id: 'CASE-103', category: 'Property Law', status: 'New', volunteer: null },
      { id: 'CASE-104', category: 'Family Law', status: 'New', volunteer: null },
    ],
    volunteers: [
      { id: 1, name: 'Ananya Sharma', skills: ['Legal Research', 'Family Law'], status: 'Assigned', imageHint: 'young woman portrait' },
      { id: 2, name: 'Rohan Verma', skills: ['Documentation', 'Consumer Law'], status: 'Assigned', imageHint: 'young man professional' },
      { id: 3, name: 'Priya Singh', skills: ['Client Interviewing', 'Drafting'], status: 'Available', imageHint: 'professional woman smiling' },
    ],
    camps: [
      { id: 1, name: 'Free Legal Consultation Camp', date: new Date('2024-09-15'), location: 'Community Hall, Sector 15, Noida' }
    ],
    analytics: {
      chartData: [
        { category: 'Family Law', count: 90 },
        { category: 'Consumer', count: 75 },
        { category: 'Property', count: 50 },
        { category: 'RTI', count: 35 },
      ]
    }
  },
  'cyber-guardians': {
    id: 'cyber-guardians',
    name: 'Cyber Guardians Initiative',
    mission: 'Dedicated to educating citizens about their digital rights, combating online fraud, and providing support to victims of cybercrime.',
     metrics: { casesSupported: 180, volunteersActive: 25, campsOrganized: 30 },
     cases: [
      { id: 'CASE-201', category: 'Online Fraud', status: 'In-Progress', volunteer: 'Vikram Reddy' },
      { id: 'CASE-202', category: 'Cyberbullying', status: 'Resolved', volunteer: 'Sunita Rao' },
      { id: 'CASE-203', category: 'Data Privacy', status: 'New', volunteer: null },
    ],
    volunteers: [
        { id: 1, name: 'Vikram Reddy', skills: ['Digital Forensics', 'IT Act'], status: 'Assigned', imageHint: 'tech professional' },
        { id: 2, name: 'Sunita Rao', skills: ['Victim Counseling', 'Documentation'], status: 'Assigned', imageHint: 'counselor portrait' },
    ],
    camps: [
      { id: 1, name: 'Safe Internet Practices Workshop', date: new Date('2024-10-05'), location: 'Online Webinar' }
    ],
     analytics: {
      chartData: [
        { category: 'Online Fraud', count: 110 },
        { category: 'Cyberbullying', count: 40 },
        { category: 'Data Privacy', count: 30 },
      ]
    }
  },
   'rti-watchdogs': {
    id: 'rti-watchdogs',
    name: 'RTI Watchdogs',
    mission: 'Empowering citizens to demand government transparency and accountability by assisting them in filing Right to Information (RTI) applications.',
    metrics: { casesSupported: 400, volunteersActive: 15, campsOrganized: 50 },
    cases: [],
    volunteers: [],
    camps: [],
     analytics: {
      chartData: [
        { category: 'Public Works', count: 150 },
        { category: 'Social Schemes', count: 120 },
        { category: 'Govt. Appointments', count: 80 },
        { category: 'Other', count: 50 },
      ]
    }
  }
};

type Case = typeof demoNgoData['justice-foundation']['cases'][0];
type Volunteer = typeof demoNgoData['justice-foundation']['volunteers'][0];
type Camp = typeof demoNgoData['justice-foundation']['camps'][0];
type DemoNgo = typeof demoNgoData['justice-foundation'];

function AssignVolunteerDialog({ caseItem, volunteers, onAssign, onCancel }: { caseItem: Case, volunteers: Volunteer[], onAssign: (caseId: string, volunteerId: number) => void, onCancel: () => void }) {
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>('');

  const handleAssign = () => {
    if (selectedVolunteer) {
      onAssign(caseItem.id, parseInt(selectedVolunteer));
    }
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Volunteer to Case: {caseItem.id}</DialogTitle>
          <DialogDescription>Select an available volunteer to assign to this case.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Label htmlFor="volunteer-select">Available Volunteers</Label>
          <Select onValueChange={setSelectedVolunteer}>
            <SelectTrigger id="volunteer-select">
              <SelectValue placeholder="Select a volunteer" />
            </SelectTrigger>
            <SelectContent>
              {volunteers.filter(v => v.status === 'Available').map(v => (
                <SelectItem key={v.id} value={v.id.toString()}>{v.name} ({v.skills.join(', ')})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleAssign}>Assign Volunteer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddCampDialog({ onSave, onCancel }: { onSave: (newCamp: Camp) => void, onCancel: () => void }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | undefined>();

  const handleSave = () => {
    if(name && location && date) {
      onSave({ id: Date.now(), name, location, date });
    }
  }

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Organize New Legal Aid Camp</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="camp-name">Camp Name / Title</Label>
            <Input id="camp-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Free Legal Consultation Camp" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="camp-location">Location</Label>
            <Input id="camp-location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Community Hall, Koramangala" />
          </div>
           <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Add Camp</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function DemoNgoDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const ngoId = params.ngoId as string;
  const ngoData: DemoNgo | undefined = (demoNgoData as any)[ngoId];
  
  const [cases, setCases] = useState(ngoData?.cases || []);
  const [volunteers, setVolunteers] = useState(ngoData?.volunteers || []);
  const [camps, setCamps] = useState(ngoData?.camps || []);
  const [caseFilter, setCaseFilter] = useState('All');
  const [assigningCase, setAssigningCase] = useState<Case | null>(null);
  const [organizingCamp, setOrganizingCamp] = useState(false);
  
  if (!ngoData) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold">Demo NGO Not Found</h2>
      </div>
    );
  }

  const filteredCases = cases.filter(c => caseFilter === 'All' || c.status === caseFilter);

  const handleAssignVolunteer = (caseId: string, volunteerId: number) => {
    const volunteerName = volunteers.find(v => v.id === volunteerId)?.name || 'A volunteer';
    setCases(cases.map(c => c.id === caseId ? { ...c, volunteer: volunteerName, status: 'In-Progress' } : c));
    setVolunteers(volunteers.map(v => v.id === volunteerId ? { ...v, status: 'Assigned' } : v));
    setAssigningCase(null);
    toast({ title: 'Volunteer Assigned', description: `${volunteerName} has been assigned to case ${caseId}.`});
  };

  const handleCreateCamp = (newCamp: Camp) => {
    setCamps([...camps, newCamp]);
    setOrganizingCamp(false);
    toast({ title: 'Camp Organized!', description: `${newCamp.name} has been added to the schedule.`});
  };


  return (
    <div className="container py-12 md:py-16">
      <Button onClick={() => router.back()} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2" /> Back to Demo NGOs
      </Button>

      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{ngoData.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{ngoData.mission}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-2xl font-bold">{ngoData.metrics.casesSupported}</p>
                    <p className="text-sm text-muted-foreground">Cases Supported</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{ngoData.metrics.volunteersActive}</p>
                    <p className="text-sm text-muted-foreground">Volunteers Active</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{ngoData.metrics.campsOrganized}</p>
                    <p className="text-sm text-muted-foreground">Camps Organized</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Case Management */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase /> Case Management</CardTitle>
                    <CardDescription>Monitor cases and assign volunteers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-muted-foreground"/>
                        <Button variant={caseFilter === 'All' ? 'secondary' : 'ghost'} size="sm" onClick={() => setCaseFilter('All')}>All</Button>
                        <Button variant={caseFilter === 'New' ? 'secondary' : 'ghost'} size="sm" onClick={() => setCaseFilter('New')}>New</Button>
                        <Button variant={caseFilter === 'In-Progress' ? 'secondary' : 'ghost'} size="sm" onClick={() => setCaseFilter('In-Progress')}>In-Progress</Button>
                        <Button variant={caseFilter === 'Resolved' ? 'secondary' : 'ghost'} size="sm" onClick={() => setCaseFilter('Resolved')}>Resolved</Button>
                    </div>
                    <div className="space-y-4">
                        {filteredCases.map(c => (
                            <Card key={c.id} className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-mono text-sm">{c.id}</p>
                                        <p className="font-semibold">{c.category}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {c.volunteer ? `Assigned to: ${c.volunteer}` : 'Unassigned'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge variant={c.status === 'Resolved' ? 'outline' : 'default'} className={cn(c.status === 'New' && 'bg-amber-500')}>{c.status}</Badge>
                                        {c.status === 'New' && <Button size="sm" onClick={() => setAssigningCase(c)}>Assign Volunteer</Button>}
                                    </div>
                                </div>
                            </Card>
                        ))}
                        {filteredCases.length === 0 && <p className="text-center text-muted-foreground p-8">No cases with this status.</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Volunteer Coordination */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users /> Volunteer Coordination</CardTitle>
                    <CardDescription>Manage your active paralegal volunteers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {volunteers.map(v => (
                        <div key={v.id} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={v.imageHint} />
                                <AvatarFallback>{v.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{v.name}</p>
                                <p className="text-xs text-muted-foreground">{v.skills.join(', ')}</p>
                            </div>
                             <Badge variant={v.status === 'Available' ? 'secondary' : 'outline'} className="ml-auto">{v.status}</Badge>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant="outline">Manage Volunteers</Button>
                </CardFooter>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Legal Aid Camps */}
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HandHelping/> Legal Aid Camps</CardTitle>
                    <CardDescription>Organize and manage outreach events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   {camps.map(camp => (
                       <Card key={camp.id} className="p-3">
                           <p className="font-semibold">{camp.name}</p>
                           <p className="text-sm text-muted-foreground flex items-center gap-2"><CalendarPlus className="w-4 h-4"/> {format(camp.date, "PPP")}</p>
                           <p className="text-xs text-muted-foreground">{camp.location}</p>
                       </Card>
                   ))}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => setOrganizingCamp(true)}><CalendarPlus className="mr-2"/> Organize New Camp</Button>
                </CardFooter>
            </Card>

            {/* Impact Analytics */}
            <Card className="lg:col-span-2">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart2 /> Impact Analytics</CardTitle>
                    <CardDescription>Total cases supported by category.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ngoData.analytics.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" name="Cases" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </div>

      {assigningCase && <AssignVolunteerDialog caseItem={assigningCase} volunteers={volunteers} onAssign={handleAssignVolunteer} onCancel={() => setAssigningCase(null)} />}
      {organizingCamp && <AddCampDialog onSave={handleCreateCamp} onCancel={() => setOrganizingCamp(false)} />}
    </div>
  );
}
