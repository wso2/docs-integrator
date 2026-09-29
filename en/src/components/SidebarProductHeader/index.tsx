import { Component, Fragment, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  useVersions,
  useActiveDocContext,
  useDocsVersionCandidates,
} from '@docusaurus/plugin-content-docs/client';

import styles from './styles.module.css';

export type ProductKey = 'cloud' | 'integrator' | 'connectors';

/**
 * Kept in sync by hand with theme-shared/themeConfig.ts's PRODUCTS map
 * (can't import it here -- that file is TS-only config-time code, this
 * runs client-side in the browser bundle). Root-relative hrefs, real <a>
 * tags below rather than Docusaurus's <Link> -- each target is a
 * completely separate build/bundle, so this must always be a real page
 * load, never client-side routing (see themeConfig.ts's sharedProductDropdown
 * docstring for the isInternalUrl pitfall this sidesteps entirely by not
 * going through Link at all). Connectors goes straight to the catalog,
 * not just that site's homepage -- same target as the navbar's own
 * "Connectors" link.
 */
/** `path` is relative to CROSS_PRODUCT_BASE (siteConfig.customFields.crossProductBase,
 * set per-branch in docusaurus.config.ts from themeConfig.ts's CROSS_PRODUCT_BASE --
 * can't import that directly here, see this const's own docstring above). */
const PRODUCTS: Record<ProductKey, { label: string; description: string; path: string; icon: () => ReactNode }> = {
  cloud: {
    label: 'SaaS',
    description: 'Cloud-hosted integration platform',
    path: 'saas/',
    icon: CloudIcon,
  },
  integrator: {
    label: 'WSO2 Integrator',
    description: 'Integrations, automations, AI agents',
    path: 'integrator/',
    icon: ProductIcon,
  },
  connectors: {
    label: 'WSO2 Connectors',
    description: 'Pre-built connectors for common systems',
    path: 'connectors/catalog',
    icon: PlugIcon,
  },
};

const DEFAULT_CROSS_PRODUCT_BASE = '/integration-platform/docs/';

const PRODUCT_ORDER: ProductKey[] = ['cloud', 'integrator', 'connectors'];

/** Detects which of the three sites this build is, from its own baseUrl
 * -- no per-branch config needed, so this file can be byte-identical
 * across branches. Exported so other wholesale-shared components that
 * need per-product data (e.g. ReportIssueButton's issue-tracker repo)
 * can reuse the same detection instead of duplicating it -- keeps the
 * "which product is this" logic in exactly one place. */
export function detectCurrentProduct(baseUrl: string): ProductKey {
  if (baseUrl.includes('/integrator/')) return 'integrator';
  if (baseUrl.includes('/connectors/')) return 'connectors';
  if (baseUrl.includes('/saas/')) return 'cloud';
  // Fallback for a local/dev build with baseUrl '/' (no product segment
  // at all) -- still saas, since that's this branch's own default.
  return 'cloud';
}

function ChevronDownIcon(): ReactNode {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/** Waveform mark -- WSO2 Integrator, and also the product pill's own icon
 * badge (same mark as the homepage hero's "Docs" badge, for a consistent
 * brand touchpoint). */
function ProductIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h3l2-4 3 8 2-4h4" />
    </svg>
  );
}

function CloudIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 6.5 19h11z" />
    </svg>
  );
}

function PlugIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3v4M15 3v4" />
      <path d="M6 7h12v4a6 6 0 0 1-12 0V7Z" />
      <path d="M12 17v4" />
    </svg>
  );
}

function Pill({
  label,
  icon,
  variant,
  menuHeading,
  menuClassName,
  children,
}: {
  label: string;
  icon?: ReactNode;
  variant?: 'product' | 'version';
  /** Small uppercase label above the menu's rows (e.g. "Platform Components"). */
  menuHeading?: string;
  /** Extra class on the popup menu, for a variant-specific width. */
  menuClassName?: string;
  children: (close: () => void) => ReactNode;
}): ReactNode {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div ref={ref} className={styles.pillWrapper}>
      <button
        type="button"
        className={clsx(styles.pill, variant === 'product' && styles.pillProduct)}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}>
        {icon && <span className={styles.pillIcon}>{icon}</span>}
        <span className={styles.pillLabel}>{label}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div className={clsx(styles.pillMenu, menuClassName)}>
          {menuHeading && <div className={styles.pillMenuHeading}>{menuHeading}</div>}
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

