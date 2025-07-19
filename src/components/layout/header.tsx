
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/case-submission', label: 'Register Case' },
  { href: '/legal-awareness', label: 'Awareness' },
  { href: '/ai-legal-guide', label: 'AI Legal Advice' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/" aria-label="My Legal Firm Home Page">
              <Logo />
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
                 {[...navLinks, {href: '/register', label: 'Register / Log In'}].map((link) => (
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
