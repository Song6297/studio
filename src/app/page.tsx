
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AshokaChakraIcon } from '@/components/icons/emblem';
import { ArrowRight, BookOpen, FileText, Bot, PenSquare, Gavel, Scale, Shield, CheckSquare } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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
      title: t('features.documentServices.title'),
      description: t('features.documentServices.description'),
      href: "/document-services",
      cta: t('features.documentServices.cta'),
    },
  ];

  const preambleText = "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:\n\nJUSTICE, social, economic and political;\nLIBERTY of thought, expression, belief, faith and worship;\nEQUALITY of status and of opportunity;\nand to promote among them all\nFRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;\n\nIN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.";

  const fundamentalRights = [
    { 
      title: "Right to Equality (Articles 14-18)", 
      content: "Ensures equality before law, prohibits discrimination on grounds of religion, race, caste, sex or place of birth, and guarantees equality of opportunity in matters of public employment." 
    },
    { 
      title: "Right to Freedom (Articles 19-22)", 
      content: "Guarantees six fundamental freedoms: speech and expression, assembly, association, movement, residence, and profession. It also provides protection in respect of conviction for offenses and protection of life and personal liberty." 
    },
    { 
      title: "Right against Exploitation (Articles 23-24)", 
      content: "Prohibits all forms of forced labor, child labor, and trafficking of human beings." 
    },
    { 
      title: "Right to Freedom of Religion (Articles 25-28)", 
      content: "Guarantees freedom of conscience and the right to profess, practice, and propagate religion freely." 
    },
    { 
      title: "Cultural and Educational Rights (Articles 29-30)", 
      content: "Protects the rights of minorities to conserve their culture, language, and script, and to establish and administer educational institutions of their choice." 
    },
    { 
      title: "Right to Constitutional Remedies (Article 32)", 
      content: "Guarantees the right to move the Supreme Court for the enforcement of fundamental rights and empowers the court to issue directions or orders or writs for this purpose." 
    },
  ];

  const fundamentalDuties = [
    "To abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem.",
    "To cherish and follow the noble ideals which inspired our national struggle for freedom.",
    "To uphold and protect the sovereignty, unity and integrity of India.",
    "To defend the country and render national service when called upon to do so.",
    "To promote harmony and the spirit of common brotherhood amongst all the people of India.",
    "To value and preserve the rich heritage of our composite culture.",
    "To protect and improve the natural environment including forests, lakes, rivers and wild life.",
    "To develop the scientific temper, humanism and the spirit of inquiry and reform.",
    "To safeguard public property and to abjure violence.",
    "To strive towards excellence in all spheres of individual and collective activity.",
    "To provide opportunities for education to his child or ward between the age of six and fourteen years."
  ];


  return (
    <>
      <section className="relative w-full bg-background pt-20 md:pt-32 lg:pt-40 overflow-hidden">
        <div className="container flex min-h-[calc(80vh-15rem)] flex-col items-center justify-center text-center">
          
          <div className="w-32 h-32 mb-6 text-primary">
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
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/case-submission">
                {t('home.registerCaseButton')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ai-legal-guide">
                {t('home.aiAdviceButton')} <Bot className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="preamble" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
                  <Gavel className="h-8 w-8" />
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">The Preamble of India</h2>
                 <Card className="max-w-3xl mx-auto p-6 md:p-8 mt-6 bg-background/50 border-primary/20 shadow-lg">
                    <CardContent className="p-0">
                        <p className="whitespace-pre-wrap text-left text-base md:text-lg leading-relaxed text-foreground/80 font-serif">
                            {preambleText}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <section id="fundamental-rights" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
                    <Shield className="h-8 w-8" />
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Fundamental Rights</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    The Fundamental Rights, enshrined in Part III of the Constitution, guarantee civil liberties to all Indians, ensuring a life of dignity and equality.
                </p>
            </div>
            <div className="mx-auto max-w-3xl mt-8">
              <Accordion type="single" collapsible className="w-full">
                {fundamentalRights.map((right, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="font-headline text-lg hover:no-underline">{right.title}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {right.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
        </div>
      </section>

      <section id="fundamental-duties" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
                    <CheckSquare className="h-8 w-8" />
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Fundamental Duties</h2>
                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    These are the moral obligations of all citizens to help promote a spirit of patriotism and to uphold the unity of India.
                </p>
            </div>
             <div className="mx-auto max-w-3xl mt-8">
                <Card className="bg-background/50 border-primary/20 shadow-lg">
                    <CardContent className="p-6">
                        <ul className="space-y-4 list-disc list-inside text-left text-base text-foreground/80">
                            {fundamentalDuties.map((duty, index) => (
                                <li key={index}>{duty}</li>
                            ))}
                        </ul>
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
                        <Link href={feature.href} className="flex items-center font-semibold text-primary transition-colors hover:text-accent">
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
