import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/**
 * The shared homepage hero: product screenshot in a window frame (left),
 * badge / title / subtitle / CTA / secondary link / footnote (right).
 *
 * The layout is wholesale-shared (authored on `main`, synced to every
 * product branch). Everything product-specific is a prop, and the
 * screenshot is each branch's own `static/img/landing/hero.png` -- that
 * folder isn't synced, so each branch keeps its own image. The PNG is the
 * window's content only; the frame (dots + title bar) is drawn here.
 */
export interface LandingHeroProps {
  /** Title shown in the window frame's title bar, e.g. "WSO2 Integrator". */
  windowTitle: string;
  /** Alt text for static/img/landing/hero.png. */
  imageAlt: string;
  /** Text of the "Docs · <Product>" pill. */
  badge: string;
  title: string;
  subtitle: string;
  cta: { label: string; to: string };
  /** Optional low-emphasis button beside the CTA, e.g. "Platform Overview". */
  secondaryCta?: { label: string; to: string };
  secondary?: {
    /** Plain text before the link, e.g. "Already know what you need?". */
    prefix: string;
    label: string;
    href: string;
    /** Trailing icon: a download arrow or an external-link arrow. */
    icon: 'download' | 'external';
  };
  footnote?: string;
}

function IconWave(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF8A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

function IconExternal(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4h6v6M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export default function LandingHero({
  windowTitle,
  imageAlt,
  badge,
  title,
  subtitle,
  cta,
  secondaryCta,
  secondary,
  footnote,
}: LandingHeroProps): ReactNode {
  const src = useBaseUrl('/img/landing/hero.png');
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <div className={styles.heroLeft}>
          <div className={styles.productCard}>
            <div className={styles.productCardChrome}>
              <span className={styles.productCardDot} />
              <span className={styles.productCardDot} />
              <span className={styles.productCardDot} />
              <span className={styles.productCardTitle}>{windowTitle}</span>
            </div>
            <img src={src} alt={imageAlt} />
          </div>
        </div>

        <div className={styles.heroRight}>
          <span className={styles.heroBadge}>
            <IconWave />
            {badge}
          </span>
          <Heading as="h1">{title}</Heading>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          <div className={styles.heroActions}>
            <div className={styles.heroButtons}>
              <Link className={styles.heroBtn} to={cta.to}>
                {cta.label}
                <IconArrowRight />
              </Link>
              {secondaryCta && (
                <Link className={styles.heroBtnGhost} to={secondaryCta.to}>
                  {secondaryCta.label}
                </Link>
              )}
            </div>
            {secondary && (
              <div className={styles.heroSecondary}>
                <span>{secondary.prefix}</span>
                <Link href={secondary.href} target="_blank" rel="noopener noreferrer">
                  <span className={styles.heroSecondaryLabel}>{secondary.label}</span>
                  {secondary.icon === 'download' ? <IconDownload /> : <IconExternal />}
                </Link>
              </div>
            )}
            {footnote && <p className={styles.heroFootnote}>{footnote}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}
