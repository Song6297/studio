
'use client';

import { useLanguage } from '@/context/language-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LegalServicesPage() {
    const { t } = useLanguage();
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard');
    }, [router]);

    return (
        <div className="container py-12 md:py-24">
           <p className="text-center">Redirecting...</p>
        </div>
    );
}

    