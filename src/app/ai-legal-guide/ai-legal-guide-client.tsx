'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getLegalAdvice } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(10, { message: 'Please enter a query of at least 10 characters.' }),
});

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

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Your legal query</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., What are the rules for renting a property in Mumbai?"
                      rows={5}
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Advice
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="mt-6 flex items-center justify-center rounded-lg bg-secondary/50 p-6">
            <Loader2 className="mr-3 h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">Generating advice...</p>
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-md border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
        {advice && (
          <div className="mt-6">
            <h3 className="font-headline text-xl font-bold">Generated Advice:</h3>
            <div className="mt-4 rounded-md border bg-secondary/50 p-4 whitespace-pre-wrap font-body text-card-foreground">
              {advice}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
