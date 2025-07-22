
'use client';
import { DataBreachAdvisorClient } from './data-breach-advisor-client';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function DataBreachAdvisorPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-background flex-1">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-block rounded-full bg-background p-4 shadow-md border border-primary/10">
              <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            AI Data Breach Advisor
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Experienced a security incident? Get an instant, AI-generated action plan based on Indian cyber law to guide your next steps.
          </p>
           <p className="text-sm text-muted-foreground">
            This is not a substitute for advice from a qualified lawyer or cybersecurity professional.
          </p>
        </div>
        
        <div className="mt-12 mx-auto w-full max-w-3xl">
           <DataBreachAdvisorClient />
        </div>
      </div>
    </div>
  );
}
