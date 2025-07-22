
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Users, Briefcase, BarChart2, Star, Mail, UserPlus, Edit, Trash2, UserX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const demoFirmData = {
  'agrawal-associates': {
    id: 'agrawal-associates',
    name: 'Agrawal & Associates',
    specialization: 'Corporate Law',
    history: 'Founded in 1998 by Rajan Agrawal, the firm has grown to become a leader in corporate law, advising numerous Fortune 500 companies in India. They are known for their meticulous approach to mergers and acquisitions.',
    staff: [
      { id: 1, name: 'Rajan Agrawal', role: 'Managing Partner', experience: '25 Years', imageHint: 'senior male lawyer', performance: 'Top Performer', contact: 'rajan.a@agrawal-associates.demo', status: 'active' },
      { id: 2, name: 'Priya Sharma', role: 'Senior Partner', experience: '18 Years', imageHint: 'senior female lawyer', performance: 'High Performer', contact: 'priya.s@agrawal-associates.demo', status: 'active' },
      { id: 3, name: 'Mohit Verma', role: 'Associate', experience: '5 Years', imageHint: 'junior male lawyer', performance: 'Rising Star', contact: 'mohit.v@agrawal-associates.demo', status: 'active' },
      { id: 4, name: 'Anjali Desai', role: 'Associate', experience: '4 Years', imageHint: 'junior female lawyer', performance: 'Consistent', contact: 'anjali.d@agrawal-associates.demo', status: 'active' },
      { id: 5, name: 'Suresh Menon', role: 'Paralegal', experience: '12 Years', imageHint: 'male professional', performance: 'Reliable', contact: 'suresh.m@agrawal-associates.demo', status: 'active' },
    ],
    analytics: {
      chartData: [
        { category: 'M&A', solved: 40, pending: 12 },
        { category: 'Compliance', solved: 120, pending: 25 },
        { category: 'Litigation', solved: 25, pending: 8 },
        { category: 'IP', solved: 60, pending: 15 },
      ]
    }
  },
  'singh-legal': {
    id: 'singh-legal',
    name: 'Singh Legal',
    specialization: 'Criminal Defense',
    history: 'Singh Legal was established in 2005 by Advocate Harshdeep Singh with a mission to provide robust defense for the accused. The firm has a high success rate and is respected for its dedication to justice.',
    staff: [
      { id: 1, name: 'Harshdeep Singh', role: 'Founder & Lead Counsel', experience: '20 Years', imageHint: 'male lawyer serious', performance: 'Top Performer', contact: 'harshdeep.s@singh-legal.demo', status: 'active' },
      { id: 2, name: 'Kavita Mathur', role: 'Junior Counsel', experience: '6 Years', imageHint: 'female lawyer portrait', performance: 'High Performer', contact: 'kavita.m@singh-legal.demo', status: 'active' },
      { id: 3, name: 'Ravi Jadeja', role: 'Investigator', experience: '10 Years', imageHint: 'male detective', performance: 'Reliable', contact: 'ravi.j@singh-legal.demo', status: 'active' },
    ],
     analytics: {
      chartData: [
        { category: 'Bail', solved: 250, pending: 30 },
        { category: 'Trial', solved: 80, pending: 15 },
        { category: 'Appeal', solved: 45, pending: 10 },
        { category: 'White Collar', solved: 15, pending: 5 },
      ]
    }
  },
   'gupta-family-law': {
    id: 'gupta-family-law',
    name: 'Gupta Family Law',
    specialization: 'Family Law',
    history: 'Founded in 2012 by Sunita Gupta, the firm focuses on handling sensitive family matters with empathy and professionalism. They are pioneers in using mediation for amicable settlements.',
    staff: [
      { id: 1, name: 'Sunita Gupta', role: 'Founding Partner', experience: '12 Years', imageHint: 'mature female lawyer', performance: 'Top Performer', contact: 'sunita.g@gupta-family-law.demo', status: 'active' },
      { id: 2, name: 'Amit Tandon', role: 'Associate', experience: '5 Years', imageHint: 'young male professional', performance: 'Rising Star', contact: 'amit.t@gupta-family-law.demo', status: 'active' },
      { id: 3, name: 'Pooja Biswas', role: 'Mediator & Counselor', experience: '8 Years', imageHint: 'female counselor', performance: 'High Performer', contact: 'pooja.b@gupta-family-law.demo', status: 'active' },
    ],
     analytics: {
      chartData: [
        { category: 'Divorce', solved: 150, pending: 20 },
        { category: 'Custody', solved: 90, pending: 12 },
        { category: 'Adoption', solved: 30, pending: 5 },
        { category: 'Mediation', solved: 200, pending: 18 },
      ]
    }
  }
};

