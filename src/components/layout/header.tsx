
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Languages, Globe } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { useLanguage, languages } from '@/context/language-context';
import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const { t, setLanguage, currentLang } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: '/case-submission', label: t('header.registerCase') },
    { href: '/indian-constitution', label: t('header.indianConstitution') },
    { href: '/legal-awareness', label: t('header.awareness') },
    { href: '/ai-legal-guide', label: t('header.aiLegalAdvice') },
    { href: '/document-services', label: t('header.documentServices') },
    { href: '/legal-templates', label: t('header.legalTemplates') },
  ];

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
            <div className="flex items-center gap-6 flex-1">
              <Link href="/" aria-label="My Legal Firm Home Page" className="flex items-center gap-4 ml-4">
                  <Logo />
              </Link>
            </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-6 flex-1">
            <Link href="/" aria-label="My Legal Firm Home Page" className="flex items-center gap-4 ml-4">
              <Logo />
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
        </div>
        
        <div className="hidden items-center gap-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe />
                  <span className="sr-only">{t('header.changeLanguage')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                   <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)}>
                      {lang.name}
                   </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost">
                <Link href="/register">{t('header.login')}</Link>
            </Button>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>{t('header.register')}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/register?type=advocate">{t('header.registerAsAdvocate')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register?type=ngo">{t('header.registerAsNgo')}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('header.toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="p-4 border-b">
                <Link href="/" aria-label="My Legal Firm Home Page">
                  <Logo />
                </Link>
              </div>
              <nav className="mt-4 flex flex-col gap-2 p-4">
                 {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 rounded-md p-3 text-lg font-medium transition-colors hover:bg-secondary',
                        pathname === link.href ? 'bg-secondary text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                ))}
                <div className="border-t my-4"></div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="justify-between">
                        <span>{currentLang.name}</span>
                        <Languages className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {languages.map((lang) => (
                        <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)}>
                            {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="mt-2">{t('header.registerLogin')}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/register">{t('header.login')}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=advocate">{t('header.registerAsAdvocate')}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=ngo">{t('header.registerAsNgo')}</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
