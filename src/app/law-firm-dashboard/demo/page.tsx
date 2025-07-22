
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const demoFirms = [
  {
    id: 'agrawal-associates',
    name: 'Agrawal & Associates',
    specialization: 'Corporate Law',
    description: 'A leading firm specializing in corporate governance, mergers & acquisitions, and commercial litigation.',
    year: 1998,
  },
  {
    id: 'singh-legal',
    name: 'Singh Legal',
    specialization: 'Criminal Defense',
    description: 'Dedicated criminal defense attorneys providing expert representation in all criminal matters.',
     year: 2005,
  },
  {
    id: 'gupta-family-law',
    name: 'Gupta Family Law',
    specialization: 'Family Law',
    description: 'Compassionate and experienced lawyers handling divorce, child custody, and other family-related legal issues.',
     year: 2012,
  }
];

export default function DemoLawFirmsPage() {
  const router = useRouter();

  const handleCardClick = (firmId: string) => {
    router.push(`/law-firm-dashboard/demo/${firmId}`);
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <Building className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Demo Law Firms</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore these example firm dashboards to see their structure and analytics.</p>
      </div>

      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoFirms.map((firm) => (
          <Card key={firm.id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCardClick(firm.id)}>
            <CardHeader>
              <Scale className="h-8 w-8 text-primary/50" />
              <CardTitle className="font-headline pt-2">{firm.name}</CardTitle>
              <CardDescription>
                <Badge variant="secondary">{firm.specialization}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{firm.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-4">
                <p className="text-xs text-muted-foreground">Established: {firm.year}</p>
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
