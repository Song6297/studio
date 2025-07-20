
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect, Suspense } from 'react';
import { login, registerUser, registerAdvocate, registerNgo, registerVolunteer } from './actions';
import { Textarea } from '@/components/ui/textarea';

function RegisterForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = searchParams.get('type') || 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  const loginSchema = z.object({
    email: z.string().email(t('register.advocate.validation.emailInvalid')),
    password: z.string().min(1, 'Password is required.'),
  });
  
  const userSchema = z.object({
    email: z.string().email(t('register.advocate.validation.emailInvalid')),
    password: z.string().min(8, t('register.advocate.validation.passwordRequired')),
  });

  const advocateSchema = z.object({
    fullName: z.string().min(2, t('register.advocate.validation.fullNameRequired')),
    email: z.string().email(t('register.advocate.validation.emailInvalid')),
    barId: z.string().min(5, t('register.advocate.validation.barIdRequired')),
    password: z.string().min(8, t('register.advocate.validation.passwordRequired')),
  });

  const ngoSchema = z.object({
    ngoName: z.string().min(3, t('register.ngo.validation.nameRequired')),
    registrationNumber: z.string().min(5, t('register.ngo.validation.regNoRequired')),
    missionStatement: z.string().min(20, t('register.ngo.validation.missionRequired')),
    contactEmail: z.string().email(t('register.ngo.validation.emailInvalid')),
    password: z.string().min(8, t('register.ngo.validation.passwordRequired')),
  });
  
  const volunteerSchema = z.object({
    fullName: z.string().min(2, t('register.volunteer.validation.fullNameRequired')),
    email: z.string().email(t('register.volunteer.validation.emailInvalid')),
    university: z.string().min(3, t('register.volunteer.validation.universityRequired')),
    password: z.string().min(8, t('register.volunteer.validation.passwordRequired')),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { email: '', password: '' },
  });

  const advocateForm = useForm<z.infer<typeof advocateSchema>>({
    resolver: zodResolver(advocateSchema),
    defaultValues: { fullName: '', email: '', barId: '', password: '' },
  });

  const ngoForm = useForm<z.infer<typeof ngoSchema>>({
    resolver: zodResolver(ngoSchema),
    defaultValues: { ngoName: '', registrationNumber: '', missionStatement: '', contactEmail: '', password: '' },
  });
  
  const volunteerForm = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { fullName: '', email: '', university: '', password: '' },
  });

  const handleGenericSubmit = async (
    action: (values: any) => Promise<{ success: boolean; error?: string; redirect?: string }>,
    values: any,
    form: any,
    successTitle: string,
    successDescription: string
  ) => {
    setIsLoading(true);
    const result = await action(values);
    if (result.success) {
      toast({ title: successTitle, description: successDescription });
      form.reset();
      if (result.redirect) {
        router.push(result.redirect);
      } else {
        setActiveTab('login');
      }
    } else {
      toast({ variant: 'destructive', title: t('register.toast.errorTitle'), description: result.error });
    }
    setIsLoading(false);
  };

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoginLoading(true);
    const result = await login(values);
    if (result.success && result.redirect) {
      toast({ title: t('register.login.toast.successTitle') });
      router.push(result.redirect);
    } else {
      toast({ variant: 'destructive', title: t('register.toast.errorTitle'), description: result.error });
      setIsLoginLoading(false);
    }
  };

  const onUserSubmit = (values: z.infer<typeof userSchema>) => handleGenericSubmit(registerUser, values, userForm, "Registration Successful!", "You can now log in.");
  const onAdvocateSubmit = (values: z.infer<typeof advocateSchema>) => handleGenericSubmit(registerAdvocate, values, advocateForm, t('register.advocate.toast.successTitle'), t('register.advocate.toast.successDescription'));
  const onNgoSubmit = (values: z.infer<typeof ngoSchema>) => handleGenericSubmit(registerNgo, values, ngoForm, t('register.ngo.toast.successTitle'), t('register.ngo.toast.successDescription'));
  const onVolunteerSubmit = (values: z.infer<typeof volunteerSchema>) => handleGenericSubmit(registerVolunteer, values, volunteerForm, t('register.volunteer.toast.successTitle'), t('register.volunteer.toast.successDescription'));
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="login">{t('register.tabs.login')}</TabsTrigger>
        <TabsTrigger value="citizen">Citizen</TabsTrigger>
        <TabsTrigger value="advocate">{t('register.tabs.advocate')}</TabsTrigger>
        <TabsTrigger value="ngo">{t('register.tabs.ngo')}</TabsTrigger>
        <TabsTrigger value="volunteer">{t('register.tabs.volunteer')}</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="mt-6">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline">{t('register.login.cardTitle')}</CardTitle>
            <CardDescription>{t('register.login.cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField control={loginForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('register.advocate.form.email.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={loginForm.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.password.label')}</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isLoginLoading}>
                  {isLoginLoading ? <Loader2 className="animate-spin" /> : t('register.login.form.submitButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="citizen" className="mt-6">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline">Citizen Registration</CardTitle>
            <CardDescription>Create a citizen account to access services.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                <FormField control={userForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('register.advocate.form.email.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={userForm.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.password.label')}</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Register'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="advocate" className="mt-6">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline">{t('register.advocate.cardTitle')}</CardTitle>
            <CardDescription>{t('register.advocate.cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...advocateForm}>
              <form onSubmit={advocateForm.handleSubmit(onAdvocateSubmit)} className="space-y-4">
                <FormField control={advocateForm.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.fullName.label')}</FormLabel><FormControl><Input placeholder={t('register.advocate.form.fullName.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={advocateForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('register.advocate.form.email.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={advocateForm.control} name="barId" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.barId.label')}</FormLabel><FormControl><Input placeholder={t('register.advocate.form.barId.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={advocateForm.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.advocate.form.password.label')}</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : t('register.advocate.form.submitButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ngo" className="mt-6">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline">{t('register.ngo.cardTitle')}</CardTitle>
            <CardDescription>{t('register.ngo.cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...ngoForm}>
              <form onSubmit={ngoForm.handleSubmit(onNgoSubmit)} className="space-y-4">
                <FormField control={ngoForm.control} name="ngoName" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.ngo.form.name.label')}</FormLabel><FormControl><Input placeholder={t('register.ngo.form.name.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={ngoForm.control} name="registrationNumber" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.ngo.form.regNo.label')}</FormLabel><FormControl><Input placeholder={t('register.ngo.form.regNo.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={ngoForm.control} name="missionStatement" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.ngo.form.mission.label')}</FormLabel><FormControl><Textarea placeholder={t('register.ngo.form.mission.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={ngoForm.control} name="contactEmail" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.ngo.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('register.ngo.form.email.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={ngoForm.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.ngo.form.password.label')}</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading ? <Loader2 className="animate-spin" /> : t('register.ngo.form.submitButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="volunteer" className="mt-6">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline">{t('register.volunteer.cardTitle')}</CardTitle>
            <CardDescription>{t('register.volunteer.cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...volunteerForm}>
              <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-4">
                <FormField control={volunteerForm.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.volunteer.form.fullName.label')}</FormLabel><FormControl><Input placeholder={t('register.volunteer.form.fullName.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={volunteerForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.volunteer.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('register.volunteer.form.email.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={volunteerForm.control} name="university" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.volunteer.form.university.label')}</FormLabel><FormControl><Input placeholder={t('register.volunteer.form.university.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={volunteerForm.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>{t('register.volunteer.form.password.label')}</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading ? <Loader2 className="animate-spin" /> : t('register.volunteer.form.submitButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default function RegisterPage() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
            <UserPlus className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('register.title')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{t('register.description')}</p>
        </div>
        {isMounted ? (
          <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
            <RegisterForm />
          </Suspense>
        ) : (
          <div className="flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
        )}
      </div>
    </div>
  );
}
