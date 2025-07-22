
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const demoAdvocates = [
  {
    id: 'alok-sharma',
    name: 'Adv. Alok Sharma',
    specialization: 'Criminal Law',
    description: 'A seasoned litigator with over 15 years of experience in criminal defense, known for a strategic approach.',
    experience: 15,
    imageHint: 'male lawyer portrait serious'
  },
  {
    id: 'sunita-gupta',
    name: 'Adv. Sunita Gupta',
    specialization: 'Family Law',
    description: 'Specializing in divorce, child custody, and mediation, providing compassionate and effective legal counsel.',
    experience: 12,
    imageHint: 'female lawyer portrait warm'
  },
  {
    id: 'vikram-singh',
    name: 'Adv. Vikram Singh',
    specialization: 'Cyber Law & IP',
    description: 'A specialist in the digital domain, focusing on data privacy, cybercrime defense, and intellectual property protection.',
    experience: 8,
    imageHint: 'man tech professional'
  }
];

export default function DemoAdvocatesPage() {
  const router = useRouter();

  const handleCardClick = (advocateId: string) => {
    router.push(`/advocate-dashboard/demo/${advocateId}`);
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <User className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Demo Advocate Dashboards</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore these example advocate dashboards to see their profiles and analytics.</p>
      </div>

      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoAdvocates.map((advocate) => (
          <Card key={advocate.id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCardClick(advocate.id)}>
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={advocate.imageHint} />
                  <AvatarFallback>{advocate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-center">{advocate.name}</CardTitle>
              <CardDescription>
                <Badge variant="secondary">{advocate.specialization}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{advocate.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-4">
                <p className="text-xs text-muted-foreground">Experience: {advocate.experience} years</p>
              <Button variant="link" size="sm" className="p-0">
                View Dashboard <ArrowRight className="ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="text-center mt-12">
        <Button onClick={() => router.back()} variant="outline">
          Back
        </Button>
      </div>
    </div>
  );
}
