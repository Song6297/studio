
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileQuestion, PlusCircle, MinusCircle, Copy, Download } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useState } from 'react';

function RtiGuide() {
    const { t } = useLanguage();
    const steps = t('fileRti.guide.steps', { returnObjects: true }) as unknown as { title: string, description: string }[];
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('fileRti.guide.title')}</CardTitle>
                <CardDescription>{t('fileRti.guide.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {Array.isArray(steps) && steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                                {index + 1}
                            </div>
                            {index < steps.length - 1 && <div className="w-px h-full bg-border mt-2"></div>}
                        </div>
                        <div>
                            <h4 className="font-semibold">{step.title}</h4>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
                <Button asChild className="w-full mt-4">
                    <a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer">
                        {t('fileRti.guide.portalButton')}
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}

function RtiRequestGenerator() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [generatedText, setGeneratedText] = useState('');

  const formSchema = z.object({
    applicantName: z.string().min(2, t('fileRti.generator.validation.nameRequired')),
    address: z.string().min(10, t('fileRti.generator.validation.addressRequired')),
    pioName: z.string().min(2, t('fileRti.generator.validation.pioRequired')),
    departmentName: z.string().min(3, t('fileRti.generator.validation.departmentRequired')),
    questions: z.array(z.object({
      value: z.string().min(10, t('fileRti.generator.validation.questionRequired')),
    })).min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: '',
      address: '',
      pioName: 'Public Information Officer',
      departmentName: '',
      questions: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const today = new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
    const questionsText = values.questions.map((q, index) => `${index + 1}. ${q.value}`).join('\n');

    const text = `
To,
The Public Information Officer (PIO),
${values.departmentName}

Subject: Request for Information under the RTI Act, 2005

Sir/Madam,

I, ${values.applicantName}, a citizen of India, residing at ${values.address}, seek the following information under the Right to Information Act, 2005.

The required information is as follows:
${questionsText}

I am an Indian citizen and I am ready to pay the required fees for this information.

Thank you.

Sincerely,
${values.applicantName}
${values.address}
Date: ${today}
    `;
    setGeneratedText(text.trim());
    toast({ title: t('fileRti.generator.toast.successTitle') });
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({ description: t('fileRti.generator.toast.copied') });
  };
  
  const downloadAsTxt = () => {
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rti_request.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('fileRti.generator.title')}</CardTitle>
        <CardDescription>{t('fileRti.generator.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {!generatedText ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="applicantName" render={({ field }) => (
                  <FormItem><FormLabel>{t('fileRti.generator.form.name.label')}</FormLabel><FormControl><Input placeholder={t('fileRti.generator.form.name.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>{t('fileRti.generator.form.address.label')}</FormLabel><FormControl><Input placeholder={t('fileRti.generator.form.address.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="pioName" render={({ field }) => (
                  <FormItem><FormLabel>{t('fileRti.generator.form.pio.label')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="departmentName" render={({ field }) => (
                  <FormItem><FormLabel>{t('fileRti.generator.form.department.label')}</FormLabel><FormControl><Input placeholder={t('fileRti.generator.form.department.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div>
                <FormLabel>{t('fileRti.generator.form.questions.label')}</FormLabel>
                {fields.map((field, index) => (
                  <FormField key={field.id} control={form.control} name={`questions.${index}.value`} render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-2">
                        <FormControl><Textarea placeholder={`${t('fileRti.generator.form.questions.placeholder')} #${index + 1}`} {...field} rows={2} /></FormControl>
                        {fields.length > 1 && (
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                <MinusCircle className="h-5 w-5 text-destructive" />
                            </Button>
                        )}
                    </FormItem>
                  )} />
                ))}
                 <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('fileRti.generator.form.questions.addButton')}
                </Button>
              </div>

              <Button type="submit" className="w-full" size="lg">{t('fileRti.generator.form.submitButton')}</Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
              <Textarea readOnly value={generatedText} rows={15} className="font-mono text-sm bg-muted/50" />
              <div className="flex gap-4">
                  <Button onClick={copyToClipboard} className="w-full"><Copy className="mr-2 h-4 w-4" /> {t('fileRti.generator.copyButton')}</Button>
                  <Button onClick={downloadAsTxt} className="w-full"><Download className="mr-2 h-4 w-4" /> {t('fileRti.generator.downloadButton')}</Button>
              </div>
              <Button variant="link" onClick={() => setGeneratedText('')}>{t('fileRti.generator.backButton')}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


export default function FileRtiPage() {
    const { t } = useLanguage();

    return (
        <div className="container py-12 md:py-24">
            <div className="text-center mb-12">
                <FileQuestion className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('fileRti.title')}</h1>
                <p className="mt-2 max-w-3xl mx-auto text-lg text-muted-foreground">{t('fileRti.description')}</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2">
                    <RtiGuide />
                </div>
                <div className="lg:col-span-3">
                    <RtiRequestGenerator />
                </div>
            </div>
        </div>
    );
}