type StaffMember = typeof demoFirmData['agrawal-associates']['staff'][0];
type DemoFirm = typeof demoFirmData['agrawal-associates'];

function StaffEditDialog({ staffMember, onSave, onCancel }: { staffMember: StaffMember, onSave: (updatedStaff: StaffMember) => void, onCancel: () => void }) {
  const [editedStaff, setEditedStaff] = useState(staffMember);

  const handleSave = () => {
    onSave(editedStaff);
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={editedStaff.name} onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={editedStaff.role} onChange={(e) => setEditedStaff({ ...editedStaff, role: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="performance">Performance</Label>
            <Select value={editedStaff.performance} onValueChange={(value) => setEditedStaff({ ...editedStaff, performance: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Top Performer">Top Performer</SelectItem>
                <SelectItem value="High Performer">High Performer</SelectItem>
                <SelectItem value="Consistent">Consistent</SelectItem>
                <SelectItem value="Rising Star">Rising Star</SelectItem>
                <SelectItem value="Reliable">Reliable</SelectItem>
                <SelectItem value="Needs Improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddStaffDialog({ onSave, onCancel, defaultRole = 'Associate' }: { onSave: (newStaff: StaffMember) => void, onCancel: () => void, defaultRole?: string }) {
    const [newStaff, setNewStaff] = useState<Omit<StaffMember, 'id' | 'status'>>({
        name: '',
        role: defaultRole,
        experience: '1 Year',
        imageHint: 'professional portrait',
        performance: 'New Hire',
        contact: ''
    });

    const handleSave = () => {
        if (newStaff.name && newStaff.contact) {
            onSave({ ...newStaff, id: Date.now(), status: 'active' });
        }
    };

    return (
        <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-name">Name</Label>
                        <Input id="new-name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} placeholder="e.g., John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-role">Role</Label>
                         <Select value={newStaff.role} onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Managing Partner">Managing Partner</SelectItem>
                                <SelectItem value="Senior Partner">Senior Partner</SelectItem>
                                <SelectItem value="Associate">Associate</SelectItem>
                                <SelectItem value="Junior Counsel">Junior Counsel</SelectItem>
                                <SelectItem value="Paralegal">Paralegal</SelectItem>
                                <SelectItem value="Investigator">Investigator</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-contact">Contact Email</Label>
                        <Input id="new-contact" type="email" value={newStaff.contact} onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })} placeholder="e.g., john.d@firm.demo" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Add Staff</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ManageStaffDialog({ staff, setStaff, onCancel }: { staff: StaffMember[], setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>, onCancel: () => void }) {
    const { toast } = useToast();
    const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
    const [addingStaff, setAddingStaff] = useState(false);

    const handleRemove = (staffId: number) => {
        setStaff(staff.filter(s => s.id !== staffId));
        toast({ title: "Staff Removed", description: "The staff member has been removed from the firm." });
    };

    const handleSuspend = (staffId: number) => {
        setStaff(staff.map(s => s.id === staffId ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : s));
        const newStatus = staff.find(s => s.id === staffId)?.status === 'active' ? 'Suspended' : 'Reactivated';
        toast({ title: `Staff ${newStatus}`, description: `The staff member has been ${newStatus.toLowerCase()}.` });
    };

    const handleSaveEdit = (updatedStaff: StaffMember) => {
        setStaff(staff.map(s => s.id === updatedStaff.id ? updatedStaff : s));
        setEditingStaff(null);
        toast({ title: "Staff Updated", description: `${updatedStaff.name}'s details have been updated.` });
    };
    
    const handleSaveNew = (newStaff: StaffMember) => {
        setStaff([...staff, newStaff]);
        setAddingStaff(false);
        toast({ title: "Staff Added", description: `${newStaff.name} has been added to the firm.` });
    };

    return (
        <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage Staff</DialogTitle>
                    <DialogDescription>Add, remove, or update staff members.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {staff.map(member => (
                        <div key={member.id} className={cn("flex items-center gap-4 p-2 rounded-md hover:bg-muted/50", member.status === 'suspended' && 'opacity-50')}>
                            <Avatar>
                                <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={member.imageHint} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{member.name} {member.status === 'suspended' && <Badge variant="destructive">Suspended</Badge>}</p>
                                <p className="text-sm text-muted-foreground">{member.role} ({member.experience})</p>
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => setEditingStaff(member)}><Edit className="h-4 w-4" /></Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <UserX className={cn("h-4 w-4", member.status === 'suspended' ? 'text-green-500' : 'text-amber-600')} />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will {member.status === 'active' ? 'suspend' : 'reactivate'} {member.name}. They will {member.status === 'active' ? 'temporarily lose access' : 'regain access'}.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleSuspend(member.id)}>Confirm</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                                     <AlertDialogContent>
                                        <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently remove {member.name} from the firm.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleRemove(member.id)}>Yes, remove</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={() => setAddingStaff(true)}> <UserPlus className="mr-2"/> Add New Staff</Button>
                </DialogFooter>
            </DialogContent>
            {editingStaff && <StaffEditDialog staffMember={editingStaff} onSave={handleSaveEdit} onCancel={() => setEditingStaff(null)} />}
            {addingStaff && <AddStaffDialog onSave={handleSaveNew} onCancel={() => setAddingStaff(null)} />}
        </Dialog>
    );
}


export default function DemoFirmDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const firmId = params.firmId as string;
  const firmData: DemoFirm | undefined = (demoFirmData as any)[firmId];
  
  const [staff, setStaff] = useState(firmData?.staff || []);
  const [isManagingStaff, setIsManagingStaff] = useState(false);
  const [isHiring, setIsHiring] = useState(false);
  const [hireRole, setHireRole] = useState('Associate');


  if (!firmData) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold">Demo Law Firm Not Found</h2>
      </div>
    );
  }
  
  const handleContactClick = (email: string) => {
    toast({
        title: "Contact Details",
        description: `Email: ${email}`,
    })
  }

  const handleHireClick = (role: string) => {
    setHireRole(role);
    setIsHiring(true);
  }

  const handleSaveNewHire = (newStaff: StaffMember) => {
    setStaff([...staff, newStaff]);
    setIsHiring(false);
    toast({ title: "Staff Added", description: `${newStaff.name} has been added to the firm.` });
  };


  return (
    <div className="container py-12 md:py-16">
      <Button onClick={() => router.back()} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2" /> Back to Demo Firms
      </Button>

      <div className="space-y-8">
        {/* Header Card */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <Building className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">{firmData.name}</CardTitle>
              <CardDescription className="text-lg">
                <Badge>{firmData.specialization}</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{firmData.history}</p>
          </CardContent>
           <CardFooter className="gap-4">
              <Button onClick={() => handleHireClick('Associate')}><UserPlus className="mr-2"/> Hire Advocate</Button>
              <Button onClick={() => handleHireClick('Paralegal')} variant="secondary"><UserPlus className="mr-2"/> Hire Law Graduate</Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staff Management Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users /> Team Management</CardTitle>
              <CardDescription>Current staff and their roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {staff.map((member, index) => (
                <div key={index} className={cn("flex items-center gap-4 p-2 rounded-md hover:bg-muted/50", member.status === 'suspended' && 'opacity-50 grayscale')}>
                   <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={member.imageHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{member.name} {member.status === 'suspended' && <Badge variant="destructive" className="text-xs">Suspended</Badge>}</p>
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
                <Button className="w-full" variant="outline" onClick={() => setIsManagingStaff(true)}>Manage Staff</Button>
            </CardFooter>
          </Card>

          {/* Analytics Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart2 /> Firm Analytics</CardTitle>
              <CardDescription>Cases Solved vs. Pending by Category (Last 12 Months)</CardDescription>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={300}>
                <BarChart data={firmData.analytics.chartData}>
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
      {isManagingStaff && <ManageStaffDialog staff={staff} setStaff={setStaff} onCancel={() => setIsManagingStaff(false)} />}
      {isHiring && <AddStaffDialog onSave={handleSaveNewHire} onCancel={() => setIsHiring(false)} defaultRole={hireRole} />}
    </div>
  );
}

    