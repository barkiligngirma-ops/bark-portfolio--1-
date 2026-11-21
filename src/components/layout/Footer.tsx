import React from 'react';
import { ArrowUp } from 'lucide-react';
import type { NavSectionId } from './Navbar';

interface FooterProps {
  onSelectSection: (section: NavSectionId) => void;
}

const FOOTER_LINKS: { id: NavSectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'project', label: 'Project' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const Footer: React.FC<FooterProps> = ({ onSelectSection }) => {
  return (
    <footer className="relative z-10 border-t border-slate-200/75 dark:border-sky-400/15 bg-white/50 dark:bg-[#020817]/55 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 lg:px-14 py-7">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          
          +251938290883    © {new Date().getFullYear()} Barkilign. All rights reserved.
        </p>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-5">
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onSelectSection(link.id)}
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-300 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => onSelectSection('home')}
          aria-label="Back to top"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};
