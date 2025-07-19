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
import { UserPlus } from 'lucide-react';

const advocateSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  barId: z.string().min(5, 'A valid Bar Council ID is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const ngoSchema = z.object({
  ngoName: z.string().min(3, 'NGO name is required'),
  registrationNumber: z.string().min(5, 'A valid registration number is required'),
  contactEmail: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


export default function RegisterPage() {
  const { toast } = useToast();
  
  const advocateForm = useForm<z.infer<typeof advocateSchema>>({
    resolver: zodResolver(advocateSchema),
    defaultValues: { fullName: '', email: '', barId: '', password: '' },
  });

  const ngoForm = useForm<z.infer<typeof ngoSchema>>({
    resolver: zodResolver(ngoSchema),
    defaultValues: { ngoName: '', registrationNumber: '', contactEmail: '', password: '' },
  });

  function onAdvocateSubmit(values: z.infer<typeof advocateSchema>) {
    console.log(values);
    toast({ title: 'Advocate Registration Successful!', description: 'Your profile is under review.' });
    advocateForm.reset();
  }
  
  function onNgoSubmit(values: z.infer<typeof ngoSchema>) {
    console.log(values);
    toast({ title: 'NGO Registration Successful!', description: 'Your profile is under review.' });
    ngoForm.reset();
  }

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Tabs defaultValue="advocate" className="w-full max-w-md">
        <div className="text-center mb-8">
            <UserPlus className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Join Our Network</h1>
            <p className="mt-2 text-lg text-muted-foreground">Register as an Advocate or an NGO.</p>
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="advocate">Advocate/Legal Adviser</TabsTrigger>
          <TabsTrigger value="ngo">NGO</TabsTrigger>
        </TabsList>
        <TabsContent value="advocate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Advocate Registration</CardTitle>
              <CardDescription>Create your professional profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...advocateForm}>
                <form onSubmit={advocateForm.handleSubmit(onAdvocateSubmit)} className="space-y-4">
                  <FormField control={advocateForm.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={advocateForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="advocate@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={advocateForm.control} name="barId" render={({ field }) => (
                    <FormItem><FormLabel>Bar Council ID</FormLabel><FormControl><Input placeholder="BAR/1234/2024" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={advocateForm.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full">Register as Advocate</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ngo" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">NGO Registration</CardTitle>
              <CardDescription>Register your organization to collaborate.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...ngoForm}>
                <form onSubmit={ngoForm.handleSubmit(onNgoSubmit)} className="space-y-4">
                  <FormField control={ngoForm.control} name="ngoName" render={({ field }) => (
                    <FormItem><FormLabel>NGO Name</FormLabel><FormControl><Input placeholder="Helpful Hands Foundation" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={ngoForm.control} name="registrationNumber" render={({ field }) => (
                    <FormItem><FormLabel>Registration Number</FormLabel><FormControl><Input placeholder="NGO/REG/12345" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={ngoForm.control} name="contactEmail" render={({ field }) => (
                    <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" placeholder="contact@ngo.org" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={ngoForm.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full">Register as NGO</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
