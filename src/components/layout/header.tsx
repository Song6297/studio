
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
import { useState } from 'react';

const navLinks = [
  { href: '/case-submission', label: 'Register Case' },
  { href: '/legal-awareness', label: 'Awareness' },
  { href: '/ai-legal-guide', label: 'AI Legal Advice' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ml', name: 'മലയാളം' },
]

export function Header() {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState(languages[0]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/" aria-label="My Legal Firm Home Page" className="flex items-center gap-4">
              <Logo />
               <p className="font-headline text-sm font-bold text-primary hidden sm:block" lang="kn">ಸತ್ಯಮೇವ ಜಯತೆ</p>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
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
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                   <DropdownMenuItem key={lang.code} onSelect={() => setCurrentLang(lang)}>
                      {lang.name}
                   </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost">
                <Link href="/register">Log In</Link>
            </Button>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Register</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/register?type=advocate">As Advocate/Legal Adviser</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register?type=ngo">As NGO</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
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
                        <DropdownMenuItem key={lang.code} onSelect={() => setCurrentLang(lang)}>
                            {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="mt-2">Register / Log In</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/register">Log In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=advocate">Register as Advocate</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=ngo">Register as NGO</Link>
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
