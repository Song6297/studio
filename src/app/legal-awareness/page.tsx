import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const articles = [
    {
        title: "Understanding Your Basic Rights in India",
        description: "A comprehensive guide to the fundamental rights guaranteed by the Constitution of India.",
        category: "Constitutional Law",
        image: "https://placehold.co/600x400.png",
        hint: "law book"
    },
    {
        title: "The Process of Filing a First Information Report (FIR)",
        description: "Step-by-step instructions on how to file an FIR and what to expect during the process.",
        category: "Criminal Law",
        image: "https://placehold.co/600x400.png",
        hint: "police station"
    },
    {
        title: "Navigating Property Purchase: Legal Checklist",
        description: "Key legal aspects to consider before buying a property to avoid future disputes.",
        category: "Property Law",
        image: "https://placehold.co/600x400.png",
        hint: "house keys"
    },
    {
        title: "Consumer Rights and Protection in India",
        description: "Know your rights as a consumer and how to seek redressal for grievances.",
        category: "Consumer Law",
        image: "https://placehold.co/600x400.png",
        hint: "shopping cart"
    },
    {
        title: "Introduction to Public Interest Litigation (PIL)",
        description: "Learn how PIL can be used as a tool for social change and public justice.",
        category: "Public Law",
        image: "https://placehold.co/600x400.png",
        hint: "crowd protest"
    },
    {
        title: "Digital Signature and its Legal Validity",
        description: "Understanding the legal framework around electronic signatures in the digital age.",
        category: "Cyber Law",
        image: "https://placehold.co/600x400.png",
        hint: "digital signature"
    }
];

export default function LegalAwarenessPage() {
    return (
        <div className="container py-12">
            <div className="flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Legal Awareness Portal</h1>
                <p className="mt-2 text-lg text-muted-foreground">Empowering citizens with legal knowledge.</p>
            </div>
            <div className="relative my-8 mx-auto max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                        <Image src={article.image} alt={article.title} width={600} height={400} className="h-48 w-full object-cover" data-ai-hint={article.hint}/>
                        <CardHeader>
                            <Badge variant="secondary" className="w-fit">{article.category}</Badge>
                            <CardTitle className="mt-2 font-headline">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <CardDescription>{article.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                           <Link href="#" className="font-semibold text-primary hover:text-accent">Read More &rarr;</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
