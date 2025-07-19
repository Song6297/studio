
'use client';
import { AshokaChakraWithText } from '@/components/icons/emblem';
import { Logo } from '@/components/icons/logo';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-8">
        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {t('footer.brandName')}. {t('footer.rightsReserved')}.
            </p>
            <p className="mt-2 text-xs text-muted-foreground max-w-lg">
              {t('footer.disclaimer')}
            </p>
          </div>
          <AshokaChakraWithText />
        </div>
      </div>
    </footer>
  );
}
