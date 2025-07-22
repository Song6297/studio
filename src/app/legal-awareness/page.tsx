
'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import { useState, useEffect } from "react";

export default function LegalAwarenessPage() {
    const { t } = useLanguage();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const articles = [
        {
            slug: 'onlineFraud',
            title: t('legalAwareness.articles.onlineFraud.title'),
            description: t('legalAwareness.articles.onlineFraud.description'),
            category: t('legalAwareness.articles.onlineFraud.category'),
            image: "https://placehold.co/600x400.png",
            hint: "credit card security"
        },
        {
            slug: 'dataPrivacy',
            title: t('legalAwareness.articles.dataPrivacy.title'),
            description: t('legalAwareness.articles.dataPrivacy.description'),
            category: t('legalAwareness.articles.dataPrivacy.category'),
            image: "https://placehold.co/600x400.png",
            hint: "digital lock"
        },
        {
            slug: 'cyberbullying',
            title: t('legalAwareness.articles.cyberbullying.title'),
            description: t('legalAwareness.articles.cyberbullying.description'),
            category: t('legalAwareness.articles.cyberbullying.category'),
            image: "https://placehold.co/600x400.png",
            hint: "social media harassment"
        },
        {
            slug: 'consumerRights',
            title: t('legalAwareness.articles.consumerRights.title'),
            description: t('legalAwareness.articles.consumerRights.description'),
            category: t('legalAwareness.articles.consumerRights.category'),
            image: "https://placehold.co/600x400.png",
            hint: "shopping cart receipt"
        },
        {
            slug: 'propertyDisputes',
            title: t('legalAwareness.articles.propertyDisputes.title'),
            description: t('legalAwareness.articles.propertyDisputes.description'),
            category: t('legalAwareness.articles.propertyDisputes.category'),
            image: "https://placehold.co/600x400.png",
            hint: "house blueprint gavel"
        },
        {
            slug: 'intellectualProperty',
            title: t('legalAwareness.articles.intellectualProperty.title'),
            description: t('legalAwareness.articles.intellectualProperty.description'),
            category: t('legalAwareness.articles.intellectualProperty.category'),
            image: "https://placehold.co/600x400.png",
            hint: "lightbulb gears"
        },
    ];

    if (!isMounted) {
        return null;
    }

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('legalAwareness.title')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">{t('legalAwareness.description')}</p>
            </div>
            <div className="relative my-8 mx-auto max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder={t('legalAwareness.searchPlaceholder')} className="pl-10" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                        <Image src={article.image} alt={article.title} width={600} height={400} className="h-48 w-full object-cover" data-ai-hint={article.hint}/>
                        <CardHeader>
                            <Badge variant="secondary" className="w-fit">{article.category}</Badge>
                            <CardTitle className="mt-2 font-headline">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <CardDescription>{article.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                           <Link href={`/legal-awareness/article?topic=${article.slug}`} className="font-semibold text-primary hover:text-accent">{t('legalAwareness.readMore')} &rarr;</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
