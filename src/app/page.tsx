import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmblemOfIndia } from '@/components/icons/emblem';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <section className="relative bg-background">
        <div className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 dark:opacity-10">
              <EmblemOfIndia />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
            Justice, Rights, and Support
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            A unified platform connecting citizens with legal professionals and NGOs to ensure access to justice for all.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/case-submission">
                Submit a Case <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/ai-legal-guide">AI Legal Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="preamble" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container">
          <Card className="max-w-3xl mx-auto shadow-lg border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl text-center text-primary">
                The Preamble of the Constitution of India
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center text-base md:text-lg leading-relaxed">
              <p>
                <span className="font-bold uppercase">WE, THE PEOPLE OF INDIA,</span> having solemnly resolved to constitute India into a{' '}
                <span className="font-semibold text-accent-foreground uppercase">SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC</span> and to secure to all its citizens:
              </p>
              <p className="font-medium">
                <span className="font-semibold text-accent-foreground uppercase">JUSTICE</span>, social, economic and political;
                <br />
                <span className="font-semibold text-accent-foreground uppercase">LIBERTY</span> of thought, expression, belief, faith and worship;
                <br />
                <span className="font-semibold text-accent-foreground uppercase">EQUALITY</span> of status and of opportunity; and to promote among them all
              </p>
              <p>
                <span className="font-semibold text-accent-foreground uppercase">FRATERNITY</span> assuring the dignity of the individual and the unity and integrity of the Nation;
              </p>
              <p className="font-bold">
                IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do{' '}
                <span className="uppercase">HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
