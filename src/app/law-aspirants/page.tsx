
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookCopy, University, Target, Calendar, Award } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function LawAspirantsPage() {
    const { t } = useLanguage();

    const exams = t('lawAspirants.exams.list', { returnObjects: true }) as unknown as { name: string, fullName: string, description: string, application: string, examDate: string }[];
    const colleges = t('lawAspirants.colleges.list', { returnObjects: true }) as unknown as { name: string, location: string, description: string, fees: string, eligibility: string }[];

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12">
                <BookCopy className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{t('lawAspirants.title')}</h1>
                <p className="mt-2 text-lg text-muted-foreground max-w-3xl">{t('lawAspirants.description')}</p>
            </div>

            {/* Law Entrance Exams Section */}
            <section id="exams" className="mb-16">
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-center mb-8">{t('lawAspirants.exams.title')}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.isArray(exams) && exams.map((exam, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-headline text-xl">{exam.name}</CardTitle>
                                        <CardDescription>{exam.fullName}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <p className="text-sm text-muted-foreground">{exam.description}</p>
                                <div className="text-sm space-y-2">
                                    <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" /> 
                                        <strong>{t('lawAspirants.exams.application')}:</strong> {exam.application}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <strong>{t('lawAspirants.exams.examDate')}:</strong> {exam.examDate}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Top Law Colleges Section */}
            <section id="colleges">
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-center mb-8">{t('lawAspirants.colleges.title')}</h2>
                <div className="space-y-6">
                    {Array.isArray(colleges) && colleges.map((college, index) => (
                        <Card key={index} className="overflow-hidden">
                            <div className="md:flex">
                                <div className="p-6 flex-1">
                                    <CardHeader className="p-0 mb-4">
                                        <div className="flex items-start justify-between">
                                           <div>
                                                <CardTitle className="font-headline text-xl">{college.name}</CardTitle>
                                                <CardDescription className="flex items-center gap-2 mt-1">
                                                    <University className="h-4 w-4" /> {college.location}
                                                </CardDescription>
                                           </div>
                                            <Badge variant="secondary">{t('lawAspirants.colleges.affordable')}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <p className="text-sm text-muted-foreground mb-4">{college.description}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <h4 className="font-semibold mb-1">{t('lawAspirants.colleges.fees')}</h4>
                                                <p>{college.fees}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">{t('lawAspirants.colleges.eligibility')}</h4>
                                                <p>{college.eligibility}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

        </div>
    );
}
