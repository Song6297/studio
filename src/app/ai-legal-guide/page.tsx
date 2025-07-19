import { AiLegalGuideClient } from './ai-legal-guide-client';
import { Bot } from 'lucide-react';

export default function AiLegalGuidePage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl text-center">
        <Bot className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
          AI Legal Guide
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get general legal advice based on the Indian legal system. This is not a substitute for advice from a qualified lawyer.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <AiLegalGuideClient />
      </div>
    </div>
  );
}
