
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AshokaChakraIcon } from '@/components/icons/emblem';
import { ArrowRight, BookOpen, FileText, Bot, Scale, Gavel, Handshake, FileQuestion, CalendarCheck, PenSquare } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';


export default function Home() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const preambleText = t('indianConstitution.preamble.text');

  const allFeatures = [
      {
        icon: Bot,
        titleKey: 'features.aiLegalAdvice.title',
        descriptionKey: 'features.aiLegalAdvice.description',
        href: "/ai-legal-guide",
        ctaKey: 'features.aiLegalAdvice.cta',
      },
      {
        icon: FileText,
        titleKey: 'features.registerCase.title',
        descriptionKey: 'features.registerCase.description',
        href: "/case-submission",
        ctaKey: 'features.registerCase.cta',
      },
      {
        icon: FileQuestion,
        titleKey: 'features.fileRti.title',
        descriptionKey: 'features.fileRti.description',
        href: "/file-rti",
        ctaKey: 'features.fileRti.cta',
      },
       {
        icon: PenSquare,
        titleKey: 'features.documentServices.title',
        descriptionKey: 'features.documentServices.description',
        href: "/document-services",
        ctaKey: 'features.documentServices.cta',
      },
      {
        icon: CalendarCheck,
        titleKey: 'features.legalServices.title',
        descriptionKey: 'features.legalServices.description',
        href: "/legal-services",
        ctaKey: 'features.legalServices.cta',
      },
      {
        icon: BookOpen,
        titleKey: 'features.legalAwareness.title',
        descriptionKey: 'features.legalAwareness.description',
        href: "/legal-awareness",
        ctaKey: 'features.legalAwareness.cta',
      },
       {
        icon: Handshake,
        titleKey: 'features.volunteerNetwork.title',
        descriptionKey: 'features.volunteerNetwork.description',
        href: "/volunteer-network",
        ctaKey: 'features.volunteerNetwork.cta',
      },
      {
        icon: Scale,
        titleKey: 'features.indianConstitution.title',
        descriptionKey: 'features.indianConstitution.description',
        href: "/indian-constitution",
        ctaKey: 'features.indianConstitution.cta',
      },
  ];

  if (!isMounted) {
    return (
       <div className="flex items-center justify-center min-h-dvh">
         <Scale className="h-12 w-12 animate-bounce text-primary" />
       </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center text-center p-4">
        {/* Abstract Background */}
        <div className="absolute inset-0 w-full h-full bg-background overflow-hidden -z-10">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-secondary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="absolute -top-48 -left-48 md:-top-64 md:-left-64 h-[400px] w-[400px] md:h-[600px] md:w-[600px] text-accent/10 -z-10">
                <AshokaChakraIcon />
            </div>
             <div className="flex items-center gap-2 mb-2">
              <Scale className="h-16 w-16 text-primary" />
            </div>
          <div className="inline-block">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-blue-100 to-[#138808] dark:to-secondary bg-clip-text text-transparent">
              {t('home.mainHeading')}
            </h1>
          </div>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            {t('home.subHeading')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/case-submission">
                {t('home.registerCaseButton')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/ai-legal-guide">
                {t('home.aiAdviceButton')} <Bot className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section id="preamble" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="shadow-2xl bg-card/60 backdrop-blur-xl border-primary/10">
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

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="space-y-3">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{t('home.servicesTitle')}</div>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">{t('home.servicesHeading')}</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {t('home.servicesDescription')}
                    </p>
                </div>
            </div>
            <div className="mx-auto grid grid-cols-1 items-stretch gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
                {allFeatures.map((feature) => (
                    <Card key={feature.titleKey} className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2 bg-card/60 backdrop-blur-md border-primary/10">
                      <CardHeader>
                        <div className="mb-4 flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg text-primary ring-1 ring-inset ring-primary/20 group-hover:scale-110 transition-transform">
                            <feature.icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl">{t(feature.titleKey)}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <CardDescription>{t(feature.descriptionKey)}</CardDescription>
                      </CardContent>
                      <CardFooter className="bg-gradient-to-t from-black/5 to-transparent pt-6">
                        <Link href={feature.href} className="flex items-center font-semibold text-primary transition-colors hover:text-accent">
                          {t(feature.ctaKey)}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </section>

    <style jsx>{`
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }
    `}</style>
    </div>
  );
}
