
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Users, Briefcase, BarChart2, Star, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const demoFirmData = {
  'agrawal-associates': {
    id: 'agrawal-associates',
    name: 'Agrawal & Associates',
    specialization: 'Corporate Law',
    history: 'Founded in 1998 by Rajan Agrawal, the firm has grown to become a leader in corporate law, advising numerous Fortune 500 companies in India. They are known for their meticulous approach to mergers and acquisitions.',
    staff: [
      { name: 'Rajan Agrawal', role: 'Managing Partner', experience: '25 Years', imageHint: 'senior male lawyer', performance: 'Top Performer', contact: 'rajan.a@agrawal-associates.demo' },
      { name: 'Priya Sharma', role: 'Senior Partner', experience: '18 Years', imageHint: 'senior female lawyer', performance: 'High Performer', contact: 'priya.s@agrawal-associates.demo' },
      { name: 'Mohit Verma', role: 'Associate', experience: '5 Years', imageHint: 'junior male lawyer', performance: 'Rising Star', contact: 'mohit.v@agrawal-associates.demo' },
      { name: 'Anjali Desai', role: 'Associate', experience: '4 Years', imageHint: 'junior female lawyer', performance: 'Consistent', contact: 'anjali.d@agrawal-associates.demo' },
      { name: 'Suresh Menon', role: 'Paralegal', experience: '12 Years', imageHint: 'male professional', performance: 'Reliable', contact: 'suresh.m@agrawal-associates.demo' },
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
      { name: 'Harshdeep Singh', role: 'Founder & Lead Counsel', experience: '20 Years', imageHint: 'male lawyer serious', performance: 'Top Performer', contact: 'harshdeep.s@singh-legal.demo' },
      { name: 'Kavita Mathur', role: 'Junior Counsel', experience: '6 Years', imageHint: 'female lawyer portrait', performance: 'High Performer', contact: 'kavita.m@singh-legal.demo' },
      { name: 'Ravi Jadeja', role: 'Investigator', experience: '10 Years', imageHint: 'male detective', performance: 'Reliable', contact: 'ravi.j@singh-legal.demo' },
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
      { name: 'Sunita Gupta', role: 'Founding Partner', experience: '12 Years', imageHint: 'mature female lawyer', performance: 'Top Performer', contact: 'sunita.g@gupta-family-law.demo' },
      { name: 'Amit Tandon', role: 'Associate', experience: '5 Years', imageHint: 'young male professional', performance: 'Rising Star', contact: 'amit.t@gupta-family-law.demo' },
      { name: 'Pooja Biswas', role: 'Mediator & Counselor', experience: '8 Years', imageHint: 'female counselor', performance: 'High Performer', contact: 'pooja.b@gupta-family-law.demo' },
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

type DemoFirm = typeof demoFirmData['agrawal-associates'];

export default function DemoFirmDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const firmId = params.firmId as string;
  const firmData: DemoFirm | undefined = (demoFirmData as any)[firmId];

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
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staff Management Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users /> Team Management</CardTitle>
              <CardDescription>Current staff and their roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {firmData.staff.map((member, index) => (
                <div key={index} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50">
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
                <Button className="w-full" variant="outline">Manage Staff</Button>
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
    </div>
  );
}
