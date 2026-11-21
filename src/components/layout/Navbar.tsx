import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

export type NavSectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'project'
  | 'services'
  | 'contact';

export type ThemeMode = 'dark' | 'light';

interface NavItem {
  id: NavSectionId;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'project', label: 'Project', href: '#project' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  activeSection: NavSectionId;
  theme: ThemeMode;
  onSelectSection: (section: NavSectionId) => void;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme,
  onSelectSection,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: NavSectionId
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    onSelectSection(sectionId);
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#030b1e]/85 border-b border-slate-200/80 dark:border-sky-400/18 backdrop-blur-md shadow-sm dark:shadow-[0_8px_32px_rgba(2,8,23,0.45)]'
          : 'bg-white/55 dark:bg-[#020817]/40 border-b border-slate-200/50 dark:border-sky-400/10 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-[72px] w-full max-w-7xl items-center justify-between gap-8 px-6 sm:px-10 lg:px-14">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#hero"
          onClick={(event) => handleLinkClick(event, 'home')}
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 hover:text-blue-600 dark:hover:text-sky-300 transition-colors whitespace-nowrap shrink-0"
        >
          Bark
        </a>

        {/* Zone 2: Clean single-line navigation links aligned to the right */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => handleLinkClick(event, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-blue-600 dark:text-sky-400'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-blue-600 dark:bg-sky-400 transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme switcher icon button + mobile drawer toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/80 dark:border-sky-400/25 bg-white/80 dark:bg-[#061433]/75 text-slate-800 dark:text-sky-300 hover:border-blue-500/60 dark:hover:border-sky-300/65 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-300/80 dark:border-sky-400/25 bg-white/80 dark:bg-[#061433]/75 text-slate-800 dark:text-slate-100 hover:border-blue-500/60 dark:hover:border-sky-300/65 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive mobile menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200/80 dark:border-sky-400/15 bg-white/95 dark:bg-[#030b1e]/95 backdrop-blur-lg px-6 py-4"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(event) => handleLinkClick(event, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center min-h-[44px] rounded-lg px-3 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 dark:bg-sky-400/12 text-blue-600 dark:text-sky-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-sky-400/10 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
