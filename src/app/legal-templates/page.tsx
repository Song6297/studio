
'use client';

import { useState, useEffect } from 'react';
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
      rentAmount: 0,
      securityDeposit: 0,
      startDate: '',
      endDate: '',
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

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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

const rtiRequestSchema = z.object({
  applicantName: z.string().min(2, "Applicant name is required"),
  applicantAddress: z.string().min(10, "Full address is required"),
  publicAuthority: z.string().min(5, "Public Authority name is required"),
  informationSought: z.string().min(20, "Please provide details of the information sought"),
});

function RtiRequestGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const form = useForm<z.infer<typeof rtiRequestSchema>>({
    resolver: zodResolver(rtiRequestSchema),
    defaultValues: {
      applicantName: '',
      applicantAddress: '',
      publicAuthority: '',
      informationSought: ''
    },
  });

  function onSubmit(values: z.infer<typeof rtiRequestSchema>) {
    const today = new Date().toLocaleDateString('en-IN');
    const text = `
To,
The Public Information Officer (PIO),
${values.publicAuthority}

Subject: Application under the Right to Information Act, 2005

Sir/Madam,

I, ${values.applicantName}, a citizen of India, residing at ${values.applicantAddress}, seek the following information under the Right to Information Act, 2005.

Details of Information Sought:
1. ${values.informationSought}

I hereby declare that I am a citizen of India. I request you to provide the information at the earliest.

Date: ${today}
Place: 

Sincerely,

_________________________
(${values.applicantName})
${values.applicantAddress}
`;
    setGeneratedText(text.trim());
  }

  const handleDownload = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rti-request.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>RTI Request Details</CardTitle>
          <CardDescription>Fill in the details to generate a draft RTI request.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="applicantName" render={({ field }) => (
                <FormItem><FormLabel>Applicant Name</FormLabel><FormControl><Input placeholder="Your Full Name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="applicantAddress" render={({ field }) => (
                <FormItem><FormLabel>Applicant Address</FormLabel><FormControl><Textarea placeholder="Your Full Address" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="publicAuthority" render={({ field }) => (
                <FormItem><FormLabel>Public Authority / Department</FormLabel><FormControl><Input placeholder="e.g., Municipal Corporation of Delhi" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="informationSought" render={({ field }) => (
                <FormItem><FormLabel>Information Sought</FormLabel><FormControl><Textarea rows={6} placeholder="Clearly list the information you require..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" className="w-full" size="lg">Generate RTI Request</Button>
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
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea
            readOnly
            value={generatedText || "Your generated RTI request will appear here..."}
            className="w-full h-[500px] font-mono text-sm bg-background whitespace-pre-wrap"
          />
        </CardContent>
      </Card>
    </div>
  );
}

const policeComplaintSchema = z.object({
  complainantName: z.string().min(2, "Your name is required"),
  complainantAddress: z.string().min(10, "Your full address is required"),
  incidentDate: z.string().min(1, "Date of incident is required"),
  incidentPlace: z.string().min(3, "Place of incident is required"),
  complaintDetails: z.string().min(20, "Please describe the incident in detail"),
  accusedName: z.string().optional(),
});

function PoliceComplaintGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const form = useForm<z.infer<typeof policeComplaintSchema>>({
    resolver: zodResolver(policeComplaintSchema),
    defaultValues: { complainantName: '', complainantAddress: '', incidentDate: '', incidentPlace: '', complaintDetails: '', accusedName: ''},
  });

  function onSubmit(values: z.infer<typeof policeComplaintSchema>) {
    const today = new Date().toLocaleDateString('en-IN');
    const text = `
To,
The Officer in Charge,
[Police Station Name],
[Police Station Address]

Date: ${today}

Subject: Complaint regarding an incident on ${values.incidentDate}

Respected Sir/Madam,

I, ${values.complainantName}, residing at ${values.complainantAddress}, wish to file a complaint regarding an incident that occurred on ${values.incidentDate} at/near ${values.incidentPlace}.

The details of the incident are as follows:
${values.complaintDetails}

${values.accusedName ? `The person(s) responsible for this incident is/are: ${values.accusedName}.` : ''}

I request you to kindly register an FIR in this matter and take necessary legal action against the responsible parties.

Thank you for your time and consideration.

Yours faithfully,

_________________________
(${values.complainantName})
`;
    setGeneratedText(text.trim());
  }

  const handleDownload = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'police-complaint.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Police Complaint Details</CardTitle>
          <CardDescription>Fill in the details to generate a draft police complaint.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="complainantName" render={({ field }) => (
                <FormItem><FormLabel>Your Full Name</FormLabel><FormControl><Input placeholder="Your Full Name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="complainantAddress" render={({ field }) => (
                <FormItem><FormLabel>Your Address</FormLabel><FormControl><Textarea placeholder="Your Full Address" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="incidentDate" render={({ field }) => (
                  <FormItem><FormLabel>Date of Incident</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="incidentPlace" render={({ field }) => (
                  <FormItem><FormLabel>Place of Incident</FormLabel><FormControl><Input placeholder="e.g., Near City Market" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="accusedName" render={({ field }) => (
                <FormItem><FormLabel>Name of Accused (Optional)</FormLabel><FormControl><Input placeholder="Name of person(s) involved" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="complaintDetails" render={({ field }) => (
                <FormItem><FormLabel>Details of Complaint</FormLabel><FormControl><Textarea rows={6} placeholder="Describe the incident chronologically..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" className="w-full" size="lg">Generate Complaint</Button>
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
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea
            readOnly
            value={generatedText || "Your generated police complaint will appear here..."}
            className="w-full h-[500px] font-mono text-sm bg-background whitespace-pre-wrap"
          />
        </CardContent>
      </Card>
    </div>
  );
}

const legalNoticeSchema = z.object({
    senderName: z.string().min(2, "Sender's name is required"),
    senderAddress: z.string().min(10, "Sender's address is required"),
    recipientName: z.string().min(2, "Recipient's name is required"),
    recipientAddress: z.string().min(10, "Recipient's address is required"),
    subject: z.string().min(5, "Subject is required"),
    noticeDetails: z.string().min(20, "Please provide the detailed grounds for the notice"),
    claimAmount: z.coerce.number().optional(),
    complianceDays: z.coerce.number().positive("Compliance period must be a positive number"),
});

function LegalNoticeGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const form = useForm<z.infer<typeof legalNoticeSchema>>({
    resolver: zodResolver(legalNoticeSchema),
    defaultValues: { 
      senderName: '', 
      senderAddress: '', 
      recipientName: '', 
      recipientAddress: '', 
      subject: '', 
      noticeDetails: '', 
      claimAmount: 0,
      complianceDays: 15 
    },
  });

  function onSubmit(values: z.infer<typeof legalNoticeSchema>) {
    const today = new Date().toLocaleDateString('en-IN');
    const text = `
LEGAL NOTICE

Date: ${today}

From:
${values.senderName}
${values.senderAddress}

To:
${values.recipientName}
${values.recipientAddress}

Subject: LEGAL NOTICE FOR ${values.subject.toUpperCase()}

Sir/Madam,

Under instructions from and on behalf of my client, ${values.senderName}, I do hereby serve upon you the following legal notice:

1. That my client states that... [This section is for the lawyer to fill in the legal precedents and context. The details you provide will be listed below.]

2. The detailed facts of the matter are as follows:
   ${values.noticeDetails}

3. That you, the Noticee, have failed to comply with your obligations. ${values.claimAmount ? `My client is entitled to claim an amount of INR ${values.claimAmount} from you.` : ''}

I, therefore, through this notice, call upon you to comply with the demands herein within a period of ${values.complianceDays} days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate civil and/or criminal proceedings against you in a competent court of law, at your sole risk, cost, and consequences.

A copy of this notice is kept in my office for record and further necessary action.

Yours sincerely,

_________________________
(Advocate's Signature)
`;
    setGeneratedText(text.trim());
  }

  const handleDownload = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'legal-notice.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Legal Notice Details</CardTitle>
          <CardDescription>Fill in the details to generate a draft legal notice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="senderName" render={({ field }) => (
                  <FormItem><FormLabel>Sender's Name</FormLabel><FormControl><Input placeholder="Your Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="senderAddress" render={({ field }) => (
                  <FormItem><FormLabel>Sender's Address</FormLabel><FormControl><Textarea placeholder="Your Full Address" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="recipientName" render={({ field }) => (
                  <FormItem><FormLabel>Recipient's Name</FormLabel><FormControl><Input placeholder="Recipient's Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="recipientAddress" render={({ field }) => (
                  <FormItem><FormLabel>Recipient's Address</FormLabel><FormControl><Textarea placeholder="Recipient's Full Address" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem><FormLabel>Subject of Notice</FormLabel><FormControl><Input placeholder="e.g., Recovery of Dues" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="claimAmount" render={({ field }) => (
                        <FormItem><FormLabel>Claim Amount (INR, Optional)</FormLabel><FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="complianceDays" render={({ field }) => (
                        <FormItem><FormLabel>Days to Comply</FormLabel><FormControl><Input type="number" placeholder="e.g., 15" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <FormField control={form.control} name="noticeDetails" render={({ field }) => (
                  <FormItem><FormLabel>Grounds / Details for Notice</FormLabel><FormControl><Textarea rows={6} placeholder="Provide a chronological account of the facts..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              <Button type="submit" className="w-full" size="lg">Generate Legal Notice</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="bg-secondary/30">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Generated Document</CardTitle>
            <CardDescription>Review the draft below. This is a template and requires lawyer review.</CardDescription>
          </div>
          <Button onClick={handleDownload} disabled={!generatedText} size="sm">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea
            readOnly
            value={generatedText || "Your generated legal notice will appear here..."}
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
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('header.legalLetters')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">Generate drafts for common legal letters and documents.</p>
            </div>
            <Tabs defaultValue="rent-agreement" className="mt-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="rent-agreement">Rent Agreement</TabsTrigger>
                    <TabsTrigger value="rti">RTI Request</TabsTrigger>
                    <TabsTrigger value="police-complaint">Police Complaint</TabsTrigger>
                    <TabsTrigger value="legal-notice">Legal Notice</TabsTrigger>
                </TabsList>
                <TabsContent value="rent-agreement" className="mt-6">
                    <RentAgreementGenerator />
                </TabsContent>
                 <TabsContent value="rti" className="mt-6">
                    <RtiRequestGenerator />
                </TabsContent>
                <TabsContent value="police-complaint" className="mt-6">
                    <PoliceComplaintGenerator />
                </TabsContent>
                 <TabsContent value="legal-notice" className="mt-6">
                    <LegalNoticeGenerator />
                </TabsContent>
            </Tabs>
        </div>
    );
}
