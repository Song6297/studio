
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PenSquare } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AffidavitPage() {
  const { toast } = useToast();

  const formSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    affidavitType: z.string({ required_error: "Please select an affidavit type" }),
    statement: z.string().min(20, "Please provide a statement of at least 20 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      statement: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Affidavit Request Submitted!",
      description: "We have received your request and will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container py-12 md:py-24">
      <Card className="mx-auto max-w-3xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center p-8">
          <PenSquare className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="mt-4 font-headline text-3xl md:text-4xl">Affidavit Services</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Fill out the form below to request an affidavit. Our team will guide you through the process.
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
              <FormField control={form.control} name="affidavitType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Affidavit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select an affidavit type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="change-of-name">Change of Name</SelectItem>
                      <SelectItem value="proof-of-income">Proof of Income</SelectItem>
                      <SelectItem value="address-proof">Address Proof</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="statement" render={({ field }) => (
                <FormItem>
                  <FormLabel>Statement/Declaration</FormLabel>
                  <FormControl><Textarea rows={6} placeholder="Provide the details for the affidavit..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" size="lg">Request Affidavit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
