
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getLegalAdvice } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, AlertTriangle, FileText, Download } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(10, { message: 'Please enter a query of at least 10 characters.' }),
});

// Custom hook for typing effect
function useTypingEffect(text: string, speed = 30) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset on new text
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed]);

  return displayedText;
}


export function AiLegalGuideClient() {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError('');
    setAdvice('');
    const result = await getLegalAdvice(values.query);
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setAdvice(result.data);
    }
    setIsLoading(false);
  }

  const handleDownload = () => {
    if (!advice) return;
    const blob = new Blob([advice], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'legal-advice.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const displayedAdvice = useTypingEffect(advice);


  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Your legal query</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., What are the rules for renting a property in Mumbai?"
                      rows={5}
                      className="bg-background/80 focus:bg-background text-base p-4 rounded-xl shadow-inner backdrop-blur-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold text-lg bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Advice...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get AI Advice
                </>
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-8 min-h-[200px]">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center rounded-lg bg-background/50 p-6 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-lg font-medium text-muted-foreground">The AI is thinking...</p>
              <p className="text-sm text-muted-foreground/80">This may take a few moments.</p>
            </div>
          )}
          {error && (
            <Card className="bg-destructive/10 border-destructive/50">
              <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <h3 className="text-lg font-semibold text-destructive">An Error Occurred</h3>
              </CardHeader>
              <CardContent>
                <p>{error}</p>
              </CardContent>
            </Card>
          )}
          {advice && (
             <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
               <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="font-headline text-xl font-bold text-primary">Preliminary Legal Advice</h3>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-body text-card-foreground/90">
                  <p>{displayedAdvice}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  This is AI-generated advice. Always consult with a qualified legal professional.
                </p>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Advice
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
