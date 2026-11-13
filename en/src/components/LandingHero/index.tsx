import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/**
 * The shared homepage hero: product screenshot in a window frame + an
 * optional footnote underneath (left), eyebrow / title / subtitle /
 * optional search / CTA / optional secondary link (right).
 *
 * The layout is wholesale-shared (authored on `main`, synced to every
 * product branch). Everything product-specific is a prop, and the
 * screenshot is each branch's own `static/img/landing/hero.png` -- that
 * folder isn't synced, so each branch keeps its own image. The PNG is the
 * window's content only; the frame (dots + title bar) is drawn here.
 *
 * Palette: warm cream (light) / charcoal (dark) -- see styles.module.css's
 * own docstring. Unlike the hero this replaced, it follows the site's
 * light/dark theme rather than always rendering navy; the design's two
 * reference mockups (light-mode-final-landing, dark-mode-landing-final)
 * each specify their own hero background for exactly that reason.
 */
export interface LandingHeroProps {
  /** Title shown in the window frame's title bar, e.g. "WSO2 Integrator". */
  windowTitle: string;
  /** Alt text for static/img/landing/hero.png. */
  imageAlt: string;
  /** Small uppercase label above the title, e.g. "WSO2 Integrator · Docs". */
  eyebrow: string;
  /** Usually a plain string; pass JSX (e.g. with <TitleSuffix>) for a
   * trailing qualifier that should render smaller than the rest, like
   * "Integration Platform on WSO2 Cloud <TitleSuffix>(SaaS)</TitleSuffix>". */
  title: ReactNode;
  subtitle: string;
  /** Optional search box (e.g. <HeroSearch />) rendered between the
   * subtitle and the CTA row. Omit for a product with no in-page search. */
  search?: ReactNode;
  cta: { label: string; to: string };
  /** Optional low-emphasis button beside the CTA, e.g. "Platform overview". */
  secondaryCta?: { label: string; to: string };
  secondary?: {
    /** Plain text before the link, e.g. "Already know what you need?". */
    prefix: string;
    label: string;
    href: string;
    /** Trailing icon: a download arrow or an external-link arrow. */
    icon: 'download' | 'external';
  };
  /** Optional caption under the screenshot, e.g. "Windows · macOS ·
   * Linux · 100% open source". */
  footnote?: string;
}

/** A trailing qualifier inside `title` that should render smaller/lighter
 * than the rest of the headline, e.g. "...WSO2 Cloud <TitleSuffix>(SaaS)
 * </TitleSuffix>". `em`-sized (not a fixed px value) so it stays
 * proportional to heroTitle's own font-size across breakpoints. */
export function TitleSuffix({ children }: { children: ReactNode }): ReactNode {
  return <span className={styles.heroTitleSuffix}>{children}</span>;
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
  eyebrow,
  title,
  subtitle,
  search,
  cta,
  secondaryCta,
  secondary,
  footnote,
}: LandingHeroProps): ReactNode {
  const src = useBaseUrl('/img/landing/hero.png');
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDash} />
            {eyebrow}
          </span>
          <Heading as="h1" className={styles.heroTitle}>
            {title}
          </Heading>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          {search}
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
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.windowFrame}>
            <div className={styles.windowBar}>
              <span className={styles.windowDot} />
              <span className={styles.windowDot} />
              <span className={styles.windowDot} />
              <span className={styles.windowTitle}>{windowTitle}</span>
            </div>
            <img src={src} alt={imageAlt} />
          </div>
          {footnote && <p className={styles.heroFootnote}>{footnote}</p>}
        </div>
      </div>
    </header>
  );
}
