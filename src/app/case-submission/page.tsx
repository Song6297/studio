
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
import { FileText, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { submitCase } from './actions';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CaseSubmissionPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/register?type=login');
      }
    }
  }, [user, authLoading, router]);

  const formSchema = z.object({
    fullName: z.string().min(2, t('caseSubmission.validation.fullNameRequired')),
    email: z.string().email(t('caseSubmission.validation.emailInvalid')),
    phone: z.string().min(10, t('caseSubmission.validation.phoneInvalid')),
    caseCategory: z.string({ required_error: t('caseSubmission.validation.categoryRequired') }),
    description: z.string().min(20, t('caseSubmission.validation.descriptionRequired')),
    document: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      description: '',
    },
  });

   useEffect(() => {
    if (user) {
      form.setValue('fullName', user.displayName || '');
      form.setValue('email', user.email || '');
    }
  }, [user, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!user) {
        toast({ variant: 'destructive', title: "Authentication Error", description: "You must be logged in to submit a case."});
        return;
    }

    setIsLoading(true);
    const { document, ...formData } = values;
    
    const result = await submitCase(formData, user.uid);

    if (result.success) {
      toast({
        title: t('caseSubmission.toast.successTitle'),
        description: t('caseSubmission.toast.successDescription'),
      });
      form.reset();
    } else {
        toast({
            variant: 'destructive',
            title: "Submission Failed",
            description: result.error,
        });
    }
    setIsLoading(false);
  }

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="container py-12 md:py-24">
      <Card className="mx-auto max-w-3xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center p-8">
          <FileText className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="mt-4 font-headline text-3xl md:text-4xl">{t('caseSubmission.title')}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            {t('caseSubmission.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('caseSubmission.form.fullName.label')}</FormLabel>
                    <FormControl><Input placeholder={t('caseSubmission.form.fullName.placeholder')} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('caseSubmission.form.email.label')}</FormLabel>
                    <FormControl><Input type="email" placeholder={t('caseSubmission.form.email.placeholder')} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('caseSubmission.form.phone.label')}</FormLabel>
                    <FormControl><Input type="tel" placeholder={t('caseSubmission.form.phone.placeholder')} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="caseCategory" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('caseSubmission.form.category.label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder={t('caseSubmission.form.category.placeholder')} /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="family">{t('caseSubmission.form.category.options.family')}</SelectItem>
                        <SelectItem value="criminal">{t('caseSubmission.form.category.options.criminal')}</SelectItem>
                        <SelectItem value="corporate">{t('caseSubmission.form.category.options.corporate')}</SelectItem>
                        <SelectItem value="property">{t('caseSubmission.form.category.options.property')}</SelectItem>
                        <SelectItem value="other">{t('caseSubmission.form.category.options.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('caseSubmission.form.caseDescription.label')}</FormLabel>
                  <FormControl><Textarea rows={6} placeholder={t('caseSubmission.form.caseDescription.placeholder')} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="document" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('caseSubmission.form.upload.label')}</FormLabel>
                  <FormControl><Input type="file"  /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  t('caseSubmission.form.submitButton')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
