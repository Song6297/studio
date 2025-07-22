
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getBreachAdvice } from './actions';
import type { GenerateBreachAdviceOutput } from '@/ai/flows/generate-breach-advice';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, AlertTriangle, ListChecks, FileText, ShieldCheck, DraftingCompass } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  incidentDescription: z.string().min(20, { message: "Description must be at least 20 characters." }),
  isBusiness: z.enum(['business', 'individual'], { required_error: 'You must select an option.' }),
  isPersonalDataInvolved: z.boolean().default(false).optional(),
  dataTypes: z.string().min(3, { message: "Please specify the types of data." }),
});

type FormValues = z.infer<typeof formSchema>;

export function DataBreachAdvisorClient() {
  const [advice, setAdvice] = useState<GenerateBreachAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      incidentDescription: '',
      dataTypes: '',
      isPersonalDataInvolved: false,
     },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError('');
    setAdvice(null);
    const result = await getBreachAdvice({
      ...values,
      isBusiness: values.isBusiness === 'business'
    });
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setAdvice(result.data);
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full">
      <Card className="w-full border-primary/20 bg-background/80">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Describe the Incident</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="incidentDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I noticed unauthorized logins to my company's user database..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isBusiness"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Are you a business/organization or an individual?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="business" /></FormControl>
                          <FormLabel className="font-normal">Business / Organization</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="individual" /></FormControl>
                          <FormLabel className="font-normal">Individual</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPersonalDataInvolved"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Did the incident involve personal data of Indian citizens?</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What types of data were involved?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Names, emails, financial data, phone numbers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold text-lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Action Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get AI Action Plan
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center rounded-lg bg-card p-6 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">Generating your personalized action plan...</p>
            <p className="text-sm text-muted-foreground/80">The AI is analyzing the incident based on Indian law.</p>
          </div>
        )}
        {error && (
          <Card className="bg-destructive/10 border-destructive/50">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <h3 className="text-lg font-semibold text-destructive">Error Generating Plan</h3>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}
        {advice && (
           <Card className="bg-card">
             <CardHeader>
                <CardTitle className="font-headline text-3xl">Your Incident Action Plan</CardTitle>
             </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><ShieldCheck/> Legal Duties</AccordionTrigger>
                        <AccordionContent className="text-base whitespace-pre-wrap">{advice.legalDuties}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><DraftingCompass/> Notification Draft</AccordionTrigger>
                        <AccordionContent className="text-base whitespace-pre-wrap bg-muted/50 p-4 rounded-md font-mono text-xs">{advice.notificationDraft}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><ListChecks/> Mitigation Checklist</AccordionTrigger>
                        <AccordionContent className="text-base">
                            <ul className="list-disc list-inside space-y-2">
                                {advice.mitigationChecklist.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><FileText/> Evidence Preservation</AccordionTrigger>
                        <AccordionContent className="text-base whitespace-pre-wrap">{advice.evidencePreservation}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">
                    Disclaimer: This is AI-generated advice. Always consult with a qualified legal and cybersecurity professional.
                </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
