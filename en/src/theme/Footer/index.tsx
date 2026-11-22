/**
 * Full custom swizzle (not a @theme-original wrapper) -- @docusaurus/
 * theme-classic's stock Footer has no equivalent to any of this (it
 * only renders link columns + a single logo/copyright row). Content
 * stays config-driven (reads `footer.links` / `footer.copyright` from
 * docusaurus.config.ts via useThemeConfig, same as the original); only
 * the brand/social column and bottom bar are new, hardcoded here since
 * they aren't really per-page config.
 *
 * Single row: the brand column (logo/tagline + social icons stacked
 * below it, see .footerBrandCol) on the left, the config-driven link
 * sections beside it (see .footerColsGrid), each separated by a
 * vertical rule, right-aligned and flowing toward the brand column
 * rather than trailing loose space after the last section. No product
 * branch has more than a handful of footer.links sections (5 today,
 * across all branches), so this fits one row instead of a stacked
 * layout -- see styles.module.css's own comments for how this degrades
 * to stacked + horizontal rules once columns no longer fit one line.
 */
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';

import styles from './styles.module.css';

type FooterItem = { label: string; to?: string; href?: string; autoAddBaseUrl?: boolean; target?: string };
type FooterColumn = { title?: string; items?: FooterItem[] };

function CookieIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 12.5A8.5 8.5 0 1 1 11.5 3.5a3 3 0 0 0 4 3.5 3 3 0 0 0 5 5.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon(): ReactNode {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function GithubIcon(): ReactNode {
  return (
    <svg width="19" height="19" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

/* Solid brand mark (not a stroke-outline glyph like the earlier
   version) -- every other social icon here (GitHub, Stack Overflow,
   YouTube, LinkedIn, X) is `fill="currentColor"`; an outline-only icon
   reads as much fainter than its filled neighbours at the same size,
   which is what made it hard to spot regardless of how large it was
   sized. */
function DiscordIcon(): ReactNode {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function StackOverflowIcon(): ReactNode {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.4 18.2v-4.6h1.5V19.7H4.6v-6.1h1.5v4.6ZM7.7 13.6l7.3 1.5.3-1.5-7.3-1.6Zm1-3.6 6.8 3.1.6-1.4-6.7-3.2Zm2-3.4 5.8 4.8.9-1.2-5.7-4.8Zm3.3-3.5-1.2.9 4.4 5.9 1.2-.9ZM7.6 17.1h7.4v-1.5H7.6Z" />
    </svg>
  );
}

function YoutubeIcon(): ReactNode {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2Z" />
    </svg>
  );
}

function LinkedInIcon(): ReactNode {
  // viewBox isn't square (448x512) -- scaled to the same 19px height as
  // the other icons, width follows its own aspect ratio so the mark
  // doesn't stretch.
  return (
    <svg width="17" height="19" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}

function XIcon(): ReactNode {
  return (
    <svg width="19" height="19" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true">
      <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/wso2/docs-integrator', icon: <GithubIcon /> },
  { label: 'Discord', href: 'https://discord.com/invite/wso2', icon: <DiscordIcon /> },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/wso2', icon: <StackOverflowIcon /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@WSO2official', icon: <YoutubeIcon /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wso2', icon: <LinkedInIcon /> },
  { label: 'X (Twitter)', href: 'https://twitter.com/intent/follow?screen_name=wso2', icon: <XIcon /> },
];

function FooterLink({ item }: { item: FooterItem }): ReactNode {
  const { label, to, href, autoAddBaseUrl, target } = item;
  const toUrl = useBaseUrl(to);
  return (
    <Link
      className={styles.footerColLink}
      {...(href ? { href } : { to: toUrl })}
      {...(autoAddBaseUrl === false && { autoAddBaseUrl: false })}
      {...(target && { target })}>
      {label}
      {href && !isInternalUrl(href) && <ExternalIcon />}
    </Link>
  );
}

export default function Footer(): ReactNode {
  const { footer } = useThemeConfig() as { footer?: { links?: FooterColumn[]; copyright?: string } };
  const { siteConfig } = useDocusaurusContext();
  // The footer background is always dark charcoal regardless of the
  // site's light/dark theme, so it always needs the white logo (the
  // black one would be invisible here).
  const logoSrc = useBaseUrl('/img/integration-platform-logo-white.png');

  if (!footer) return null;
  const { links, copyright } = footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.helpRow}>
        <div className={styles.helpInner}>
          <span className={styles.helpText}>
            <strong>Need help?</strong>
            <span>Ask the community or check the answers to common questions.</span>
          </span>
          <span className={styles.helpLinks}>
            <Link className={styles.helpLink} to="/community">Community</Link>
            <span className={styles.helpSep} aria-hidden="true">·</span>
            <a className={styles.helpLink} href="https://discord.com/invite/wso2" target="_blank" rel="noopener noreferrer">Discord</a>
            <span className={styles.helpSep} aria-hidden="true">·</span>
            <Link className={styles.helpLink} to="/reference/faq">FAQ</Link>
          </span>
        </div>
      </div>
      <div className={styles.footerTop}>
        <div className={styles.footerBrandCol}>
          <div className={styles.footerBrand}>
            <img className={styles.footerLogo} src={logoSrc} alt="Choreo Integration" />
            <p className={styles.footerTagline}>{siteConfig.tagline}</p>
          </div>
          <div className={styles.footerSocial}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a key={label} className={styles.footerSocialBtn} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {links && links.length > 0 && (
          <div className={styles.footerColsGrid}>
            {links.map((column, i) => (
              <div className={styles.footerCol} key={i}>
                {column.title && <div className={styles.footerColTitle}>{column.title}</div>}
                {column.items?.map((item, j) => (
                  <FooterLink key={j} item={item} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.footerBottom}>
        {copyright && <span className={styles.footerCopyright}>{copyright}</span>}
        <div className={styles.footerLegal}>
          <a className={styles.footerLegalLink} href="https://wso2.com/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a className={styles.footerLegalLink} href="https://wso2.com/cookie-policy" target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </a>
          {/* A persistent, visible consent-withdrawal entry point is a
              compliance expectation on its own, not just a convenience --
              CookiePro's admin-console "floating icon" may or may not be
              turned on for this domain-script ID (not something this
              codebase controls) and is easy to miss/disable even when it
              is, so this stays regardless of that setting.
              The direct `OneTrust.ToggleInfoDisplay()` call below is the
              single opening mechanism. It is a no-op until CookiePro
              initializes. `ot-sdk-show-settings` (CookiePro's own class
              for auto-wiring this same action) is deliberately NOT also
              applied here -- combining both means a single click fires
              both handlers, and since ToggleInfoDisplay toggles rather
              than just opens, that reopens and immediately closes the
              preference center again. */}
          <button
            type="button"
            className={styles.footerCookieBtn}
            onClick={() => (window as typeof window & { OneTrust?: { ToggleInfoDisplay: () => void } }).OneTrust?.ToggleInfoDisplay()}
          >
            <CookieIcon />
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}
