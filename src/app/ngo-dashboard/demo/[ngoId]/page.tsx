
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Briefcase, BarChart2, CalendarPlus, HandHelping, Filter, CheckCircle, Clock, Edit, Trash2, Mail, UserPlus, UserMinus, UserCheck, Award, HeartHand, GraduationCap, School } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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
    mission: 'To provide free, high-quality legal aid and social support to underprivileged communities, ensuring that no one is denied justice or basic needs.',
    metrics: {
      casesSupported: 250,
      volunteersActive: 45,
      eventsOrganized: 15,
    },
    officeBearers: [
        { name: 'Mr. Prakash Rao', role: 'President', imageHint: 'senior indian man portrait' },
        { name: 'Ms. Sunita Sharma', role: 'Secretary', imageHint: 'middle-aged indian woman professional' },
        { name: 'Mr. Arjun Desai', role: 'Treasurer', imageHint: 'man professional glasses' },
    ],
    members: [
        { name: 'Ravi Kumar', imageHint: 'young indian man' },
        { name: 'Priya Patel', imageHint: 'young indian woman' },
        { name: 'Sanjay Singh', imageHint: 'man portrait serious' },
    ],
    cases: [
      { id: 'CASE-101', category: 'Family Law', status: 'In-Progress', volunteerId: 1, volunteer: 'Ananya Sharma' },
      { id: 'CASE-102', category: 'Consumer Rights', status: 'Resolved', volunteerId: 2, volunteer: 'Rohan Verma' },
      { id: 'CASE-103', category: 'Property Law', status: 'New', volunteerId: null, volunteer: null },
      { id: 'CASE-104', category: 'Family Law', status: 'New', volunteerId: null, volunteer: null },
    ],
    volunteers: [
      { id: 1, name: 'Ananya Sharma', skills: ['Legal Research', 'Family Law'], status: 'Assigned', imageHint: 'young woman portrait' },
      { id: 2, name: 'Rohan Verma', skills: ['Documentation', 'Consumer Law'], status: 'Assigned', imageHint: 'young man professional' },
      { id: 3, name: 'Priya Singh', skills: ['Client Interviewing', 'Drafting'], status: 'Available', imageHint: 'professional woman smiling' },
    ],
    aidPrograms: [
      { id: 'AID-01', name: 'Monthly Medical Camp', type: 'Medical Aid', icon: HeartHand },
      { id: 'AID-02', name: 'Student Scholarship Program', type: 'Education Aid', icon: GraduationCap },
      { id: 'AID-03', name: 'Community Marriage Support', type: 'Marriage Aid', icon: Users },
    ],
    impactAnalytics: {
      chartData: [
        { category: 'Legal Cases', count: 90 },
        { category: 'Medical Aid', count: 120 },
        { category: 'Education Aid', count: 45 },
        { category: 'Other Events', count: 35 },
      ]
    }
  },
  'cyber-guardians': {
    id: 'cyber-guardians',
    name: 'Cyber Guardians Initiative',
    mission: 'Dedicated to educating citizens about their digital rights, combating online fraud, and providing support to victims of cybercrime.',
     metrics: { casesSupported: 180, volunteersActive: 25, eventsOrganized: 30 },
     officeBearers: [
        { name: 'Dr. Alisha Verma', role: 'Director', imageHint: 'female tech expert' },
     ],
     members: [],
     cases: [
      { id: 'CASE-201', category: 'Online Fraud', status: 'In-Progress', volunteerId: 1, volunteer: 'Vikram Reddy' },
      { id: 'CASE-202', category: 'Cyberbullying', status: 'Resolved', volunteerId: 2, volunteer: 'Sunita Rao' },
      { id: 'CASE-203', category: 'Data Privacy', status: 'New', volunteerId: null, volunteer: null },
    ],
    volunteers: [
        { id: 1, name: 'Vikram Reddy', skills: ['Digital Forensics', 'IT Act'], status: 'Assigned', imageHint: 'tech professional' },
        { id: 2, name: 'Sunita Rao', skills: ['Victim Counseling', 'Documentation'], status: 'Assigned', imageHint: 'counselor portrait' },
    ],
    aidPrograms: [
      { id: 'AID-C-01', name: 'Safe Internet Workshop', type: 'Education Aid', icon: School },
    ],
     impactAnalytics: {
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
    metrics: { casesSupported: 400, volunteersActive: 15, eventsOrganized: 50 },
    officeBearers: [],
    members: [],
    cases: [],
    volunteers: [],
    aidPrograms: [],
     impactAnalytics: {
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
type AidProgram = typeof demoNgoData['justice-foundation']['aidPrograms'][0];
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

function AddVolunteerDialog({ onSave, onCancel }: { onSave: (newVolunteer: Volunteer) => void; onCancel: () => void }) {
    const [name, setName] = useState('');
    const [skills, setSkills] = useState('');

    const handleSave = () => {
        if (name && skills) {
            onSave({
                id: Date.now(),
                name,
                skills: skills.split(',').map(s => s.trim()),
                status: 'Available',
                imageHint: 'professional portrait'
            });
        }
    };

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Volunteer</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="vol-name">Volunteer Name</Label>
                        <Input id="vol-name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vol-skills">Skills (comma-separated)</Label>
                        <Input id="vol-skills" value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g., Legal Research, Drafting" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Add Volunteer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ManageVolunteersDialog({ volunteers, setVolunteers, onCancel }: { volunteers: Volunteer[]; setVolunteers: React.Dispatch<React.SetStateAction<Volunteer[]>>; onCancel: () => void }) {
    const { toast } = useToast();
    const [isAdding, setIsAdding] = useState(false);

    const handleRemove = (id: number) => {
        setVolunteers(prev => prev.filter(v => v.id !== id));
        toast({ title: "Volunteer Removed" });
    };

    const handleSaveNew = (newVolunteer: Volunteer) => {
        setVolunteers(prev => [...prev, newVolunteer]);
        setIsAdding(false);
        toast({ title: "Volunteer Added" });
    };

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Volunteers</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-2 max-h-[60vh] overflow-y-auto">
                    {volunteers.map(v => (
                        <div key={v.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50">
                            <Avatar><AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={v.imageHint} /><AvatarFallback>{v.name.charAt(0)}</AvatarFallback></Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{v.name}</p>
                                <p className="text-xs text-muted-foreground">{v.skills.join(', ')}</p>
                            </div>
                            <Badge variant={v.status === 'Available' ? 'secondary' : 'outline'}>{v.status}</Badge>
                            <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="ghost" size="icon" disabled={v.status === 'Assigned'}><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently remove {v.name}. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleRemove(v.id)}>Remove</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAdding(true)}><UserPlus className="mr-2" /> Add Volunteer</Button>
                </DialogFooter>
            </DialogContent>
            {isAdding && <AddVolunteerDialog onSave={handleSaveNew} onCancel={() => setIsAdding(false)} />}
        </Dialog>
    );
}


function AddProgramDialog({ onSave, onCancel }: { onSave: (newProgram: AidProgram) => void, onCancel: () => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSave = () => {
    if(name && type) {
        let icon = HandHelping;
        if(type === 'Medical Aid') icon = HeartHand;
        if(type === 'Education Aid') icon = GraduationCap;
        if(type === 'Marriage Aid') icon = Users;
        onSave({ id: `AID-${Date.now()}`, name, type, icon });
    }
  }

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Organize New Aid Program</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="program-name">Program Name / Title</Label>
            <Input id="program-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Free Health Check-up" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program-type">Program Type</Label>
             <Select onValueChange={setType}>
              <SelectTrigger id="program-type"><SelectValue placeholder="Select an aid type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Medical Aid">Medical Aid</SelectItem>
                <SelectItem value="Education Aid">Education Aid</SelectItem>
                <SelectItem value="Marriage Aid">Marriage Aid</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Add Program</Button>
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
  const [aidPrograms, setAidPrograms] = useState(ngoData?.aidPrograms || []);
  const [caseFilter, setCaseFilter] = useState('All');
  const [assigningCase, setAssigningCase] = useState<Case | null>(null);
  const [managingVolunteers, setManagingVolunteers] = useState(false);
  const [organizingProgram, setOrganizingProgram] = useState(false);
  
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
    setCases(cases.map(c => c.id === caseId ? { ...c, volunteerId, volunteer: volunteerName, status: 'In-Progress' } : c));
    setVolunteers(volunteers.map(v => v.id === volunteerId ? { ...v, status: 'Assigned' } : v));
    setAssigningCase(null);
    toast({ title: 'Volunteer Assigned', description: `${volunteerName} has been assigned to case ${caseId}.`});
  };

  const handleDeassignVolunteer = (caseId: string, volunteerId: number | null) => {
    if (!volunteerId) return;
    setCases(cases.map(c => c.id === caseId ? { ...c, volunteerId: null, volunteer: null, status: 'New' } : c));
    setVolunteers(volunteers.map(v => v.id === volunteerId ? { ...v, status: 'Available' } : v));
    toast({ title: 'Volunteer De-assigned', description: `Volunteer has been unassigned from case ${caseId}.`});
  };

  const handleCreateProgram = (newProgram: AidProgram) => {
    setAidPrograms([...aidPrograms, newProgram]);
    setOrganizingProgram(false);
    toast({ title: 'Program Organized!', description: `${newProgram.name} has been added to the schedule.`});
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
                    <p className="text-2xl font-bold">{volunteers.length}</p>
                    <p className="text-sm text-muted-foreground">Volunteers Active</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{ngoData.metrics.eventsOrganized}</p>
                    <p className="text-sm text-muted-foreground">Events Organized</p>
                </div>
            </div>
          </CardContent>
        </Card>
        
        {ngoData.officeBearers.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award/> Key Office Bearers</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {ngoData.officeBearers.map(bearer => (
                        <div key={bearer.name} className="flex flex-col items-center">
                            <Avatar className="h-24 w-24 mb-2">
                                <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={bearer.imageHint} />
                                <AvatarFallback>{bearer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold">{bearer.name}</p>
                            <p className="text-sm text-muted-foreground">{bearer.role}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}
        
        {ngoData.members.length > 0 && (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users/> Our Members</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-6">
                    {ngoData.members.map(member => (
                        <div key={member.name} className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={member.imageHint} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold mt-2 text-sm">{member.name}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase /> Case Management</CardTitle>
                    <CardDescription>Monitor legal cases and assign volunteers.</CardDescription>
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
                                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                            {c.volunteer ? <><UserCheck className="w-3 h-3 text-green-600"/> Assigned to: {c.volunteer}</> : <><UserMinus className="w-3 h-3 text-amber-600"/>Unassigned</>}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge variant={c.status === 'Resolved' ? 'outline' : 'default'} className={cn(c.status === 'New' && 'bg-amber-500')}>{c.status}</Badge>
                                        {c.status === 'New' && <Button size="sm" onClick={() => setAssigningCase(c)}>Assign Volunteer</Button>}
                                        {c.status === 'In-Progress' && <Button size="sm" variant="destructive" onClick={() => handleDeassignVolunteer(c.id, c.volunteerId)}>De-assign</Button>}
                                    </div>
                                </div>
                            </Card>
                        ))}
                        {filteredCases.length === 0 && <p className="text-center text-muted-foreground p-8">No cases with this status.</p>}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users /> Volunteer Coordination</CardTitle>
                    <CardDescription>Manage your active paralegal volunteers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {volunteers.slice(0, 4).map(v => (
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
                    <Button className="w-full" variant="outline" onClick={() => setManagingVolunteers(true)}>Manage Volunteers</Button>
                </CardFooter>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HandHelping/> Aid & Outreach Programs</CardTitle>
                    <CardDescription>Manage other social initiatives.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   {aidPrograms.map(program => {
                       const Icon = program.icon;
                       return (
                       <Card key={program.id} className="p-3">
                           <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-primary" />
                            <div>
                               <p className="font-semibold">{program.name}</p>
                               <p className="text-xs text-muted-foreground">{program.type}</p>
                            </div>
                           </div>
                       </Card>
                   )})}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => setOrganizingProgram(true)}><CalendarPlus className="mr-2"/> Organize New Program</Button>
                </CardFooter>
            </Card>

            <Card className="lg:col-span-2">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart2 /> Community Impact Analytics</CardTitle>
                    <CardDescription>Total support provided by category.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ngoData.impactAnalytics.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" name="Count" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </div>

      {assigningCase && <AssignVolunteerDialog caseItem={assigningCase} volunteers={volunteers} onAssign={handleAssignVolunteer} onCancel={() => setAssigningCase(null)} />}
      {organizingProgram && <AddProgramDialog onSave={handleCreateProgram} onCancel={() => setOrganizingProgram(false)} />}
      {managingVolunteers && <ManageVolunteersDialog volunteers={volunteers} setVolunteers={setVolunteers} onCancel={() => setManagingVolunteers(false)} />}
    </div>
  );
}

    