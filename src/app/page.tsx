
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AshokaChakraIcon } from '@/components/icons/emblem';
import { ArrowRight, BookOpen, FileText, Bot, Scale, Gavel, Handshake, FileQuestion, CalendarCheck, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const preambleText = t('indianConstitution.preamble.text');

  // Define features inside a useEffect to ensure they are only created on the client
  const [features, setFeatures] = useState<any[]>([]);
  useEffect(() => {
    if (isMounted) {
      setFeatures([
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
      ]);
    }
  }, [isMounted, t]);

  const IndianFlagBackground = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FF9933] opacity-10"></div>
      <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white opacity-10"></div>
      <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[#138808] opacity-10"></div>
    </div>
  );
  
  // Display a loader until the component is mounted
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
        <IndianFlagBackground />
        <div className="container flex min-h-[calc(60vh-10rem)] flex-col items-center justify-center text-center px-4">
          
          <div className="w-24 h-24 md:w-32 md:h-32 mb-6 text-foreground">
              <AshokaChakraIcon />
          </div>

          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            {t('home.mainHeading')}
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            {t('home.subHeading')}
          </p>
        </div>
      </section>

      <section className="w-full bg-background pb-12 md:pb-24 lg:pb-32">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                {features.map((feature) => (
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
        </div>
      </section>
    </>
  );
}
