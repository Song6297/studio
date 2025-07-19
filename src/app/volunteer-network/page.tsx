
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Handshake, Search } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VolunteerNetworkPage() {
    const { t } = useLanguage();

    const volunteers = [
        {
            name: "Ananya Sharma",
            bio: "Final year law student specializing in criminal law. Eager to assist with legal research and case summaries.",
            skills: ["Legal Research", "Criminal Law", "Case Analysis"],
            image: "https://placehold.co/400x400.png",
            hint: "woman portrait"
        },
        {
            name: "Rohan Verma",
            bio: "Paralegal with 2 years of experience in a corporate law firm. Skilled in contract drafting and review.",
            skills: ["Contract Drafting", "Corporate Law", "Due Diligence"],
            image: "https://placehold.co/400x400.png",
            hint: "man portrait"
        },
        {
            name: "Priya Singh",
            bio: "Law student passionate about human rights. Available for pro-bono case evaluation and documentation.",
            skills: ["Human Rights", "Documentation", "Client Interviewing"],
            image: "https://placehold.co/400x400.png",
            hint: "woman professional"
        },
        {
            name: "Vikram Reddy",
            bio: "Recent law graduate with a focus on property law. Available for drafting legal notices and research.",
            skills: ["Property Law", "Legal Drafting", "Research"],
            image: "https://placehold.co/400x400.png",
            hint: "man professional"
        },
         {
            name: "Sunita Rao",
            bio: "Experienced paralegal with a background in family law. Can assist with drafting petitions and affidavits.",
            skills: ["Family Law", "Petition Drafting", "Affidavits"],
            image: "https://placehold.co/400x400.png",
            hint: "woman smiling"
        },
        {
            name: "Amit Patel",
            bio: "Law student with an interest in intellectual property. Ready to help with trademark searches and documentation.",
            skills: ["IP Law", "Trademark Search", "Legal Research"],
            image: "https://placehold.co/400x400.png",
            hint: "man glasses"
        },
    ];

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center">
                <Handshake className="h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('volunteerNetwork.title')}</h1>
                <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{t('volunteerNetwork.description')}</p>
            </div>
            <div className="relative my-8 mx-auto max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder={t('volunteerNetwork.searchPlaceholder')} className="pl-10" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {volunteers.map((volunteer, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                        <CardHeader className="items-center text-center">
                            <Image src={volunteer.image} alt={volunteer.name} width={128} height={128} className="rounded-full border-4 border-primary/10" data-ai-hint={volunteer.hint}/>
                            <CardTitle className="mt-4 font-headline">{volunteer.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <CardDescription className="text-center">{volunteer.bio}</CardDescription>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {volunteer.skills.map(skill => (
                                     <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button className="w-full">{t('volunteerNetwork.contactButton')}</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
