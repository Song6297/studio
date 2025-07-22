
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookCheck } from 'lucide-react';

const demoCases = [
  {
    id: 'consumer-dispute-001',
    title: 'Defective Product Complaint',
    category: 'Consumer Law',
    description: 'A consumer filed a complaint against a manufacturer for a defective mobile phone that stopped working within the warranty period.',
  },
  {
    id: 'property-issue-002',
    title: 'Rental Agreement Violation',
    category: 'Property Law',
    description: 'A tenant initiated a case against a landlord for unlawfully withholding the security deposit after the lease ended.',
  },
  {
    id: 'rti-appeal-003',
    title: 'RTI First Appeal',
    category: 'Public Law',
    description: 'An applicant filed a first appeal after receiving an incomplete response to an RTI query regarding public works expenditure.',
  }
];

export default function DemoCasesPage() {
  const router = useRouter();

  const handleCardClick = (caseId: string) => {
    router.push(`/case-status/demo/${caseId}`);
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <BookCheck className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Demo Cases</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore these example cases to understand the legal process.</p>
      </div>

      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoCases.map((caseItem) => (
          <Card key={caseItem.id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCardClick(caseItem.id)}>
            <CardHeader>
              <CardTitle className="font-headline">{caseItem.title}</CardTitle>
              <CardDescription className="text-primary font-semibold">{caseItem.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{caseItem.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end pt-4">
              <Button variant="link">
                View Details <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="text-center mt-12">
        <Button onClick={() => router.back()} variant="outline">
          Back to Case List
        </Button>
      </div>
    </div>
  );
}
