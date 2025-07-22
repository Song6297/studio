
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, BarChart2, Star, Mail, UserPlus, Edit, Trash2, UserX, Gavel, FileText, CheckCircle2, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const demoAdvocateData = {
  'alok-sharma': {
    id: 'alok-sharma',
    name: 'Adv. Alok Sharma',
    specialization: 'Criminal Law',
    bio: 'A seasoned litigator with over 15 years of experience in criminal defense, Adv. Sharma is known for his strategic approach and dedication to justice. He has a high success rate in complex trials.',
    juniors: [
      { id: 1, name: 'Ravi Verma', role: 'Junior Counsel', experience: '3 Years', imageHint: 'junior male lawyer serious', performance: 'High Performer', contact: 'ravi.v@aloksharma.demo', status: 'active' },
      { id: 2, name: 'Sunita Menon', role: 'Paralegal', experience: '5 Years', imageHint: 'female professional glasses', performance: 'Reliable', contact: 'sunita.m@aloksharma.demo', status: 'active' },
    ],
    analytics: {
      chartData: [
        { category: 'Bail', solved: 150, pending: 20 },
        { category: 'Trial Defense', solved: 40, pending: 15 },
        { category: 'Appeals', solved: 30, pending: 5 },
        { category: 'White-Collar', solved: 10, pending: 8 },
      ]
    },
    cases: {
      available: [
        { id: 'CASE-001', category: 'Theft', description: 'Client accused of shoplifting from a retail store. Claims mistaken identity.' },
        { id: 'CASE-002', category: 'Assault', description: 'Altercation outside a pub resulting in minor injuries. Client claims self-defense.' },
      ],
      pending: [
        { id: 'CASE-003', category: 'Bail Application', description: 'Seeking pre-arrest bail for a client in a financial fraud case.', status: 'Hearing Scheduled' },
        { id: 'CASE-004', category: 'Trial', description: 'Defending a client in a high-profile cheating case. Evidence examination ongoing.', status: 'Trial in Progress' },
      ],
      resolved: [
        { id: 'CASE-005', category: 'Acquittal', description: 'Successfully acquitted a client falsely accused in a dowry harassment case.', outcome: 'Acquitted' },
        { id: 'CASE-006', category: 'Bail Granted', description: 'Secured bail for a client accused of reckless driving.', outcome: 'Bail Granted' },
      ]
    }
  },
  'sunita-gupta': {
    id: 'sunita-gupta',
    name: 'Adv. Sunita Gupta',
    specialization: 'Family Law',
    bio: 'Specializing in divorce, child custody, and mediation, Adv. Gupta provides compassionate and effective legal counsel. She is a certified mediator and focuses on amicable resolutions.',
    juniors: [
      { id: 1, name: 'Anjali Desai', role: 'Associate Advocate', experience: '4 Years', imageHint: 'young female lawyer smiling', performance: 'Top Performer', contact: 'anjali.d@sunitagupta.demo', status: 'active' },
    ],
     analytics: {
      chartData: [
        { category: 'Divorce', solved: 80, pending: 10 },
        { category: 'Child Custody', solved: 50, pending: 8 },
        { category: 'Mediation', solved: 120, pending: 15 },
        { category: 'Maintenance', solved: 60, pending: 5 },
      ]
    },
    cases: {
      available: [],
      pending: [],
      resolved: []
    }
  },
   'vikram-singh': {
    id: 'vikram-singh',
    name: 'Adv. Vikram Singh',
    specialization: 'Cyber Law & IP',
    bio: 'A specialist in the digital domain, focusing on data privacy, cybercrime defense, and intellectual property protection. He frequently writes for leading tech law journals.',
    juniors: [
      { id: 1, name: 'Sameer Rao', role: 'Tech-Legal Analyst', experience: '2 Years', imageHint: 'young male professional tech', performance: 'Rising Star', contact: 'sameer.r@vikramsingh.demo', status: 'active' },
      { id: 2, name: 'Priya Nair', role: 'IP Paralegal', experience: '3 Years', imageHint: 'female professional corporate', performance: 'Consistent', contact: 'priya.n@vikramsingh.demo', status: 'active' },
    ],
     analytics: {
      chartData: [
        { category: 'Data Privacy', solved: 40, pending: 12 },
        { category: 'Cybercrime', solved: 25, pending: 8 },
        { category: 'Trademark', solved: 90, pending: 20 },
        { category: 'Copyright', solved: 75, pending: 10 },
      ]
    },
    cases: {
      available: [],
      pending: [],
      resolved: []
    }
  }
};

