
'use client';
import { AiLegalGuideClient } from './ai-legal-guide-client';
import { Bot } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AiLegalGuidePage() {
  const { t } = useLanguage();
  return (
    <div className="bg-background flex-1">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-block rounded-full bg-background p-4 shadow-md border border-primary/10">
              <Bot className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            {t('aiLegalGuide.title')}
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            {t('aiLegalGuide.description')}
          </p>
           <p className="text-sm text-muted-foreground">
            {t('aiLegalGuide.disclaimer')}
          </p>
        </div>
        
        <div className="mt-12 mx-auto w-full max-w-3xl">
           <AiLegalGuideClient />
        </div>
      </div>
    </div>
  );
}