/** Fixed width regardless of label length ("SaaS" vs "WSO2 Integrator") so
 * the pill group's overall size doesn't jump around when switching products.
 * The dropdown lists all three products (including the current one,
 * highlighted) rather than just the other two, matching the reference's
 * "Platform Components" menu exactly. */
function ProductPill(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const current = detectCurrentProduct(siteConfig.baseUrl);
  const crossProductBase = (siteConfig.customFields?.crossProductBase as string) || DEFAULT_CROSS_PRODUCT_BASE;

  return (
    <Pill
      label={PRODUCTS[current].label}
      icon={<ProductIcon />}
      variant="product"
      menuHeading="Platform Components"
      menuClassName={styles.pillMenuWide}>
      {() =>
        PRODUCT_ORDER.map((key) => {
          const product = PRODUCTS[key];
          const isActive = key === current;
          const Icon = product.icon;
          return (
            // Fragment: connectors is a supporting product (a catalog used
            // BY the two real platforms, saas and integrator, not a third
            // one of the same kind) -- a divider ahead of it marks that
            // split instead of listing all three as equally-weighted peers.
            <Fragment key={key}>
              {key === 'connectors' && <div className={styles.pillMenuDivider} />}
              {/* Real <a>, not <Link>: each product is a separate static
                  build, must always be a real page load. */}
              <a href={`${crossProductBase}${product.path}`} className={clsx(styles.pillMenuRow, isActive && styles.pillMenuRowActive)}>
                <span className={clsx(styles.pillMenuRowIcon, isActive && styles.pillMenuRowIconActive)}>
                  <Icon />
                </span>
                <span className={styles.pillMenuRowText}>
                  <span className={styles.pillMenuRowTitle}>{product.label}</span>
                  <span className={styles.pillMenuRowDesc}>{product.description}</span>
                </span>
              </a>
            </Fragment>
          );
        })
      }
    </Pill>
  );
}

/** Mirrors @docusaurus/theme-classic's DocsVersionDropdownNavbarItem data logic (same hooks, same "don't render for a single version" rule), just restyled as a pill instead of a navbar dropdown. */
function VersionPill(): ReactNode {
  const versions = useVersions(undefined);
  const activeDocContext = useActiveDocContext(undefined);
  const candidates = useDocsVersionCandidates(undefined);

  if (versions.length <= 1) return null;

  const activeVersion =
    candidates.map((c) => versions.find((v) => v === c)).find((v) => v !== undefined) ?? versions[0];

  function targetDocFor(version: (typeof versions)[number]) {
    return (
      activeDocContext.alternateDocVersions[version.name] ??
      version.docs.find((doc) => doc.id === version.mainDocId)
    );
  }

  return (
    <Pill label={activeVersion.label} icon={<span className={styles.pillDot} />}>
      {(close) =>
        versions.map((version) => {
          const targetDoc = targetDocFor(version);
          if (!targetDoc) return null;
          return (
            <Link
              key={version.name}
              to={targetDoc.path}
              onClick={close}
              className={styles.pillMenuItem}
              isActive={() => version === activeVersion}>
              {version.label}
            </Link>
          );
        })
      }
    </Pill>
  );
}

/**
 * VersionPill's hooks (useActiveDocContext/useDocsVersionCandidates)
 * assume they're called from within a page that's actually wrapped by
 * the docs plugin's version-context providers. That's true for the
 * normal case (this component rendered inside DocSidebar/Desktop on a
 * real doc page), but SiteNav also renders DocSidebar/Desktop directly
 * as the homepage drawer's content -- outside that context -- which
 * throws ("Hook ... is called outside the ...ContextProvider"),
 * crashing the whole page. A class component is the only way to catch
 * a render error from a child (no hook-based equivalent), so this
 * isolates that crash to just this optional widget: worst case, no
 * version pill on a page where its context isn't available, rather
 * than an unrelated page-level crash.
 */
class VersionPillBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default function SidebarProductHeader(): ReactNode {
  return (
    <div className={styles.header}>
      {/* Two independent bordered pills side by side (a small gap, not a
          fused single control) -- see styles.module.css's docstring. */}
      <div className={styles.pillGroup}>
        <ProductPill />
        <VersionPillBoundary>
          <VersionPill />
        </VersionPillBoundary>
      </div>
    </div>
  );
}
