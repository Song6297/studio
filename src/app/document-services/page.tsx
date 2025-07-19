
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
import { PenSquare, Stamp } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function DocumentServicesPage() {
  const { toast } = useToast();

  const affidavitSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    affidavitType: z.string({ required_error: "Please select an affidavit type" }),
    statement: z.string().min(20, "Please provide a statement of at least 20 characters"),
  });

  const notarySchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    documentType: z.string().min(3, "Please specify the document type"),
    description: z.string().min(10, "Please provide a brief description"),
    document: z.any().optional(),
  });

  const affidavitForm = useForm<z.infer<typeof affidavitSchema>>({
    resolver: zodResolver(affidavitSchema),
    defaultValues: { fullName: '', email: '', statement: '' },
  });

  const notaryForm = useForm<z.infer<typeof notarySchema>>({
    resolver: zodResolver(notarySchema),
    defaultValues: { fullName: '', email: '', documentType: '', description: '' },
  });

  function onAffidavitSubmit(values: z.infer<typeof affidavitSchema>) {
    console.log("Affidavit Submission:", values);
    toast({
      title: "Affidavit Request Submitted!",
      description: "We have received your request and will get back to you shortly.",
    });
    affidavitForm.reset();
  }

  function onNotarySubmit(values: z.infer<typeof notarySchema>) {
    console.log("Notary Submission:", values);
    toast({
      title: "Notary Request Submitted!",
      description: "We have received your request and will get back to you shortly.",
    });
    notaryForm.reset();
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Affidavit Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center p-8">
            <PenSquare className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="mt-4 font-headline text-3xl">Affidavit Services</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Request an affidavit by filling out the form.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <Form {...affidavitForm}>
              <form onSubmit={affidavitForm.handleSubmit(onAffidavitSubmit)} className="space-y-6">
                <FormField control={affidavitForm.control} name="fullName" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={affidavitForm.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={affidavitForm.control} name="affidavitType" render={({ field }) => (
                  <FormItem><FormLabel>Type of Affidavit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select an affidavit type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="change-of-name">Change of Name</SelectItem>
                        <SelectItem value="proof-of-income">Proof of Income</SelectItem>
                        <SelectItem value="address-proof">Address Proof</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={affidavitForm.control} name="statement" render={({ field }) => (
                  <FormItem><FormLabel>Statement/Declaration</FormLabel><FormControl><Textarea rows={6} placeholder="Provide details..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" size="lg">Request Affidavit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Notary Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center p-8">
            <Stamp className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="mt-4 font-headline text-3xl">Notary Services</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Request notarization for your documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <Form {...notaryForm}>
              <form onSubmit={notaryForm.handleSubmit(onNotarySubmit)} className="space-y-6">
                <FormField control={notaryForm.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={notaryForm.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={notaryForm.control} name="documentType" render={({ field }) => (
                  <FormItem><FormLabel>Type of Document</FormLabel><FormControl><Input placeholder="e.g., Power of Attorney" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={notaryForm.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Brief Description</FormLabel><FormControl><Textarea rows={4} placeholder="Describe the document..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={notaryForm.control} name="document" render={({ field }) => (
                  <FormItem><FormLabel>Upload Document</FormLabel><FormControl><Input type="file" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" size="lg">Request Notarization</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
