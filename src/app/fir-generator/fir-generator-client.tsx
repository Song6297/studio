
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenerateFirDraftInputSchema, type GenerateFirDraftInput } from '@/ai/flows/generate-fir-draft';
import { getFirDraft } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, AlertTriangle, FileText, Download, Copy, PencilRuler } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export function FirGeneratorClient() {
  const { toast } = useToast();
  const [firDraft, setFirDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<GenerateFirDraftInput>({
    resolver: zodResolver(GenerateFirDraftInputSchema),
    defaultValues: { 
        complainantName: '',
        complainantAddress: '',
        complainantContact: '',
        crimeType: 'other',
        incidentDate: '',
        accusedDetails: '',
        incidentDescription: '',
        financialLoss: '',
        transactionDetails: '',
        evidenceDetails: '',
    },
  });

  async function onSubmit(values: GenerateFirDraftInput) {
    setIsLoading(true);
    setError('');
    setFirDraft('');
    const result = await getFirDraft(values);
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setFirDraft(result.data);
    }
    setIsLoading(false);
  }

  const handleCopy = () => {
    if (!firDraft) return;
    navigator.clipboard.writeText(firDraft);
    toast({
        title: 'Draft Copied!',
        description: 'The FIR draft has been copied to your clipboard.'
    });
  }

  const handleDownload = () => {
    if (!firDraft) return;
    const blob = new Blob([firDraft], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fir-draft.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const selectedCrimeType = form.watch('crimeType');

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        {!firDraft ? (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField control={form.control} name="complainantName" render={({ field }) => (
                        <FormItem><FormLabel>Your Full Name</FormLabel><FormControl><Input placeholder="e.g., Ramesh Kumar" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="complainantContact" render={({ field }) => (
                        <FormItem><FormLabel>Your Contact Number</FormLabel><FormControl><Input placeholder="e.g., +91 9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="complainantAddress" render={({ field }) => (
                    <FormItem><FormLabel>Your Full Address</FormLabel><FormControl><Input placeholder="e.g., 123, Main Street, Bengaluru" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField control={form.control} name="crimeType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type of Cyber Crime</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a crime type" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="upi_fraud">UPI/Financial Fraud</SelectItem>
                                <SelectItem value="social_media_harassment">Social Media Harassment</SelectItem>
                                <SelectItem value="online_shopping_fraud">Online Shopping Fraud</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="incidentDate" render={({ field }) => (
                        <FormItem><FormLabel>Date & Time of Incident</FormLabel><FormControl><Input placeholder="e.g., 2024-08-15 14:30" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                
                 {selectedCrimeType === 'upi_fraud' || selectedCrimeType === 'online_shopping_fraud' ? (
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField control={form.control} name="financialLoss" render={({ field }) => (
                            <FormItem><FormLabel>Financial Loss Amount</FormLabel><FormControl><Input placeholder="e.g., ₹50,000" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="transactionDetails" render={({ field }) => (
                            <FormItem><FormLabel>Transaction ID(s)</FormLabel><FormControl><Input placeholder="UPI Transaction ID, Order No., etc." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                 ) : null}

                <FormField control={form.control} name="accusedDetails" render={({ field }) => (
                    <FormItem><FormLabel>Details of Accused</FormLabel><FormControl><Input placeholder="Phone number, username, website, or 'Unknown'" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={form.control} name="incidentDescription" render={({ field }) => (
                    <FormItem><FormLabel>Detailed Description of Incident</FormLabel><FormControl><Textarea rows={6} placeholder="Explain step-by-step what happened..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={form.control} name="evidenceDetails" render={({ field }) => (
                    <FormItem><FormLabel>Available Evidence</FormLabel><FormControl><Input placeholder="Screenshots, Call Recordings, URLs, etc." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                
                <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold text-lg bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Draft...
                    </>
                ) : (
                    <>
                    <PencilRuler className="mr-2 h-5 w-5" />
                    Generate FIR Draft
                    </>
                )}
                </Button>
            </form>
            </Form>
        ) : (
             <Card className="bg-background border-primary/20">
               <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="font-headline text-xl font-bold text-primary">Your Generated FIR Draft</h3>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-mono text-card-foreground/90 bg-muted/50 p-4 rounded-md border">
                  {firDraft}
                </div>
                 <p className="text-xs text-muted-foreground mt-4">
                  Disclaimer: This is an AI-generated draft. Review carefully and edit if necessary before submitting to the police. This is not a substitute for legal advice.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                 <Button variant="link" onClick={() => setFirDraft('')}>Create a new draft</Button>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Draft
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download as .txt
                    </Button>
                </div>
              </CardFooter>
            </Card>
        )}
        
        <div className="mt-8 min-h-[100px]">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center rounded-lg bg-background/50 p-6 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-lg font-medium text-muted-foreground">The AI is drafting your complaint...</p>
              <p className="text-sm text-muted-foreground/80">This may take a moment.</p>
            </div>
          )}
          {error && (
            <Card className="bg-destructive/10 border-destructive/50">
              <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <h3 className="text-lg font-semibold text-destructive">Error Generating Draft</h3>
              </CardHeader>
              <CardContent>
                <p>{error}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
