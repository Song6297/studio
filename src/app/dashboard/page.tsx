
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ArrowRight, Scale, Users, Video, Phone, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


interface Case {
  id: string;
  fullName: string;
  caseCategory: string;
  status: 'new' | 'in-progress' | 'resolved';
  submittedAt: Timestamp;
  userId: string;
}

interface Advisor {
  name: string;
  specialization: string;
  bio: string;
  image: string;
  hint: string;
}

function ConsultationBookingForm({ advisorName }: { advisorName: string }) {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const [isConfirming, setIsConfirming] = useState(false);
    const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

    const formSchema = z.object({
        fullName: z.string().min(2, t('legalServices.validation.nameRequired')),
        email: z.string().email(t('legalServices.validation.emailInvalid')),
        phone: z.string().min(10, t('legalServices.validation.phoneInvalid')),
        consultationType: z.enum(['video', 'voice'], { required_error: t('legalServices.validation.typeRequired') }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { fullName: '', email: '', phone: '' },
    });
    
    function onAttemptSubmit(values: z.infer<typeof formSchema>) {
        if (!selectedDate || !selectedTime) {
            toast({
                variant: 'destructive',
                title: t('legalServices.toast.errorTitle'),
                description: t('legalServices.toast.errorDescription'),
            });
            return;
        }
        setFormData(values);
        setIsConfirming(true);
    }
    
    function handleConfirmBooking() {
        if (!formData || !selectedDate || !selectedTime) return;

        console.log({
            ...formData,
            advisor: advisorName,
            date: format(selectedDate, 'PPP'),
            time: selectedTime,
        });

        toast({
            title: t('legalServices.toast.successTitle'),
            description: `${t('legalServices.toast.successDescription')} ${advisorName} on ${format(selectedDate, 'PPP')} at ${selectedTime}`,
        });
        form.reset();
        setSelectedTime(undefined);
        setIsConfirming(false);
        setIsBookingOpen(false); // Close the main booking dialog
    }

    return (
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">{t('legalServices.advisors.bookButton')}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">{t('legalServices.booking.title')} - {advisorName}</DialogTitle>
                <DialogDescription>
                  {t('legalServices.booking.description')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <Form {...form}>
                    <form id="booking-form" onSubmit={form.handleSubmit(onAttemptSubmit)} className="space-y-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>{t('legalServices.form.name.label')}</FormLabel><FormControl><Input placeholder={t('legalServices.form.name.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>{t('legalServices.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('legalServices.form.email.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>{t('legalServices.form.phone.label')}</FormLabel><FormControl><Input type="tel" placeholder={t('legalServices.form.phone.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="consultationType" render={({ field }) => (
                            <FormItem className="space-y-3"><FormLabel>{t('legalServices.form.type.label')}</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="video" id="video" /></FormControl>
                                            <FormLabel className="font-normal flex items-center gap-2"><Video /> {t('legalServices.form.type.options.video')}</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="voice" id="voice" /></FormControl>
                                            <FormLabel className="font-normal flex items-center gap-2"><Phone /> {t('legalServices.form.type.options.voice')}</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl><FormMessage />
                            </FormItem>
                        )} />
                    </form>
                  </Form>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col items-center">
                        <FormLabel className="w-full mb-2">{t('legalServices.form.date.label')}</FormLabel>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        />
                    </div>
                    <div>
                        <FormLabel>{t('legalServices.form.time.label')}</FormLabel>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {timeSlots.map(time => (
                                <Button 
                                    key={time} 
                                    type="button" 
                                    variant={selectedTime === time ? "default" : "outline"}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
              <DialogFooter>
                <Button form="booking-form" type="submit" size="lg">{t('legalServices.form.submitButton')}</Button>
              </DialogFooter>

               <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('legalServices.booking.confirmTitle')}</AlertDialogTitle>
                      <AlertDialogDescription>
                          {t('legalServices.booking.confirmDescription')}
                          <div className="my-4 space-y-2 text-sm text-foreground">
                            <p><strong>{t('legalServices.booking.advisor')}:</strong> {advisorName}</p>
                            <p><strong>{t('legalServices.booking.date')}:</strong> {selectedDate ? format(selectedDate, 'PPP') : 'N/A'}</p>
                            <p><strong>{t('legalServices.booking.time')}:</strong> {selectedTime}</p>
                            <p><strong>{t('legalServices.booking.type')}:</strong> {formData?.consultationType === 'video' ? t('legalServices.form.type.options.video') : t('legalServices.form.type.options.voice')}</p>
                          </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('legalServices.booking.cancelButton')}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleConfirmBooking}>{t('legalServices.booking.confirmButton')}</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>

          </DialogContent>
        </Dialog>
    );
}

