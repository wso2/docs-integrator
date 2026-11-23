import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import LandingHero from '@site/src/components/LandingHero';
import HeroSearch from '@site/src/components/LandingHero/HeroSearch';

import styles from './index.module.css';

/* ------------------------------------------------------------------ */
/*  Clean SVG Icon Components -- same set as saas's homepage. A few     */
/*  (IconDeploy, IconMigrate, IconObserve) are unused here; IconIcons/  */
/*  IconHomepage/IconWorkflows are unused too since those three no      */
/*  longer have cards in "Explore the scaffold" (still real docs pages, */
/*  reachable via the Explore navbar dropdown and sidebar) -- all kept  */
/*  defined rather than deleted in case a real product forking from     */
/*  this branch wants them back.                                        */
/* ------------------------------------------------------------------ */
function IconSection(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
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

function IconMigrate(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h13l-3-3M20 17H7l3 3" />
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

function IconObserve(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="M12 14l4-5" />
      <path d="M4 14h1M19 14h1M12 14v1" />
    </svg>
  );
}

function IconArrowRight(): ReactNode {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function IconIcons(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <circle cx="17.5" cy="6.5" r="3.5" />
      <path d="M3 21v-4a4 4 0 0 1 4-4h1" />
      <path d="M21 21v-4a4 4 0 0 0-4-4h-1" />
    </svg>
  );
}

function IconHomepage(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

function IconWorkflows(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M6 9v6M8.5 7.5 15.5 10.5M8.5 16.5 15.5 13.5" />
    </svg>
  );
}

function IconGetStarted(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}

function IconReference(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5h6a3 3 0 0 1 3 3v11a2.5 2.5 0 0 0-2.5-2.5H5Z" />
      <path d="M19 5h-2a3 3 0 0 0-3 3v11a2.5 2.5 0 0 1 2.5-2.5H19Z" />
    </svg>
  );
}