type JuniorMember = typeof demoAdvocateData['alok-sharma']['juniors'][0];
type DemoAdvocate = typeof demoAdvocateData['alok-sharma'];
type Case = { id: string, category: string, description: string, status?: string, outcome?: string };


function AddJuniorDialog({ onSave, onCancel }: { onSave: (newJunior: JuniorMember) => void, onCancel: () => void }) {
    const [newJunior, setNewJunior] = useState<Omit<JuniorMember, 'id' | 'status'>>({
        name: '',
        role: 'Law Graduate',
        experience: '0 Years',
        imageHint: 'professional portrait',
        performance: 'New Hire',
        contact: ''
    });

    const handleSave = () => {
        if (newJunior.name && newJunior.contact) {
            onSave({ ...newJunior, id: Date.now(), status: 'active' });
        }
    };

    return (
        <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hire Law Graduate</DialogTitle>
                    <DialogDescription>Add a new junior or paralegal to your team.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-name">Name</Label>
                        <Input id="new-name" value={newJunior.name} onChange={(e) => setNewJunior({ ...newJunior, name: e.target.value })} placeholder="e.g., Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-role">Role</Label>
                         <Select value={newJunior.role} onValueChange={(value) => setNewJunior({ ...newJunior, role: value })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Junior Counsel">Junior Counsel</SelectItem>
                                <SelectItem value="Paralegal">Paralegal</SelectItem>
                                <SelectItem value="Law Graduate">Law Graduate</SelectItem>
                                <SelectItem value="Intern">Intern</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-contact">Contact Email</Label>
                        <Input id="new-contact" type="email" value={newJunior.contact} onChange={(e) => setNewJunior({ ...newJunior, contact: e.target.value })} placeholder="e.g., jane.d@practice.demo" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Add to Team</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function BidDialog({ caseItem, onBid, onCancel }: { caseItem: Case, onBid: (caseId: string, bidDetails: { amount: string, comments: string }) => void, onCancel: () => void }) {
    const [amount, setAmount] = useState('');
    const [comments, setComments] = useState('');

    const handleBid = () => {
        if (amount) {
            onBid(caseItem.id, { amount, comments });
        }
    };

    return (
        <Dialog open={true} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bid on Case: {caseItem.id}</DialogTitle>
                    <DialogDescription>
                        Review the case details and place your bid.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{caseItem.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{caseItem.description}</p>
                        </CardContent>
                    </Card>
                    <div className="space-y-2">
                        <Label htmlFor="bid-amount">Your Bidding Amount (INR)</Label>
                        <Input id="bid-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 25000" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bid-comments">Comments (Optional)</Label>
                        <Textarea id="bid-comments" value={comments} onChange={e => setComments(e.target.value)} placeholder="Add any comments about your approach..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleBid}>Submit Bid</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function DemoAdvocateDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const advocateId = params.advocateId as string;
  const advocateData: DemoAdvocate | undefined = (demoAdvocateData as any)[advocateId];
  
  const [juniors, setJuniors] = useState(advocateData?.juniors || []);
  const [isHiring, setIsHiring] = useState(false);
  const [biddingOnCase, setBiddingOnCase] = useState<Case | null>(null);


  if (!advocateData) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold">Demo Advocate Not Found</h2>
      </div>
    );
  }
  
  const handleContactClick = (email: string) => {
    toast({
        title: "Contact Details",
        description: `Email: ${email}`,
    })
  }

  const handleSaveNewHire = (newJunior: JuniorMember) => {
    setJuniors([...juniors, newJunior]);
    setIsHiring(false);
    toast({ title: "Team Member Added", description: `${newJunior.name} has been added to your team.` });
  };
  
  const handlePlaceBid = (caseId: string, bidDetails: { amount: string, comments: string }) => {
    console.log(`Bidding on ${caseId}`, bidDetails);
    setBiddingOnCase(null);
    toast({
        title: "Bid Submitted!",
        description: `Your bid of ₹${bidDetails.amount} for case ${caseId} has been submitted.`,
    });
  }

  return (
    <div className="container py-12 md:py-16">
      <Button onClick={() => router.back()} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2" /> Back to Demo Advocates
      </Button>

      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
             <Avatar className="h-20 w-20">
                <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="lawyer headshot" />
                <AvatarFallback>{advocateData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-3xl">{advocateData.name}</CardTitle>
              <CardDescription className="text-lg">
                <Badge>{advocateData.specialization}</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{advocateData.bio}</p>
          </CardContent>
        </Card>

        {/* Case Management Section */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gavel /> Case Management</CardTitle>
                <CardDescription>Bid on new cases and manage your existing caseload.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="available">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="available">Available Cases <Badge variant="destructive" className="ml-2">{advocateData.cases.available.length}</Badge></TabsTrigger>
                        <TabsTrigger value="pending">Pending Cases</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved Cases</TabsTrigger>
                    </TabsList>
                    <TabsContent value="available" className="mt-4">
                        <div className="space-y-4">
                            {advocateData.cases.available.length > 0 ? advocateData.cases.available.map(caseItem => (
                                <Card key={caseItem.id} className="flex flex-col sm:flex-row items-start justify-between p-4">
                                    <div className="flex-1 mb-4 sm:mb-0">
                                        <p className="font-bold text-primary">{caseItem.category}</p>
                                        <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                                    </div>
                                    <Button onClick={() => setBiddingOnCase(caseItem)}>View & Bid</Button>
                                </Card>
                            )) : <p className="text-center text-muted-foreground p-8">No new cases available for bidding.</p>}
                        </div>
                    </TabsContent>
                    <TabsContent value="pending" className="mt-4">
                         <div className="space-y-4">
                            {advocateData.cases.pending.map(caseItem => (
                                <Card key={caseItem.id} className="p-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-bold">{caseItem.category}</p>
                                            <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                                        </div>
                                        <Badge variant="secondary">{caseItem.status}</Badge>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="resolved" className="mt-4">
                         <div className="space-y-4">
                            {advocateData.cases.resolved.map(caseItem => (
                                <Card key={caseItem.id} className="p-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-bold">{caseItem.category}</p>
                                            <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                                        </div>
                                        <Badge variant="outline" className="text-green-600 border-green-600">{caseItem.outcome}</Badge>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users /> Team Management</CardTitle>
              <CardDescription>Your juniors and paralegals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {juniors.map((member, index) => (
                <div key={index} className={cn("flex items-center gap-4 p-2 rounded-md hover:bg-muted/50")}>
                   <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={member.imageHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role} ({member.experience})</p>
                     <div className="flex items-center text-xs mt-1">
                        <Star className="w-3 h-3 text-amber-500 mr-1" />
                        <span className="text-muted-foreground">Performance: {member.performance}</span>
                    </div>
                  </div>
                   <Button variant="ghost" size="icon" onClick={() => handleContactClick(member.contact)}>
                        <Mail className="h-4 w-4" />
                    </Button>
                </div>
              ))}
            </CardContent>
             <CardFooter>
                <Button className="w-full" onClick={() => setIsHiring(true)}><UserPlus className="mr-2"/> Hire Law Graduate</Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart2 /> Practice Analytics</CardTitle>
              <CardDescription>Cases Solved vs. Pending by Category (Last 12 Months)</CardDescription>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={300}>
                <BarChart data={advocateData.analytics.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Bar dataKey="solved" fill="hsl(var(--primary))" name="Solved" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="hsl(var(--muted))" name="Pending" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      {isHiring && <AddJuniorDialog onSave={handleSaveNewHire} onCancel={() => setIsHiring(false)} />}
      {biddingOnCase && <BidDialog caseItem={biddingOnCase} onBid={handlePlaceBid} onCancel={() => setBiddingOnCase(null)} />}
    </div>
  );
}
