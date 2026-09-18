import type { ReactNode } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/* ------------------------------------------------------------------ */
/*  Clean SVG Icon Components                                          */
/* ------------------------------------------------------------------ */
function IconGetStarted(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}

function IconDevelop(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconConnectors(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconGenAI(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z" />
      <path d="M20 16l.62 1.88L22.5 18.5l-1.88.62L20 21l-.62-1.88L17.5 18.5l1.88-.62L20 16z" />
    </svg>
  );
}

function IconWorkflows(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function IconTutorials(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconDeploy(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function IconReference(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconManage(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Data                                                       */
/* ------------------------------------------------------------------ */
type SectionCard = {
  title: string;
  description: string;
  link: string;
  icon: ReactNode;
  iconBg: string;
  iconBgDark: string;
  iconColor: string;
};

const sections: SectionCard[] = [
  {
    title: 'Get started',
    description: 'Install, set up, and build your first integration in under 10 minutes.',
    link: '/get-started/introduction',
    icon: <IconGetStarted />,
    iconBg: '#ECFDF5',
    iconBgDark: 'rgba(5, 150, 105, 0.15)',
    iconColor: '#059669',
  },
  {
    title: 'Develop',
    description: 'Build services, transform data, and test integrations on your machine.',
    link: '/develop/overview',
    icon: <IconDevelop />,
    iconBg: '#EFF6FF',
    iconBgDark: 'rgba(37, 99, 235, 0.15)',
    iconColor: '#2563EB',
  },
  {
    title: 'Connectors',
    description: 'Browse pre-built connectors for SaaS, databases, messaging, and AI.',
    link: '/connectors/overview',
    icon: <IconConnectors />,
    iconBg: '#F0EDFF',
    iconBgDark: 'rgba(124, 58, 237, 0.15)',
    iconColor: '#7C3AED',
  },
  {
    title: 'AI Integrations',
    description: 'Build AI-powered integrations with agents, RAG, and MCP servers.',
    link: '/genai/overview',
    icon: <IconGenAI />,
    iconBg: '#FDF4FF',
    iconBgDark: 'rgba(168, 85, 247, 0.15)',
    iconColor: '#A855F7',
  },
  {
    title: 'Durable Workflows',
    description: 'Build long-running, crash-safe processes with human tasks, timers, and retries.',
    link: '/workflows/overview',
    icon: <IconWorkflows />,
    iconBg: '#FFF1F2',
    iconBgDark: 'rgba(225, 29, 72, 0.15)',
    iconColor: '#E11D48',
  },
  {
    title: 'Guides',
    description: 'End-to-end tutorials and integration patterns.',
    link: '/guides/overview',
    icon: <IconTutorials />,
    iconBg: '#FFF8EB',
    iconBgDark: 'rgba(217, 119, 6, 0.15)',
    iconColor: '#D97706',
  },
  {
    title: 'Deploy',
    description: 'Docker, Kubernetes, CI/CD, observability, and production security.',
    link: '/deploy/overview',
    icon: <IconDeploy />,
    iconBg: '#ECFEFF',
    iconBgDark: 'rgba(8, 145, 178, 0.15)',
    iconColor: '#0891B2',
  },
  {
    title: 'Manage',
    description: 'Centralized control and observability via the Integration Control Plane (ICP).',
    link: '/manage/overview',
    icon: <IconManage />,
    iconBg: '#EEF2FF',
    iconBgDark: 'rgba(79, 70, 229, 0.15)',
    iconColor: '#4F46E5',
  },
  {
    title: 'Reference',
    description: 'Language reference, configuration keys, CLI commands, and error codes.',
    link: '/reference/overview',
    icon: <IconReference />,
    iconBg: '#F1F5F9',
    iconBgDark: 'rgba(100, 116, 139, 0.15)',
    iconColor: '#475569',
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-links shown when the search input is focused but empty       */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { label: 'Build an Automation', to: '/get-started/build-automation' },
  { label: 'Build an AI Agent', to: '/get-started/build-ai-agent' },
  { label: 'Build an API Integration', to: '/get-started/build-api-integration' },
  { label: 'Connector catalog', to: '/connectors/overview' },
];

/* ------------------------------------------------------------------ */
/*  Central Search Bar                                                 */
/* ------------------------------------------------------------------ */
function SearchBar(): ReactNode {
  const history = useHistory();
  const searchPath = useBaseUrl('/search');
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (e.target as HTMLElement).tagName,
        )
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query.trim()) {
        history.push(`${searchPath}?q=${encodeURIComponent(query.trim())}`);
        setFocused(false);
      }
    },
    [query, history, searchPath],
  );

  return (
    <div ref={wrapperRef} className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchIconButton} aria-label="Search">
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          aria-label="Search documentation"
        />
        <kbd className={styles.searchKbd}>/</kbd>
      </form>

      {/* Quick-links dropdown when focused and empty query */}
      {focused && !query && (
        <div className={styles.searchDropdown}>
          <p className={styles.searchDropdownLabel}>Popular pages</p>
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.searchDropdownItem}
              onClick={() => setFocused(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Banner                                                        */
/* ------------------------------------------------------------------ */
function HomepageHeader(): ReactNode {
  return (
    <header className={styles.heroBanner}>
      <div className="container">

        <Heading as="h1">WSO2 Integration Platform</Heading>
        <p className={styles.heroSubtitle}>
          Build and deploy integrations with low-code simplicity and pro-code power.
        </p>
        <SearchBar />
        <div className={styles.buttons}>
          <Link
            className={styles.heroBtn}
            to="/get-started/build-automation">
            Build your first integration
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Cards                                                      */
/* ------------------------------------------------------------------ */
function SectionCards(): ReactNode {
  return (
    <section className={styles.sectionCards}>
      <div className="container">
        <div className={styles.sectionGrid}>
          {sections.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className={styles.sectionCard}
              style={
                {
                  '--icon-bg': card.iconBg,
                  '--icon-bg-dark': card.iconBgDark,
                  '--icon-color': card.iconColor,
                } as React.CSSProperties
              }>
              <span className={styles.sectionIcon}>{card.icon}</span>
              <Heading as="h3" className={styles.sectionCardTitle}>
                {card.title}
              </Heading>
              <p className={styles.sectionCardDesc}>{card.description}</p>
              <span className={styles.sectionCardArrow}>&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  What's New banner                                                  */
/* ------------------------------------------------------------------ */
function WhatsNew(): ReactNode {
  return (
    <section className={styles.whatsNew}>
      <div className="container">
        <Link
          to="/reference/appendix/release-notes"
          className={styles.whatsNewLink}>
          <span className={styles.whatsNewBadge}>New</span>
          Check out the latest release notes
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <SectionCards />
        <WhatsNew />
      </main>
    </Layout>
  );
}