function IconTools(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a4 4 0 0 0-4.8 4.9L4 16.1V20h3.9l8.2-8.2A4 4 0 0 0 21 7l-3 3-2-2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Step strip -- "New to this scaffold?" section                      */
/* ------------------------------------------------------------------ */
const steps = [
  { title: 'Set up', sub: <Link to="/get-started">Download Choreo Agent Builder <span aria-hidden="true">→</span></Link> },
  { title: 'Pick a quickstart', sub: 'Choose a type below ↓', active: true },
  { title: 'Build with Copilot', sub: 'Generate, evaluate, and fix your agent' },
  { title: 'Deploy and run', sub: 'Ship your agent to Choreo Cloud' },
];

/* ------------------------------------------------------------------ */
/*  "What do you want to build?" tiles -- reuses quickLinks below,      */
/*  same sample quickstarts the hero search's dropdown also shows.      */
/* ------------------------------------------------------------------ */
type Quickstart = { title: string; description: string; to: string; icon: ReactNode };

const quickstarts: Quickstart[] = [
  {
    title: 'Build an AI Agent',
    description: 'Build an intelligent agent using LLMs and tools, and expose it via a chat interface.',
    to: '/get-started/quickstarts/build-ai-agent',
    icon: <IconGetStarted />,
  },
  {
    title: 'Build a Durable Agent',
    description: 'Build a human-in-the-loop durable agentic workflow that pauses for approval.',
    to: '/get-started/quickstarts/build-durable-agent',
    icon: <IconWorkflows />,
  },
];

/* ------------------------------------------------------------------ */
/*  Section Data -- this branch's own scaffold sections plus saas's     */
/*  Platform Overview/Get Started/Guides/Reference (copied verbatim or  */
/*  sample-filled, see each section's own docs).                        */
/* ------------------------------------------------------------------ */
type SectionCard = {
  title: string;
  description: string;
  link: string;
  icon: ReactNode;
  iconColor: string;
  tags?: string[];
};

const sections: SectionCard[] = [
  {
    title: 'Platform Overview',
    description: 'What Choreo Agent Builder is and how it fits into the Choreo Integration Platform.',
    link: '/platform-overview',
    icon: <IconManage />,
    iconColor: '#7C3AED',
  },
  {
    title: 'Editor Tour',
    description: 'Canvases, designers, panels, and Copilot -- a tour of the editor.',
    link: '/editor',
    icon: <IconWorkflows />,
    iconColor: '#9333EA',
    tags: ['Flow Canvas', 'Copilot', 'Project View'],
  },
  {
    title: 'Develop and Test',
    description: 'Create a workspace and build AI integrations: agents, MCP, RAG, and direct LLM calls.',
    link: '/develop-and-test',
    icon: <IconDevelop />,
    iconColor: '#1D4ED8',
  },
  {
    title: 'Deploy and Run',
    description: 'Deploy agents built in Choreo Agent Builder to Choreo Cloud.',
    link: '/deploy-and-run',
    icon: <IconDeploy />,
    iconColor: '#C2410C',
  },
  {
    title: 'Manage',
    description: 'Manage deployed agents.',
    link: '/manage',
    icon: <IconManage />,
    iconColor: '#15803D',
  },
  {
    title: 'Observe',
    description: 'Observe deployed agents.',
    link: '/observe',
    icon: <IconObserve />,
    iconColor: '#B91C1C',
  },
  {
    title: 'Guides',
    description: 'AI agent and MCP guides: business use cases and how-to walkthroughs.',
    link: '/guides',
    icon: <IconTutorials />,
    iconColor: '#0EA5E9',
    tags: ['How-to guides', 'Use cases', 'Tutorials'],
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-links shown when the hero search is focused but empty.        */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { label: 'Build an AI Agent', to: '/get-started/quickstarts/build-ai-agent' },
  { label: 'Build a Durable Agent', to: '/get-started/quickstarts/build-durable-agent' },
  { label: 'Platform Overview', to: '/platform-overview' },
];

/* ------------------------------------------------------------------ */
/*  Hero -- the layout is the shared LandingHero component (synced from */
/*  main); only the copy/links below are this product's own. The        */
/*  screenshots are this branch's static/img/landing/hero.png (dark)    */
/*  and hero-light-v1.0.png (light).                                    */
/* ------------------------------------------------------------------ */
function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <LandingHero
      windowTitle="Choreo Agent Builder"
      imageAlt="Choreo Agent Builder Copilot's agent creation screen"
      eyebrow="Choreo Integration Platform · Docs"
      title={siteConfig.title}
      subtitle={siteConfig.tagline}
      search={<HeroSearch quickLinks={quickLinks} />}
      cta={{ label: "Let's Get Started", to: '/get-started' }}
      secondaryCta={{ label: 'Platform Overview', to: '/platform-overview' }}
      footnote="Windows · macOS · Linux · 100% open source"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  New to this scaffold? — step strip + quickstart tiles               */
/* ------------------------------------------------------------------ */
function GetStarted(): ReactNode {
  return (
    <section className={styles.getStarted}>
      <div className={styles.getStartedHead}>
        <div className={styles.getStartedHeadText}>
          <Heading as="h2" className={styles.h2Large}>
            New to Choreo Agent Builder?
          </Heading>
          <p className={styles.lead}>Four steps, starting with a quickstart.</p>
        </div>
        <div className={styles.headLinks}>
          <Link to="/get-started/concepts">
            Key concepts <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <ol className={styles.steps} aria-label="Steps">
        {steps.map((step, i) => (
          <li key={step.title} className={`${styles.step} ${step.active ? styles.stepActive : ''}`}>
            <span className={styles.stepNum}>{i + 1}</span>
            <span className={styles.stepText}>
              <strong>{step.title}</strong>
              <span>{step.sub}</span>
            </span>
          </li>
        ))}
      </ol>

      <Heading as="h3" className={styles.h3}>
        What do you want to build?
      </Heading>
      <p className={styles.sub}>Pick a quickstart to start.</p>
      <div className={styles.tileGrid}>
        {quickstarts.map((q) => (
          <Link key={q.title} to={q.to} className={styles.tile}>
            <span className={styles.tileIcon}>{q.icon}</span>
            <span className={styles.tileText}>
              <strong>{q.title}</strong>
              <span>{q.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Explore the scaffold -- banner (2) + lifecycle grid (4) + wide      */
/*  tile (1), reusing `sections` above in the same three-tier layout    */
/*  every real product's own "Explore the platform" section uses.       */
/* ------------------------------------------------------------------ */
function Explore(): ReactNode {
  const [banner1, banner2, ...rest] = sections;
  const lifecycle = rest.slice(0, 4);
  const wide = rest.slice(4);
  const tones = ['toneInk', 'toneBlue', 'toneIndigo', 'toneTeal'];

  return (
    <section className={`${styles.cream} ${styles.explore}`}>
      <div className={styles.exploreInner}>
        <div>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDash} />
            Explore Agent Builder
          </span>
          <Heading as="h2" className={styles.h2Xl}>
            Everything from design canvas to production
          </Heading>
        </div>

        <div className={styles.banner}>
          <Link to={banner1.link} className={`${styles.bannerCol} ${styles.bannerColDivider}`}>
            <span className={styles.bannerIcon}>{banner1.icon}</span>
            <strong className={styles.bannerTitle}>{banner1.title}</strong>
            <span className={styles.bannerDesc}>{banner1.description}</span>
            <span className={styles.bannerCta}>
              Start here <span aria-hidden="true">→</span>
            </span>
          </Link>
          <Link to={banner2.link} className={styles.bannerCol}>
            <span className={styles.bannerIcon}>{banner2.icon}</span>
            <strong className={styles.bannerTitle}>{banner2.title}</strong>
            <span className={styles.bannerDesc}>{banner2.description}</span>
            {banner2.tags && (
              <span className={styles.bannerPills}>
                {banner2.tags.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </span>
            )}
          </Link>
        </div>

        <div className={styles.lifecycle}>
          <div className={styles.lifecycleHead}>
            <strong>Integration lifecycle</strong>
            <span className={styles.lifecycleRule} aria-hidden="true" />
          </div>
          <ol className={styles.lifecycleGrid}>
            {lifecycle.map((c, i) => (
              <li key={c.title}>
                <Link to={c.link} className={`${styles.lcCard} ${styles[tones[i]]}`}>
                  <span className={styles.lcTop}>
                    <span className={styles.lcIcon} aria-hidden="true">
                      {c.icon}
                    </span>
                    <span className={styles.lcNum}>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <strong>{c.title}</strong>
                  <span>{c.description}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.wideGrid}>
          {wide.map((t) => (
            <Link key={t.title} to={t.link} className={styles.wideTile}>
              <span className={`${styles.wideIcon} ${styles.wideIconOrange}`} aria-hidden="true">
                {t.icon}
              </span>
              <span className={styles.wideBody}>
                <strong>{t.title}</strong>
                <span>{t.description}</span>
                {t.tags && (
                  <span className={styles.tags}>
                    {t.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                )}
              </span>
              <span className={styles.wideArrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
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
      <div className={styles.page}>
        <main>
          <HomepageHeader />
          <GetStarted />
          <Explore />
        </main>
      </div>
    </Layout>
  );
}
