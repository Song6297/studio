import { AshokaChakraWithText } from '@/components/icons/emblem';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-8">
        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} My Legal Firm. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-muted-foreground max-w-lg">
              Disclaimer: The information provided on this website does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only.
            </p>
          </div>
          <AshokaChakraWithText />
        </div>
      </div>
    </footer>
  );
}
