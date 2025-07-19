import { AiLegalGuideClient } from './ai-legal-guide-client';
import { Bot } from 'lucide-react';

export default function AiLegalGuidePage() {
  return (
    <div className="container grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)] py-12">
      <div className="space-y-4">
        <div className="inline-block rounded-lg bg-primary/10 p-3">
            <Bot className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          AI Legal Guide
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
          Get instant, preliminary legal information based on the Indian legal system. Our AI is here to help you understand complex legal topics, but please remember this is not a substitute for advice from a qualified lawyer.
        </p>
         <p className="text-sm text-muted-foreground">
          Powered by advanced AI models for informational purposes.
        </p>
      </div>
      <div className="w-full">
        <AiLegalGuideClient />
      </div>
    </div>
  );
}
