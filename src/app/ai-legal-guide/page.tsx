
import { AiLegalGuideClient } from './ai-legal-guide-client';
import { Bot } from 'lucide-react';

export default function AiLegalGuidePage() {
  return (
    <div className="bg-secondary/50 flex-1">
      <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)] py-12 md:py-24">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="inline-block rounded-lg bg-background p-3 shadow-sm border">
              <Bot className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center lg:text-left">
            AI Legal Advice
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed text-center lg:text-left">
            Get instant, preliminary legal information based on the Indian legal system. Our AI is here to help you understand complex legal topics, but please remember this is not a substitute for advice from a qualified lawyer.
          </p>
           <p className="text-sm text-muted-foreground text-center lg:text-left">
            Powered by advanced AI models for informational purposes.
          </p>
        </div>
        <div className="w-full rounded-lg bg-background p-8 shadow-lg border">
          <AiLegalGuideClient />
        </div>
      </div>
    </div>
  );
}
