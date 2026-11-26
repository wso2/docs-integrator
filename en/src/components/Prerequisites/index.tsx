import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

const DEFAULT_CROSS_PRODUCT_BASE = '/integration-platform/docs/';

/**
 * The "Prerequisites" box from the "Page — versioned product" design
 * reference (ArticleOneBar.dc.html): an info-circle icon + uppercase
 * label, an intro line, then a card grid (Cloud setup / Local setup,
 * or whatever this doc's own options are). Deliberately blue, not the
 * site's orange accent -- "info" stays its own semantic colour even on
 * an orange-branded page, same reasoning PaletteCard's blue --highlight
 * variant documents for itself.
 *
 * Replaces the plain `:::info Prerequisites` admonition + bullet list
 * quickstarts used before. Globally registered (theme/MDXComponents) --
 * no import needed in a doc, same as PaletteCard/CloudDocsLink.
 *
 * This component renders NO heading of its own -- write a literal `##
 * Prerequisites` as the first thing inside it instead (not a prop, not
 * JSX like PaletteCard's own `<h4 class="palette-card-title">`
 * convention). Two reasons, both hard requirements, not style
 * preferences:
 *
 *  1. TOC extraction (@docusaurus/mdx-loader's remark toc plugin) walks
 *     the page's actual MDX syntax tree and only recognizes a `heading`
 *     node -- literal `##`/`###` text, anywhere in the tree, including
 *     nested inside a custom component's children (same as every step
 *     heading inside <Steps>, see that component's own docstring). A
 *     heading rendered BY a component (an `<h2>` in this file's own
 *     JSX, like Prerequisites used to have) never becomes a `heading`
 *     node in the doc's tree -- it doesn't exist until React renders
 *     this component, long after the TOC was already extracted from the
 *     source file -- so it silently never appeared in "On this page".
 *  2. `.markdown h2` (custom.css) sets every h2's own border-bottom/
 *     padding-bottom/margin-top for normal section breaks. A component-
 *     rendered `<h2>` picked that up TOO (that rule beats a plain CSS-
 *     module class on specificity), on top of this component's own
 *     chrome -- the double styling was the stray border/oversized gap
 *     above the box. The literal heading below gets the same `!important`
 *     override treatment Steps already uses for exactly this reason.
 *
 *   <Prerequisites>
 *
 *   ## Prerequisites
 *
 *   A working WSO2 Integrator environment. Choose the path that fits
 *   how you want to work:
 *
 *   <PrereqCard icon="cloud" title="Cloud setup" href="/get-started/cloud-setup" cloud>
 *     Launch WSO2 Integrator in a browser-based cloud editor.
 *   </PrereqCard>
 *   <PrereqCard icon="local" title="Local setup" href="../setup/setup.md">
 *     Install and launch WSO2 Integrator on your machine.
 *   </PrereqCard>
 *
 *   </Prerequisites>
 *
 * The heading and the intro paragraph each span the full row (see
 * styles.module.css); only <PrereqCard>s flow into the card grid.
 */

function CloudIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.5a4.8 4.8 0 0 1-.5 9.5z" />
    </svg>
  );
}

function LocalIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="11" rx="2" />
      <path d="M2 19.5h20" />
    </svg>
  );
}

// Same sparkle glyph as PaletteIcon's "ai" -- for a PrereqCard about an
// AI assistant/copilot sign-in rather than a setup path (cloud/local).
function AIIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.8 4.9L19 9.5l-5.2 1.6L12 16l-1.8-4.9L5 9.5l5.2-1.6Z" />
      <path d="M19 3v3" />
      <path d="M17.5 4.5h3" />
    </svg>
  );
}

const PREREQ_ICONS = { cloud: CloudIcon, local: LocalIcon, ai: AIIcon } as const;
export type PrereqIconName = keyof typeof PREREQ_ICONS;

export function PrereqCard({
  icon,
  title,
  href,
  cloud,
  children,
}: {
  icon: PrereqIconName;
  title: string;
  href: string;
  /** `href` is a route on the WSO2 Cloud (saas) docs site, not this
   * site -- resolved the same way CloudDocsLink does (each product is a
   * separate static build with its own baseUrl, so a plain internal
   * link would land on the wrong site). See CloudDocsLink's own
   * docstring for the fuller reasoning; not reused directly here since
   * it doesn't accept the icon/title/desc card shape. */
  cloud?: boolean;
  children: ReactNode;
}): ReactNode {
  const Icon = PREREQ_ICONS[icon];
  const { siteConfig } = useDocusaurusContext();
  const content = (
    <>
      <span className={styles.cardIcon} aria-hidden="true">
        <Icon />
      </span>
      <span className={styles.cardText}>
        <strong>{title}</strong>
        <span>{children}</span>
      </span>
    </>
  );

  if (cloud) {
    const base = (siteConfig.customFields?.crossProductBase as string) || DEFAULT_CROSS_PRODUCT_BASE;
    const root = base.endsWith('/') ? base : `${base}/`;
    return (
      <a className={styles.card} href={`${root}saas/${href.replace(/^\//, '')}`}>
        {content}
      </a>
    );
  }

  // Same internal-vs-external split PaletteCard uses, and for the same
  // reason -- see that component's own comment.
  return isInternalUrl(href) ? (
    <Link className={styles.card} to={href}>
      {content}
    </Link>
  ) : (
    <a className={styles.card} href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

export default function Prerequisites({ children }: { children: ReactNode }): ReactNode {
  return <section className={styles.box}>{children}</section>;
}
