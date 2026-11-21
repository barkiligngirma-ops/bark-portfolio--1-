import { useCallback, useEffect, useState } from 'react';
import { About } from './components/about/About';
import { BackgroundOverlay } from './components/background/BackgroundOverlay';
import { VideoBackground } from './components/background/VideoBackground';
import { Contact } from './components/contact/Contact';
import { Hero } from './components/hero/Hero';
import { Footer } from './components/layout/Footer';
import { Navbar, type NavSectionId, type ThemeMode } from './components/layout/Navbar';
import { Projects } from './components/projects/Projects';
import { Services } from './components/services/Services';
import { Skills } from './components/skills/Skills';

const THEME_STORAGE_KEY = 'bark-portfolio-theme';

const SECTION_DOM_IDS: Record<NavSectionId, string> = {
  home: 'hero',
  about: 'about',
  skills: 'skills',
  project: 'project',
  services: 'services',
  contact: 'contact',
};

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage read errors
  }
  return 'dark';
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [contactTopic, setContactTopic] = useState<string>('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  useEffect(() => {
    const observedEntries: { navId: NavSectionId; element: HTMLElement }[] = [];

    (Object.keys(SECTION_DOM_IDS) as NavSectionId[]).forEach((navId) => {
      const element = document.getElementById(SECTION_DOM_IDS[navId]);
      if (element) {
        observedEntries.push({ navId, element });
      }
    });

    if (observedEntries.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const topTargetId = visible[0].target.id;
        const matched = observedEntries.find((item) => item.element.id === topTargetId);
        if (matched) {
          setActiveSection(matched.navId);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    observedEntries.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleSelectSection = useCallback((section: NavSectionId) => {
    setActiveSection(section);

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const domId = SECTION_DOM_IDS[section];
    document.getElementById(domId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      setContactTopic(serviceTitle);
      handleSelectSection('contact');
    },
    [handleSelectSection]
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-clip">
      {/* Mounted exactly once at application level; never pauses or remounts */}
      <VideoBackground />
      <BackgroundOverlay />

      <Navbar
        activeSection={activeSection}
        theme={theme}
        onSelectSection={handleSelectSection}
        onToggleTheme={handleToggleTheme}
      />

      <main className="relative z-10">
        <Hero
          characterSrc="/images/bark-character.png"
          onExploreWork={() => handleSelectSection('project')}
          onContactMe={() => handleSelectSection('contact')}
        />

        <About
          onOpenContact={() => handleSelectSection('contact')}
          onBackToHero={() => handleSelectSection('home')}
        />

        <Skills />

        <Projects />

        <Services onSelectService={handleSelectService} />

        <Contact preselectedTopic={contactTopic} />
      </main>

      <Footer onSelectSection={handleSelectSection} />
    </div>
  );
}
