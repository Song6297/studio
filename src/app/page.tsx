
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AshokaChakraIcon } from '@/components/icons/emblem';
import { ArrowRight, BookOpen, FileText, Bot, PenSquare, Scale } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: "Register a Case",
    description: "Easily register your legal case with our simple and secure online form. Get connected with professionals who can help.",
    href: "/case-submission",
    cta: "Register Your Case",
  },
  {
    icon: Bot,
    title: "AI Legal Advice",
    description: "Get preliminary legal information and guidance on various topics from our AI-powered assistant, available 24/7.",
    href: "/ai-legal-guide",
    cta: "Ask AI Legal Advice",
  },
  {
    icon: BookOpen,
    title: "Legal Awareness",
    description: "Empower yourself with knowledge. Browse our portal of articles and guides on Indian law and your rights.",
    href: "/legal-awareness",
    cta: "Explore Portal",
  },
  {
    icon: PenSquare,
    title: "Affidavit Services",
    description: "Create and validate legally binding affidavits for various purposes with professional assistance.",
    href: "#",
    cta: "Get Affidavit",
  },
  {
    icon: Scale,
    title: "Notary Services",
    description: "Get your important documents notarized quickly and securely by certified professionals.",
    href: "#",
    cta: "Notarize Document",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative w-full bg-background">
        <div className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] opacity-5 dark:opacity-10">
              <AshokaChakraIcon />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Justice, Rights, and Support
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            A unified platform connecting citizens with legal professionals and NGOs to ensure access to justice for all.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/case-submission">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/ai-legal-guide">AI Legal Advice</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Services</div>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Your Gateway to Legal Solutions</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We provide a comprehensive suite of services to address your legal needs, from case submission to AI-powered guidance and document services.
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
