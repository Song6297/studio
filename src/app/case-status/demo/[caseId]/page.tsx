
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Gavel, Calendar, Timer, IndianRupee, BookOpen } from 'lucide-react';
import { differenceInMonths, format } from 'date-fns';

const demoCaseDetails = {
  'upi-fraud-004': {
    id: 'upi-fraud-004',
    title: 'UPI Payment Fraud Case',
    category: 'Cybercrime / Financial Fraud',
    description: 'A retired teacher from Pune received a fraudulent text message about an overdue electricity bill, leading him to a fake payment website where he lost ₹50,000. The case was filed against the unknown fraudsters and also implicated the bank for failing to prevent the fraudulent transactions.',
    submittedAt: new Date('2024-01-10'),
    resolvedAt: new Date('2024-06-15'),
    judgment: 'The Consumer Disputes Redressal Forum ruled in favor of the victim. The bank was found partially liable for "deficiency in service" due to inadequate fraud detection mechanisms. The bank was ordered to refund the entire amount of ₹50,000 and pay an additional ₹10,000 as compensation for mental distress.',
    lawyerName: 'Adv. Priya Desai',
    investigationExpenses: 2500,
  },
  'consumer-dispute-001': {
    id: 'consumer-dispute-001',
    title: 'Defective Product Complaint',
    category: 'Consumer Law',
    description: 'A consumer filed a complaint against a manufacturer for a defective mobile phone that stopped working within the warranty period. The company initially refused to repair or replace the device, citing "physical damage" not covered by warranty, which the consumer contested.',
    submittedAt: new Date('2023-01-15'),
    resolvedAt: new Date('2023-05-20'),
    judgment: 'The District Consumer Disputes Redressal Commission ruled in favor of the consumer. The manufacturer was ordered to provide a full refund of the purchase price and pay a compensation of ₹5,000 for the mental anguish caused.',
    lawyerName: 'Adv. Meena Iyer',
    investigationExpenses: 7500,
  },
  'property-issue-002': {
    id: 'property-issue-002',
    title: 'Rental Agreement Violation',
    category: 'Property Law',
    description: 'A tenant initiated a case against a landlord for unlawfully withholding the security deposit of ₹50,000 after the lease ended. The landlord claimed deductions for "excessive wear and tear" without providing proper invoices or proof.',
    submittedAt: new Date('2022-11-10'),
    resolvedAt: new Date('2023-04-25'),
    judgment: 'Through mediation, a settlement was reached. The landlord agreed to return ₹40,000 of the security deposit, and the tenant agreed to forgo the remaining ₹10,000 to cover minor painting and cleaning costs. The settlement was recorded by the court.',
    lawyerName: 'Adv. Priya Desai',
    investigationExpenses: 15000,
  },
  'rti-appeal-003': {
    id: 'rti-appeal-003',
    title: 'RTI First Appeal',
    category: 'Public Law',
    description: 'An applicant filed an RTI seeking detailed expenditure reports for a local road construction project. The Public Information Officer (PIO) provided an incomplete and vague response. The applicant filed a first appeal with the First Appellate Authority (FAA).',
    submittedAt: new Date('2023-06-01'),
    resolvedAt: new Date('2023-07-15'),
    judgment: 'The First Appellate Authority directed the PIO to provide the complete and detailed expenditure report, including copies of relevant bills and muster rolls, to the applicant within 15 days, free of cost. The FAA also cautioned the PIO to be more diligent in future responses.',
    lawyerName: 'N/A (Self-Represented)',
    investigationExpenses: 500,
  }
};

type DemoCase = typeof demoCaseDetails['consumer-dispute-001'];

export default function DemoCaseDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const caseId = params.caseId as string;
  const caseData: DemoCase | undefined = (demoCaseDetails as any)[caseId];

  if (!caseData) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold">Demo Case Not Found</h2>
      </div>
    );
  }

  const timeTaken = differenceInMonths(caseData.resolvedAt, caseData.submittedAt);
  const formattedSubmittedAt = format(caseData.submittedAt, 'do MMMM, yyyy');
  const formattedResolvedAt = format(caseData.resolvedAt, 'do MMMM, yyyy');

  return (
    <div className="container py-12 md:py-16">
      <Button onClick={() => router.back()} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2" /> Back to Demo Cases
      </Button>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardDescription>{caseData.category}</CardDescription>
              <CardTitle className="font-headline text-2xl">{caseData.title}</CardTitle>
            </div>
            <Badge variant="outline">Resolved</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center"><BookOpen className="mr-2" />Case Summary</h3>
            <p className="text-muted-foreground">{caseData.description}</p>
          </div>
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center"><Gavel className="mr-2" />Judgment</h3>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              {caseData.judgment}
            </blockquote>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t pt-6">
            <div className="flex items-start gap-3">
              <User className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lawyer Assigned</p>
                <p>{caseData.lawyerName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Timer className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Taken</p>
                <p>{timeTaken} months</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IndianRupee className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Case Expenses</p>
                <p>₹{caseData.investigationExpenses.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t pt-6">
            <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    Submitted: {formattedSubmittedAt}
                </p>
            </div>
            <div className="flex items-center gap-3">
                 <p className="text-sm text-muted-foreground">
                    Resolved: {formattedResolvedAt}
                </p>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
