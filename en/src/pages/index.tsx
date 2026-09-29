import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SearchBar from '@site/src/components/SearchBar';

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

/** The pulse/waveform mark used as the "Docs" badge icon in the hero. */
function IconWave({ stroke = 'currentColor', size = 14 }: { stroke?: string; size?: number }): ReactNode {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h3l2-4 3 8 2-4h4" />
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

function IconDownload(): ReactNode {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" />
      <path d="M5 19h14" />
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
};

const sections: SectionCard[] = [
  {
    title: 'Platform Overview',
    description: 'Copied verbatim from saas -- common to every product branch.',
    link: '/platform-overview',
    icon: <IconManage />,
    iconColor: '#7C3AED',
  },
  {
    title: 'Get Started',
    description: 'Sample sign-up/concepts/quickstarts pages, in the same shape saas uses.',
    link: '/get-started',
    icon: <IconGetStarted />,
    iconColor: '#F14E23',
  },
  {
    title: 'Section 1',
    description: 'Placeholder top-level section with sample sub-sections, demonstrating the nested-category convention.',
    link: '/section-1',
    icon: <IconSection />,
    iconColor: '#059669',
  },
  {
    title: 'Section 2',
    description: 'Two plain leaf docs, each with its own sidebar separator label.',
    link: '/section-2',
    icon: <IconDevelop />,
    iconColor: '#26365A',
  },
  {
    title: 'Guides',
    description: 'A searchable guide catalog with a few sample guides.',
    link: '/guides',
    icon: <IconTutorials />,
    iconColor: '#0EA5E9',
  },
  {
    title: 'Reference',
    description: 'Sample FAQ and glossary pages, in the same shape saas uses.',
    link: '/reference',
    icon: <IconReference />,
    iconColor: '#7C2D12',
  },
  {
    title: 'Tools',
    description: 'Brand color palette/logos, and downloadable Claude Code skills for this repo.',
    link: '/tools',
    icon: <IconTools />,
    iconColor: '#0F766E',
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-links shown when the search input is focused but empty, and   */
/*  in the "What do you want to build?" tutorial row below the hero.    */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { label: 'Build an Integration as API', sub: 'Sample quickstart', to: '/get-started/quickstarts/build-integration-api' },
  { label: 'Build an AI Agent', sub: 'Sample quickstart', to: '/get-started/quickstarts/build-ai-agent' },
];

/* ------------------------------------------------------------------ */
/*  Welcome screenshot -- the real WSO2 Integrator get-started screen,  */
/*  copied verbatim from wso2-integrator's own homepage (image and all) */
/*  since this branch otherwise has no real product to screenshot. A    */
/*  polished mockup export with its own rounded corners/shadow/glow     */
/*  already baked in, so it's rendered standalone rather than inside a  */
/*  .productCard browser-chrome frame -- that frame would double up the */
/*  styling and clip the image's own soft edges (same reasoning as      */
/*  wso2-integrator's own version of this component).                   */
/* ------------------------------------------------------------------ */
function WelcomeScreenshot(): ReactNode {
  const src = useBaseUrl('/img/landing/wso2-integrator-welcome.png');
  return (
    <img
      className={styles.heroScreenshot}
      src={src}
      alt="WSO2 Integrator welcome and sign-in screen"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Banner -- split layout: welcome screenshot + download button   */
/*  (left, copied verbatim from wso2-integrator's own homepage) plus     */
/*  badge/heading/search/CTA (right). Unlike this branch's earlier      */
/*  no-heroLeft/heroRightSolo version, the .heroRight/.heroLeft border  */
/*  divider is back now that there's a real left column again.          */
/* ------------------------------------------------------------------ */
function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <div className={styles.heroLeft}>
          <WelcomeScreenshot />
          <div className={styles.downloadRow}>
            <Link
              className={styles.downloadBtn}
              href="https://wso2.com/products/downloads/?product=wso2integrator"
              target="_blank"
              rel="noopener noreferrer">
              <IconDownload />
              Download WSO2 Integrator
            </Link>
            <span className={styles.downloadCaption}>
              Windows &middot; macOS &middot; Linux
              <br />
              100% open source
            </span>
          </div>
        </div>

        <div className={styles.heroRight}>
          <span className={styles.heroBadge}>
            <IconWave stroke="#FF8A3D" />
            Docs · Scaffold
          </span>
          <Heading as="h1">{siteConfig.title}</Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <SearchBar quickLinks={quickLinks} />
          <div className={styles.buttons}>
            <Link className={styles.heroBtn} to="/get-started">
              Let's Get Started
              <IconArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  "What do you want to build?" — tutorial row                        */
/* ------------------------------------------------------------------ */
function TutorialRow(): ReactNode {
  return (
    <section className={styles.tutorialRow}>
      <Heading as="h2" className={styles.tutorialRowTitle}>
        What do you want to build?
      </Heading>
      <div className={styles.tutorialGrid}>
        {quickLinks.map((link) => (
          <Link key={link.to} to={link.to} className={styles.tutorialCard}>
            <span className={styles.tutorialCardText}>
              <span className={styles.tutorialCardTitle}>{link.label}</span>
              <span className={styles.tutorialCardSub}>{link.sub}</span>
            </span>
            <span className={styles.tutorialCardArrow}>
              <IconArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Cards                                                      */
/* ------------------------------------------------------------------ */
function SectionCards(): ReactNode {
  return (
    <section className={styles.sectionCards}>
      <Heading as="h2" className={styles.sectionCardsTitle}>
        Explore the scaffold
      </Heading>
      <div className={styles.sectionGrid}>
        {sections.map((card, idx) => (
          <Link
            key={idx}
            to={card.link}
            className={styles.sectionCard}
            style={{ '--icon-color': card.iconColor } as React.CSSProperties}>
            <span className={styles.sectionIcon}>{card.icon}</span>
            <Heading as="h3" className={styles.sectionCardTitle}>
              {card.title}
            </Heading>
            <p className={styles.sectionCardDesc}>{card.description}</p>
          </Link>
        ))}
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
        <TutorialRow />
        <SectionCards />
      </main>
    </Layout>
  );
}
