
'use client';
import { FirGeneratorClient } from './fir-generator-client';
import { FileSignature } from 'lucide-react';

export default function FirGeneratorPage() {
  return (
    <div className="bg-background flex-1">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-block rounded-full bg-background p-4 shadow-md border border-primary/10">
              <FileSignature className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Cyber Complaint (FIR) Generator
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Generate a ready-to-use complaint draft for filing with the police or cyber crime cell.
          </p>
           <p className="text-sm text-muted-foreground">
            This tool helps structure your complaint but is not a substitute for legal advice.
          </p>
        </div>
        
        <div className="mt-12 mx-auto w-full max-w-3xl">
           <FirGeneratorClient />
        </div>
      </div>
    </div>
  );
}
