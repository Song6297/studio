
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Gavel, Shield, CheckSquare, Scale, History } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function IndianConstitutionPage() {
    const { t } = useLanguage();

    const preambleText = "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:\n\nJUSTICE, social, economic and political;\nLIBERTY of thought, expression, belief, faith and worship;\nEQUALITY of status and of opportunity;\nand to promote among them all\nFRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;\n\nIN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.";

    const fundamentalRights = [
        { 
            title: "Right to Equality (Articles 14-18)", 
            content: [
                { article: "Article 14", text: "Guarantees equality before the law and equal protection of the laws within the territory of India." },
                { article: "Article 15", text: "Prohibits discrimination against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them." },
                { article: "Article 16", text: "Ensures equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State." },
                { article: "Article 17", text: "Abolishes 'Untouchability' and forbids its practice in any form." },
                { article: "Article 18", text: "Abolishes all titles except military and academic distinctions." }
            ]
        },
        { 
            title: "Right to Freedom (Articles 19-22)", 
            content: [
                { article: "Article 19", text: "Protects six rights: freedom of speech and expression, assembly, association, movement, residence, and profession." },
                { article: "Article 20", text: "Provides protection in respect of conviction for offenses, including protection against ex-post-facto law, double jeopardy, and self-incrimination." },
                { article: "Article 21", text: "Guarantees the protection of life and personal liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law." },
                { article: "Article 21A", text: "Makes free and compulsory education for children between the age of six and fourteen years a fundamental right." },
                { article: "Article 22", text: "Provides protection against arrest and detention in certain cases." }
            ]
        },
        { 
            title: "Right against Exploitation (Articles 23-24)", 
            content: [
                { article: "Article 23", text: "Prohibits traffic in human beings and 'begar' and other similar forms of forced labor." },
                { article: "Article 24", text: "Prohibits the employment of children below the age of fourteen years in any factory, mine or other hazardous activities." }
            ]
        },
        { 
            title: "Right to Freedom of Religion (Articles 25-28)", 
            content: [
                { article: "Article 25", text: "Guarantees freedom of conscience and free profession, practice, and propagation of religion to all citizens." },
                { article: "Article 26", text: "Gives every religious denomination the right to establish and maintain institutions for religious and charitable purposes." },
                { article: "Article 27", text: "States that no person shall be compelled to pay any taxes for the promotion of a particular religion." },
                { article: "Article 28", text: "Allows educational institutions maintained by religious groups to disseminate religious instruction." }
            ]
        },
        { 
            title: "Cultural and Educational Rights (Articles 29-30)", 
            content: [
                { article: "Article 29", text: "Protects the interests of minorities by ensuring that they can conserve their distinct language, script or culture." },
                { article: "Article 30", text: "Grants minorities the right to establish and administer educational institutions of their choice." }
            ]
        },
        { 
            title: "Right to Constitutional Remedies (Article 32)", 
            content: [
                { article: "Article 32", text: "Guarantees the right to move the Supreme Court for the enforcement of Fundamental Rights. The Supreme Court is empowered to issue writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto) for this purpose. Dr. B.R. Ambedkar called it the 'heart and soul' of the Constitution." }
            ]
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

    const historyOfConstitution = {
        title: "History of the Constitution",
        description: "A brief history of the framing of the Indian Constitution.",
        content: [
            { point: "Why:", text: "After gaining independence in 1947, India needed a new constitution to govern the newly formed nation, replacing the colonial-era Government of India Act of 1935. The goal was to establish a sovereign, democratic republic with a framework for political structure, procedures, powers, and duties of government institutions, while also outlining fundamental rights and duties for its citizens." },
            { point: "Who & Where:", text: "The task was entrusted to the Constituent Assembly of India, which was elected by the provincial assemblies. It comprised 389 members, later reduced to 299 after the partition of India. The Assembly met in the Constitution Hall (now the Central Hall of Parliament House) in New Delhi." },
            { point: "How:", text: "The Assembly formed various committees to work on different aspects of the constitution. The most crucial was the Drafting Committee, with Dr. B. R. Ambedkar as its chairman. The committee prepared a draft constitution, which was then debated, discussed, and amended over a period of nearly three years." },
            { point: "When:", text: "The Constituent Assembly held its first session on December 9, 1946. After 2 years, 11 months, and 18 days, the Constitution was adopted on November 26, 1949. It came into full effect on January 26, 1950, a day now celebrated as Republic Day in India." },
            { point: "What:", text: "The result was the longest written constitution of any country in the world. It is a comprehensive document that lays down the framework for a federal parliamentary system of government, while guaranteeing fundamental rights and establishing a system of checks and balances." }
        ]
    };


    return (
        <div className="container py-12 md:py-16">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <div className="inline-block rounded-full bg-background p-4 shadow-md border border-primary/10">
                    <Scale className="h-10 w-10 text-primary" />
                </div>
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    {t('indianConstitution.title')}
                </h1>

                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    {t('indianConstitution.description')}
                </p>
            </div>
            
            <div className="mx-auto max-w-6xl mt-8">
                <div className="bg-card shadow-2xl rounded-lg flex flex-col md:flex-row min-h-[600px]">
                    
                    <div className="w-full md:w-1/2 p-6 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-primary/20 relative">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] opacity-5 dark:opacity-10 -z-10">
                            <Gavel />
                        </div>
                        <section id="preamble" className="h-full flex flex-col items-center text-center">
                            <Gavel className="h-16 w-16 text-primary/80 mb-4" />
                            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-6">{t('indianConstitution.preamble.title')}</h2>
                            <div className="flex-1 overflow-y-auto">
                                <Card className="p-6 md:p-8 bg-transparent border-none shadow-none">
                                    <CardContent className="p-0">
                                        <p className="whitespace-pre-wrap text-left text-base md:text-lg leading-relaxed text-foreground/80 font-serif">
                                            {preambleText}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>

                    <div className="w-full md:w-1/2 p-6 md:p-10 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] opacity-5 dark:opacity-10 -z-10">
                            <Shield />
                        </div>
                        <div className="space-y-8 h-full flex flex-col overflow-y-auto">
                            <section id="history">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
                                        <History className="h-6 w-6" />
                                    </div>
                                    <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">{historyOfConstitution.title}</h2>
                                </div>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="history-item">
                                        <AccordionTrigger className="font-headline text-lg hover:no-underline">{historyOfConstitution.description}</AccordionTrigger>
                                        <AccordionContent className="text-base text-muted-foreground">
                                            <ul className="space-y-4 list-disc list-inside">
                                                {historyOfConstitution.content.map((item, index) => (
                                                    <li key={index}>
                                                        <span className="font-semibold text-foreground/90">{item.point}</span> {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <section id="fundamental-rights">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">{t('indianConstitution.fundamentalRights.title')}</h2>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {t('indianConstitution.fundamentalRights.description')}
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    {fundamentalRights.map((right, index) => (
                                        <AccordionItem value={`item-${index}`} key={index}>
                                            <AccordionTrigger className="font-headline text-lg hover:no-underline">{right.title}</AccordionTrigger>
                                            <AccordionContent className="text-base text-muted-foreground">
                                            <ul className="space-y-3 list-disc list-inside">
                                                {right.content.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <span className="font-semibold text-foreground/90">{item.article}:</span> {item.text}
                                                </li>
                                                ))}
                                            </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </section>

                            <section id="fundamental-duties">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
                                        <CheckSquare className="h-6 w-6" />
                                    </div>
                                    <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">{t('indianConstitution.fundamentalDuties.title')}</h2>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4">
                                {t('indianConstitution.fundamentalDuties.description')}
                                </p>
                                 <Card className="bg-transparent border-none shadow-none">
                                    <CardContent className="p-0">
                                        <ul className="space-y-2 list-disc list-inside text-left text-sm text-foreground/80">
                                            {fundamentalDuties.map((duty, index) => (
                                                <li key={index}>{duty}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

    