function DashboardPage() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const advisors: Advisor[] = t('legalServices.advisors.list', { returnObjects: true }) as unknown as Advisor[];

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!user) {
      router.push('/register?type=login');
      return;
    }

    async function fetchCases(userId: string) {
      setIsLoading(true);
      try {
        const casesCollection = collection(db, 'cases');
        const q = query(casesCollection, where("userId", "==", userId), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const casesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Case[];
        setCases(casesData);
      } catch (err) {
        console.error(err);
        setError(t('caseStatus.error.fetch'));
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCases(user.uid);
  }, [user, authLoading, router, t]);

  const handleCardClick = (caseId: string) => {
    router.push(`/case-status/${caseId}`);
  };

  if (authLoading || isLoading) {
      return (
          <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
              <Scale className="h-12 w-12 animate-bounce text-primary" />
          </div>
      );
  }
  
  const getStatusVariant = (status: Case['status']) => {
    switch (status) {
      case 'new': return 'secondary';
      case 'in-progress': return 'default';
      case 'resolved': return 'outline';
      default: return 'secondary';
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleDateString();
  };
  
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <LayoutDashboard className="h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('dashboard.title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('dashboard.description')}</p>
      </div>
      
      {error && <p className="text-center text-destructive">{error}</p>}
      {!isLoading && !error && cases.length === 0 && (
         <div className="text-center text-muted-foreground bg-card border rounded-lg p-8">
            <h3 className="text-xl font-semibold">{t('caseStatus.noCases')}</h3>
            <p className="mt-2">You have not submitted any cases yet.</p>
            <Button onClick={() => router.push('/case-submission')} className="mt-4">
              Register a New Case <ArrowRight className="ml-2" />
            </Button>
          </div>
      )}

      {cases.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {cases.map(caseItem => (
              <Card key={caseItem.id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCardClick(caseItem.id)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                      <div>
                        <CardDescription>{t('caseStatus.table.caseId')}</CardDescription>
                        <CardTitle className="font-mono text-base truncate">{caseItem.id}</CardTitle>
                      </div>
                      <Badge variant={getStatusVariant(caseItem.status)}>
                        {t(`caseStatus.statusLabels.${caseItem.status}`)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-2">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('caseStatus.table.name')}</p>
                        <p>{caseItem.fullName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('caseStatus.table.category')}</p>
                        <p>{caseItem.caseCategory}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('caseStatus.table.submitted')}</p>
                        <p>{formatDate(caseItem.submittedAt)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-4 border-t">
                   <Button variant="outline" size="sm">
                    View Details <ArrowRight className="ml-2" />
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
      )}

       <div className="mx-auto max-w-6xl mt-16">
          <div className="flex flex-col items-center text-center mb-12">
            <UserCheck className="h-12 w-12 text-primary" />
            <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('legalServices.advisors.title')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl">Book a virtual consultation with an experienced legal advisor.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(advisors) && advisors.map((advisor) => (
                <Card key={advisor.name} className="flex flex-col text-center">
                  <CardHeader>
                      <Image src={advisor.image} alt={advisor.name} width={120} height={120} className="rounded-full mx-auto border-4 border-primary/20 shadow-lg" data-ai-hint={advisor.hint}/>
                    <CardTitle className="font-headline mt-4">{advisor.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold">{advisor.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{advisor.bio}</p>
                  </CardContent>
                  <CardFooter>
                      <ConsultationBookingForm advisorName={advisor.name} />
                  </CardFooter>
                </Card>
              ))}
          </div>
      </div>
    </div>
  );
}

export default DashboardPage;

    