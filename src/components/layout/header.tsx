'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, BookOpen, FileText, LayoutDashboard, Home, Menu, UserPlus } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/case-submission', label: 'Submit Case', icon: FileText },
  { href: '/legal-awareness', label: 'Legal Awareness', icon: BookOpen },
  { href: '/register', label: 'Register', icon: UserPlus },
  { href: '/ai-legal-guide', label: 'AI Legal Guide', icon: Bot },
];

export function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) => (
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'flex items-center gap-2 transition-colors hover:text-primary',
          pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground',
          isMobile ? 'text-lg p-2 rounded-md hover:bg-secondary' : 'text-sm font-medium'
        )}
      >
        <link.icon className="h-5 w-5" />
        {link.label}
      </Link>
    ))
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="My Legal Firm Home Page">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {renderNavLinks()}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <Link href="/" aria-label="My Legal Firm Home Page">
                  <Logo />
                </Link>
              </div>
              <nav className="mt-4 flex flex-col gap-4 px-4">
                {renderNavLinks(true)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
