
'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ArticleContent() {
    const searchParams = useSearchParams();
    const topic = searchParams.get('topic');
    const { t } = useLanguage();

    const articleKey = `legalAwareness.articles.${topic}`;
    const article = {
        title: t(`${articleKey}.title`),
        category: t(`${articleKey}.category`),
        explanation: t(`${articleKey}.explanation`, { returnObjects: true }) as unknown as { heading: string, text: string }[] || []
    };
    
    if (!topic || !article.title || article.title.startsWith('legalAwareness.')) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Article Not Found</h2>
                <p className="text-muted-foreground mt-2">The topic you are looking for does not exist.</p>
                <Button asChild className="mt-4">
                    <Link href="/legal-awareness">Back to Awareness Portal</Link>
                </Button>
            </div>
        );
    }
    
    return (
        <Card className="mx-auto max-w-4xl bg-card/90 backdrop-blur-sm">
            <CardHeader>
                <p className="text-sm font-semibold text-primary">{article.category}</p>
                <CardTitle className="font-headline text-4xl md:text-5xl">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                {Array.isArray(article.explanation) && article.explanation.map((section, index) => (
                    <div key={index}>
                        <h3 className="font-headline text-2xl font-semibold">{section.heading}</h3>
                        <p className="text-foreground/80">{section.text}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default function ArticlePage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12">
                <BookOpen className="h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Legal Awareness</h1>
            </div>
            <Suspense fallback={<div className="text-center">Loading article...</div>}>
                <ArticleContent />
            </Suspense>
        </div>
    );
}
