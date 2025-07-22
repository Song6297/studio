
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const demoNgos = [
  {
    id: 'justice-foundation',
    name: 'Justice for All Foundation',
    focus: 'Access to Justice',
    description: 'Provides free legal aid to underprivileged communities, focusing on consumer rights and family law.',
    year: 2010,
  },
  {
    id: 'cyber-guardians',
    name: 'Cyber Guardians Initiative',
    focus: 'Cyber Law Awareness',
    description: 'Dedicated to educating citizens about their digital rights and helping victims of online fraud.',
    year: 2018,
  },
  {
    id: 'rti-watchdogs',
    name: 'RTI Watchdogs',
    focus: 'Government Transparency',
    description: 'Assists citizens in filing RTI applications and advocates for government transparency and accountability.',
    year: 2015,
  }
];

export default function DemoNgosPage() {
  const router = useRouter();

  const handleCardClick = (ngoId: string) => {
    router.push(`/ngo-dashboard/demo/${ngoId}`);
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <Users className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Demo NGO Dashboards</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore these example NGO dashboards to see how they operate.</p>
      </div>

      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoNgos.map((ngo) => (
          <Card key={ngo.id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCardClick(ngo.id)}>
            <CardHeader>
              <Building className="h-8 w-8 text-primary/50" />
              <CardTitle className="font-headline pt-2">{ngo.name}</CardTitle>
              <CardDescription>
                <Badge variant="secondary">{ngo.focus}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{ngo.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-4">
                <p className="text-xs text-muted-foreground">Established: {ngo.year}</p>
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
