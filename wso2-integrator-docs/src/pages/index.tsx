import type {ReactNode} from 'react';
import {useState, useEffect, useRef, useCallback} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type SectionCard = {
  title: string;
  question: string;
  description: string;
  link: string;
  icon: string;
};

const sections: SectionCard[] = [
  {
    title: 'Get Started',
    question: "I'm new \u2014 what is this and how do I begin?",
    description: 'Install, set up, and build your first integration in under 10 minutes.',
    link: '/docs/get-started',
    icon: '\u{1F680}',
  },
  {
    title: 'Develop',
    question: 'How do I build, transform, and test X?',
    description: 'Build services, transform data, and test integrations on your machine.',
    link: '/docs/develop',
    icon: '\u{1F527}',
  },
  {
    title: 'Connectors',
    question: 'Can I connect to Y?',
    description: 'Browse 200+ pre-built connectors for SaaS, databases, messaging, AI, and more.',
    link: '/docs/connectors',
    icon: '\u{1F50C}',
  },
  {
    title: 'GenAI',
    question: 'How do I build AI agents, RAG, or MCP?',
    description: 'Build AI-powered integrations with agents, RAG applications, and MCP servers.',
    link: '/docs/genai',
    icon: '\u{1F916}',
  },
  {
    title: 'Tutorials',
    question: 'Show me a complete, real example',
    description: 'End-to-end walkthroughs, integration patterns, and sample projects.',
    link: '/docs/tutorials',
    icon: '\u{1F4D6}',
  },
  {
    title: 'Deploy & Operate',
    question: 'How do I ship, run, and secure this?',
    description: 'Docker, Kubernetes, CI/CD, observability, and production security.',
    link: '/docs/deploy-operate',
    icon: '\u{2601}\u{FE0F}',
  },
  {
    title: 'Reference',
    question: "What's the exact syntax / config / API for Z?",
    description: 'Language reference, configuration keys, CLI commands, error codes.',
    link: '/docs/reference',
    icon: '\u{1F4DA}',
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-links shown when the search input is focused but empty       */
/* ------------------------------------------------------------------ */
const quickLinks = [
  {label: 'Quick Start: REST API', to: '/docs/get-started/quick-start-api'},
  {label: 'Connectors Catalog', to: '/docs/connectors'},
  {label: 'Build an AI Agent', to: '/docs/get-started/quick-start-ai-agent'},
  {label: 'Deploy to Kubernetes', to: '/docs/deploy-operate/deploy/docker-kubernetes'},
];

/* ------------------------------------------------------------------ */
/*  Central Search Bar                                                 */
/* ------------------------------------------------------------------ */
function SearchBar(): ReactNode {
  const history = useHistory();
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
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        // Navigate to search results page with query
        history.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setFocused(false);
      }
    },
    [query, history],
  );

  return (
    <div ref={wrapperRef} className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
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
        <Heading as="h1">WSO2 Integrator</Heading>
        <p className={styles.heroSubtitle}>
          Build integrations with low-code simplicity and pro-code power.
        </p>
        <SearchBar />
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/get-started/quick-start-api">
            Build your first integration &rarr;
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Seven Section Cards                                                */
/* ------------------------------------------------------------------ */
function SectionCards(): ReactNode {
  return (
    <section className={styles.sectionCards}>
      <div className="container">
        <div className={styles.sectionGrid}>
          {sections.map((card, idx) => (
            <Link key={idx} to={card.link} className={styles.sectionCard}>
              <span className={styles.sectionIcon}>{card.icon}</span>
              <Heading as="h3" className={styles.sectionCardTitle}>
                {card.title}
              </Heading>
              <p className={styles.sectionCardQuestion}>{card.question}</p>
              <p className={styles.sectionCardDesc}>{card.description}</p>
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
          to="/docs/reference/release-notes"
          className={styles.whatsNewLink}>
          <span className={styles.whatsNewBadge}>New</span>
          Check out the latest release notes &rarr;
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Home page: Search → Hero → Cards → What's New                     */
/* ------------------------------------------------------------------ */
export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
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
