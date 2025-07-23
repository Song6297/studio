
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Users, Video, Phone, UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { format } from 'date-fns';
import Image from 'next/image';

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
              <div className="py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onAttemptSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem><FormLabel>{t('legalServices.form.name.label')}</FormLabel><FormControl><Input placeholder={t('legalServices.form.name.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>{t('legalServices.form.email.label')}</FormLabel><FormControl><Input type="email" placeholder={t('legalServices.form.email.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem><FormLabel>{t('legalServices.form.phone.label')}</FormLabel><FormControl><Input type="tel" placeholder={t('legalServices.form.phone.placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

                        <Button type="submit" className="w-full" size="lg">{t('legalServices.form.submitButton')}</Button>
                    </form>
                </Form>
              </div>

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


function LegalAidCamps() {
    const { t } = useLanguage();
    const camps = t('legalServices.camps.list', { returnObjects: true }) as unknown as { title: string, ngo: string, date: string, location: string, description: string }[];
    
    return (
        <div className="mt-16">
            <div className="flex flex-col items-center text-center mb-8">
                 <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20 mb-4">
                    <Users className="h-8 w-8" />
                </div>
                <h2 className="font-headline text-3xl font-bold">{t('legalServices.camps.title')}</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{t('legalServices.camps.description')}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                {Array.isArray(camps) && camps.map((camp, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="font-headline">{camp.title}</CardTitle>
                            <CardDescription>{t('legalServices.camps.organizedBy')} {camp.ngo}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="font-semibold">{t('legalServices.camps.date')}: <span className="font-normal text-muted-foreground">{camp.date}</span></p>
                            <p className="font-semibold">{t('legalServices.camps.location')}: <span className="font-normal text-muted-foreground">{camp.location}</span></p>
                            <p className="text-sm pt-2">{camp.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function LegalServicesPage() {
    const { t } = useLanguage();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
             <div className="container py-12 md:py-24">
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20 mb-4">
                        <UserCheck className="h-10 w-10" />
                    </div>
                    <h1 className="font-headline text-3xl font-bold md:text-4xl">{t('legalServices.title')}</h1>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl">{t('legalServices.description')}</p>
                </div>
             </div>
        );
    }
    
    const advisors: Advisor[] = t('legalServices.advisors.list', { returnObjects: true }) as unknown as Advisor[];

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12">
                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20 mb-4">
                    <UserCheck className="h-10 w-10" />
                </div>
                <h1 className="font-headline text-3xl font-bold md:text-4xl">{t('legalServices.title')}</h1>
                <p className="mt-2 text-lg text-muted-foreground max-w-3xl">{t('legalServices.description')}</p>
            </div>

            <div className="mx-auto max-w-6xl">
                <h2 className="font-headline text-3xl font-bold text-center mb-8">{t('legalServices.advisors.title')}</h2>
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

            <div className="mx-auto max-w-6xl">
                <LegalAidCamps />
            </div>
        </div>
    );
}
