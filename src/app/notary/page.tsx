
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Stamp } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function NotaryPage() {
  const { toast } = useToast();

  const formSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    documentType: z.string().min(3, "Please specify the document type"),
    description: z.string().min(10, "Please provide a brief description"),
    document: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      documentType: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Notary Request Submitted!",
      description: "We have received your request and will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container py-12 md:py-24">
      <Card className="mx-auto max-w-3xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center p-8">
          <Stamp className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="mt-4 font-headline text-3xl md:text-4xl">Notary Services</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Upload your document and fill out the form to request notarization.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

               <FormField control={form.control} name="documentType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Document</FormLabel>
                    <FormControl><Input placeholder="e.g., Power of Attorney, Sale Deed" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl><Textarea rows={4} placeholder="Briefly describe the purpose of the document..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="document" render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Document for Notarization</FormLabel>
                  <FormControl><Input type="file" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" size="lg">Request Notarization</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
