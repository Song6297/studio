
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Trash, Download } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const rentAgreementSchema = z.object({
  landlordName: z.string().min(2, "Landlord name is required"),
  tenantName: z.string().min(2, "Tenant name is required"),
  propertyAddress: z.string().min(10, "Full property address is required"),
  rentAmount: z.coerce.number().positive("Rent must be a positive number"),
  securityDeposit: z.coerce.number().positive("Security deposit must be a positive number"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  clauses: z.array(z.object({
    value: z.string().min(1, "Clause cannot be empty"),
  })).optional(),
});

function RentAgreementGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const form = useForm<z.infer<typeof rentAgreementSchema>>({
    resolver: zodResolver(rentAgreementSchema),
    defaultValues: {
      landlordName: '',
      tenantName: '',
      propertyAddress: '',
      clauses: [{ value: 'The tenant shall not make any structural alterations to the property.' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "clauses",
  });

  function onSubmit(values: z.infer<typeof rentAgreementSchema>) {
    const text = `
RENT AGREEMENT

This Rent Agreement is made and entered into on this day, by and between:

LANDLORD:
${values.landlordName}

AND

TENANT:
${values.tenantName}

PROPERTY DETAILS:
The Landlord agrees to rent to the Tenant the property located at:
${values.propertyAddress}

TERM:
The term of this lease shall be from ${values.startDate} to ${values.endDate}.

RENT & DEPOSIT:
- Monthly Rent: INR ${values.rentAmount}
- Security Deposit: INR ${values.securityDeposit}

CLAUSES:
${values.clauses?.map((clause, index) => `${index + 1}. ${clause.value}`).join('\n')}

This agreement is governed by the laws of India.

_________________________
(Landlord's Signature)

_________________________
(Tenant's Signature)
`;
    setGeneratedText(text.trim());
  }
  
  const handleDownload = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rent-agreement.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Rent Agreement Details</CardTitle>
          <CardDescription>Fill in the details to generate a draft rent agreement.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="landlordName" render={({ field }) => (
                  <FormItem><FormLabel>Landlord Name</FormLabel><FormControl><Input placeholder="Landlord's Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="tenantName" render={({ field }) => (
                  <FormItem><FormLabel>Tenant Name</FormLabel><FormControl><Input placeholder="Tenant's Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="propertyAddress" render={({ field }) => (
                <FormItem><FormLabel>Property Address</FormLabel><FormControl><Textarea placeholder="Full address of the rental property" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid sm:grid-cols-2 gap-4">
                 <FormField control={form.control} name="rentAmount" render={({ field }) => (
                  <FormItem><FormLabel>Monthly Rent (INR)</FormLabel><FormControl><Input type="number" placeholder="e.g., 15000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="securityDeposit" render={({ field }) => (
                  <FormItem><FormLabel>Security Deposit (INR)</FormLabel><FormControl><Input type="number" placeholder="e.g., 30000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
               <div className="grid sm:grid-cols-2 gap-4">
                 <FormField control={form.control} name="startDate" render={({ field }) => (
                  <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="endDate" render={({ field }) => (
                  <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div>
                <FormLabel>Additional Clauses</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mt-2">
                    <FormField
                      control={form.control}
                      name={`clauses.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: '' })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Clause
                </Button>
              </div>

              <Button type="submit" className="w-full" size="lg">Generate Agreement</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="bg-secondary/30">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Generated Document</CardTitle>
            <CardDescription>Review the draft below. You can copy or download it.</CardDescription>
          </div>
          <Button onClick={handleDownload} disabled={!generatedText} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea
            readOnly
            value={generatedText || "Your generated agreement will appear here..."}
            className="w-full h-[500px] font-mono text-sm bg-background whitespace-pre-wrap"
          />
        </CardContent>
      </Card>
    </div>
  );
}


export default function LegalTemplatesPage() {
    const { t } = useLanguage();

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center">
                <FileText className="h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Legal Form Templates</h1>
                <p className="mt-2 text-lg text-muted-foreground">Generate drafts for common legal documents.</p>
            </div>
            <Tabs defaultValue="rent-agreement" className="mt-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="rent-agreement">Rent Agreement</TabsTrigger>
                    <TabsTrigger value="rti" disabled>RTI Request</TabsTrigger>
                    <TabsTrigger value="police-complaint" disabled>Police Complaint</TabsTrigger>
                    <TabsTrigger value="legal-notice" disabled>Legal Notice</TabsTrigger>
                </TabsList>
                <TabsContent value="rent-agreement" className="mt-6">
                    <RentAgreementGenerator />
                </TabsContent>
            </Tabs>
        </div>
    );
}
