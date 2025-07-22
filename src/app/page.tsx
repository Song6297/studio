
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AshokaChakraIcon } from '@/components/icons/emblem';
import { ArrowRight, BookOpen, FileText, Bot, Scale, Gavel, Handshake, FileQuestion, CalendarCheck, Loader2, Search } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

export default function Home() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const preambleText = t('indianConstitution.preamble.text');

  const allFeatures = [
      {
        icon: FileText,
        title: t('features.registerCase.title'),
        description: t('features.registerCase.description'),
        href: "/case-submission",
        cta: t('features.registerCase.cta'),
      },
      {
        icon: Bot,
        title: t('features.aiLegalAdvice.title'),
        description: t('features.aiLegalAdvice.description'),
        href: "/ai-legal-guide",
        cta: t('features.aiLegalAdvice.cta'),
      },
      {
        icon: FileQuestion,
        title: t('features.fileRti.title'),
        description: t('features.fileRti.description'),
        href: "/file-rti",
        cta: t('features.fileRti.cta'),
      },
      {
        icon: CalendarCheck,
        title: t('features.legalServices.title'),
        description: t('features.legalServices.description'),
        href: "/legal-services",
        cta: t('features.legalServices.cta'),
      },
      {
        icon: BookOpen,
        title: t('features.legalAwareness.title'),
        description: t('features.legalAwareness.description'),
        href: "/legal-awareness",
        cta: t('features.legalAwareness.cta'),
      },
      {
        icon: Handshake,
        title: t('features.volunteerNetwork.title'),
        description: t('features.volunteerNetwork.description'),
        href: "/volunteer-network",
        cta: t('features.volunteerNetwork.cta'),
      },
      {
        icon: Scale,
        title: t('features.indianConstitution.title'),
        description: t('features.indianConstitution.description'),
        href: "/indian-constitution",
        cta: t('features.indianConstitution.cta'),
      },
  ];

  const filteredFeatures = allFeatures.filter(feature => 
    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!isMounted) {
    return (
       <div className="flex items-center justify-center min-h-dvh">
         <Loader2 className="h-10 w-10 animate-spin text-primary" />
       </div>
    );
  }

  return (
    <>
      <section className="relative w-full bg-background pt-20 md:pt-32 lg:pt-40 overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center -z-10">
          <div className="text-primary/5 dark:text-primary/10 w-full max-w-screen-lg h-full">
            <AshokaChakraIcon />
          </div>
        </div>
        <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-start text-left">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  {t('home.mainHeading')}
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
                  {t('home.subHeading')}
                </p>
                 <div className="flex flex-col sm:flex-row justify-start gap-4 mt-8 w-full">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link href="/case-submission">
                        {t('home.registerCaseButton')} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                      <Link href="/ai-legal-guide">
                        {t('home.aiAdviceButton')} <Bot className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full max-w-md p-6 bg-card/80 backdrop-blur-sm shadow-2xl">
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl">Search Services</CardTitle>
                      <CardDescription>Find the legal service you need.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="e.g., RTI, AI Advice..." 
                            className="pl-10 text-base" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </div>
                    </CardContent>
                </Card>
              </div>
            </div>
        </div>
      </section>
      
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="space-y-3">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">{t('home.servicesTitle')}</div>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">{t('home.servicesHeading')}</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {t('home.servicesDescription')}
                    </p>
                </div>
            </div>
            <div className="mx-auto grid grid-cols-1 items-stretch gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFeatures.map((feature) => (
                    <Card key={feature.title} className="group flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="mb-4 flex items-center gap-4">
                          <div className="rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
                            <feature.icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Link href={feature.href} className="flex items-center font-semibold text-primary transition-colors hover:text-accent-foreground">
                          {feature.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </CardFooter>
                    </Card>
                ))}
            </div>
             {filteredFeatures.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg">No services found for "{searchTerm}".</p>
                    <p>Please try a different search term.</p>
                </div>
            )}
        </div>
      </section>
      
      <section id="preamble" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="shadow-2xl">
              <CardHeader className="items-center text-center p-6 md:p-8">
                <Gavel className="h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
                <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                  {t('indianConstitution.preamble.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
                <p className="whitespace-pre-wrap text-center text-base md:text-lg leading-relaxed text-foreground/80 font-serif">
                    {preambleText}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </>
  );
}
