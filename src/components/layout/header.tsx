
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Languages, Globe, LogOut, Building, LayoutDashboard as DashboardIcon, User, PenSquare } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { useLanguage, languages } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, setLanguage, currentLang } = useLanguage();
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [dashboardLinks, setDashboardLinks] = useState([
    { href: '/case-status/demo', label: t('header.dashboards.citizen') },
    { href: '/advocate-dashboard/demo', label: t('header.dashboards.advocate') },
    { href: '/ngo-dashboard/demo', label: t('header.dashboards.ngo') },
    { href: '/law-firm-dashboard/demo', label: t('header.dashboards.lawFirm') },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    setDashboardLinks([
      { href: user ? '/dashboard' : '/case-status/demo', label: t('header.dashboards.citizen') },
      { href: '/advocate-dashboard/demo', label: t('header.dashboards.advocate') },
      { href: user ? '/ngo-dashboard' : '/ngo-dashboard/demo', label: t('header.dashboards.ngo') },
      { href: '/law-firm-dashboard/demo', label: t('header.dashboards.lawFirm') },
    ]);
  }, [user, t]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
    router.refresh();
  };
  
  const navLinks = [
    { href: '/case-submission', label: t('header.registerCase') },
    { href: '/case-status', label: t('header.caseStatus') },
    { href: '/file-rti', label: t('header.fileRti') },
    { href: '/legal-services', label: t('header.legalServices') },
    { href: '/document-services', label: t('header.documentServices') },
    { href: '/legal-awareness', label: t('header.awareness') },
    { href: '/volunteer-network', label: t('header.volunteerNetwork') },
    { href: '/law-aspirants', label: t('header.lawAspirants') },
  ];
  
  const linksToShow = user ? navLinks : navLinks;

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
            <div className="flex items-center gap-6 flex-1">
              <Link href="/" aria-label="Satyameva Jayate Home Page" className="flex items-center gap-4">
                  <Logo />
              </Link>
            </div>
        </div>
      </header>
    );
  }
  
  const renderNavLinks = (isMobile = false) => {
    const commonLinkClass = isMobile 
        ? 'flex items-center gap-2 rounded-md p-3 text-lg font-medium transition-colors hover:bg-secondary'
        : 'text-sm font-medium transition-colors hover:text-primary';
    const activeLinkClass = isMobile ? 'bg-secondary text-primary' : 'text-primary';
    const inactiveLinkClass = isMobile ? 'text-muted-foreground' : 'text-muted-foreground';

    const dashboardDropdownTriggerClass = isMobile ? 'justify-between w-full' : '';

    return (
        <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={isMobile ? "outline" : "ghost"} className={cn(
                    isMobile ? dashboardDropdownTriggerClass : commonLinkClass,
                    pathname.startsWith('/dashboard') || pathname.startsWith('/ngo-dashboard') || pathname.startsWith('/law-firm-dashboard') || pathname.startsWith('/advocate-dashboard') ? activeLinkClass : inactiveLinkClass
                )}>
                  {t('header.dashboards.title')}
                  {isMobile && <DashboardIcon className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dashboardLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} onClick={() => isMobile && setIsSheetOpen(false)}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {linksToShow.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => isMobile && setIsSheetOpen(false)}
                  className={cn(commonLinkClass, pathname === link.href ? activeLinkClass : inactiveLinkClass)}
                >
                  {link.label}
                </Link>
              ))}
        </>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-6 flex-1">
            <Link href="/" aria-label="Satyameva Jayate Home Page" className="hidden md:flex items-center gap-4">
              <Logo />
            </Link>
            <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
              {renderNavLinks()}
            </nav>
        </div>
        
        <div className="md:hidden flex-1">
          <Link href="/" aria-label="Satyameva Jayate Home Page">
              <Logo />
          </Link>
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
            
            {loading ? null : user ? (
                <Button onClick={handleLogout} variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('header.logout')}
                </Button>
            ) : (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>{t('header.registerLogin')}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 <DropdownMenuItem asChild>
                  <Link href="/register?type=login">{t('header.login')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register?type=citizen">Citizen</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/register?type=advocate">{t('header.registerAsAdvocate')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register?type=ngo">{t('header.registerAsNgo')}</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/register?type=lawFirm">Law Firm</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register?type=volunteer">{t('header.registerAsVolunteer')}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )}
        </div>

        <div className="md:hidden ml-auto">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('header.toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
               <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <div className="p-4 border-b">
                <Link href="/" aria-label="Satyameva Jayate Home Page" onClick={() => setIsSheetOpen(false)}>
                  <Logo />
                </Link>
              </div>
              <nav className="mt-4 flex flex-col gap-2 p-4">
                 {renderNavLinks(true)}
                <div className="border-t my-4"></div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="justify-between w-full">
                        <span>{currentLang.name}</span>
                        <Languages className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {languages.map((lang) => (
                        <DropdownMenuItem key={lang.code} onSelect={() => {setLanguage(lang.code);}}>
                            {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                {loading ? null : user ? (
                    <Button onClick={() => { handleLogout(); setIsSheetOpen(false); }} className="mt-2 w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('header.logout')}
                    </Button>
                ) : (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="mt-2 w-full">{t('header.registerLogin')}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=login" onClick={() => setIsSheetOpen(false)}>{t('header.login')}</Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="/register?type=citizen" onClick={() => setIsSheetOpen(false)}>Citizen</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=advocate" onClick={() => setIsSheetOpen(false)}>{t('header.registerAsAdvocate')}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=ngo" onClick={() => setIsSheetOpen(false)}>{t('header.registerAsNgo')}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=lawFirm" onClick={() => setIsSheetOpen(false)}>Law Firm</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register?type=volunteer" onClick={() => setIsSheetOpen(false)}>{t('header.registerAsVolunteer')}</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
