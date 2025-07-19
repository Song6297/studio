
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AshokaChakraIcon } from '@/components/icons/emblem';
import { ArrowRight, BookOpen, FileText, Bot, PenSquare, Scale } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function Home() {
  const { t } = useLanguage();

  const features = [
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
      icon: BookOpen,
      title: t('features.legalAwareness.title'),
      description: t('features.legalAwareness.description'),
      href: "/legal-awareness",
      cta: t('features.legalAwareness.cta'),
    },
    {
      icon: PenSquare,
      title: t('features.affidavitServices.title'),
      description: t('features.affidavitServices.description'),
      href: "#",
      cta: t('features.affidavitServices.cta'),
    },
    {
      icon: Scale,
      title: t('features.notaryServices.title'),
      description: t('features.notaryServices.description'),
      href: "#",
      cta: t('features.notaryServices.cta'),
    },
  ];

  return (
    <>
      <section className="relative w-full bg-background py-20 md:py-32 lg:py-40">
        <div className="container flex min-h-[calc(100vh-15rem)] flex-col items-center justify-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] opacity-5 dark:opacity-10">
              <AshokaChakraIcon />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            {t('home.mainHeading')}
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            {t('home.subHeading')}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/case-submission">
                {t('home.getStartedButton')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/ai-legal-guide">{t('home.aiAdviceButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
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
                    <div key={feature.title} className="group relative flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                        <Link href={feature.href} className="flex items-center font-semibold text-primary transition-colors hover:text-accent">
                          {feature.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </CardFooter>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
