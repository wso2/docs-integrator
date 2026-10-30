import { Component, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import {
  useVersions,
  useActiveDocContext,
  useDocsVersionCandidates,
} from '@docusaurus/plugin-content-docs/client';

import styles from './styles.module.css';

export type ProductKey = 'cloud' | 'integrator' | 'agentBuilder' | 'connectors';

/**
 * The header's product + version switcher: one 320px segmented control
 * (left half = product, right half = version) that opens a two-step panel.
 * Step 1 lists the platform's products; step 2 (reached from the current
 * product's version half, in the trigger or its row) is a dedicated,
 * independently-scrolling list of that product's versions -- kept as its
 * own step, not an inline dropdown off the product row, so the panel's
 * height stays fixed regardless of how many versions a product has.
 *
 * Kept in sync by hand with theme-shared/themeConfig.ts's PRODUCTS map
 * (can't import it here -- that file is TS-only config-time code, this
 * runs client-side in the browser bundle). Root-relative hrefs, real <a>
 * tags below rather than Docusaurus's <Link> for cross-product targets --
 * each is a completely separate build/bundle, so this must always be a real
 * page load, never client-side routing (see themeConfig.ts's
 * sharedProductDropdown docstring for the isInternalUrl pitfall this
 * sidesteps entirely by not going through Link at all). Connectors goes
 * straight to the catalog, not just that site's homepage.
 *
 * Switching products is a full page load, so the design's "Now viewing …"
 * confirmation toast isn't implemented (it would vanish with the page).
 */
/** `path` is relative to CROSS_PRODUCT_BASE (siteConfig.customFields.crossProductBase,
 * set per-branch in docusaurus.config.ts from themeConfig.ts's CROSS_PRODUCT_BASE --
 * can't import that directly here, see this const's own docstring above). */
const PRODUCTS: Record<ProductKey, { label: string; path: string; icon: () => ReactNode; tone: string }> = {
  cloud: {
    label: 'WSO2 Cloud',
    path: 'saas/',
    icon: PulseIcon,
    tone: 'iconSaas',
  },
  integrator: {
    label: 'WSO2 Integrator',
    path: 'integrator/',
    icon: PulseIcon,
    tone: 'iconIntegrator',
  },
  agentBuilder: {
    label: 'WSO2 Agent Builder',
    path: 'agent-builder/',
    icon: PulseIcon,
    tone: 'iconAgent',
  },
  connectors: {
    label: 'WSO2 Connectors',
    path: 'connectors/catalog',
    icon: PulseIcon,
    tone: 'iconConnectors',
  },
};

const DEFAULT_CROSS_PRODUCT_BASE = '/integration-platform/docs/';

/** Row order in the panel; connectors sits below a divider as a
 * supporting product, catalog rather than a product of its own. */
const PRODUCT_ORDER: ProductKey[] = ['cloud', 'integrator', 'agentBuilder', 'connectors'];

/** Products whose docs are versioned -- a non-current row for one of these
 * gets a static "Latest" version half instead of a plain link (see the
 * `staticLatest` comment below for why it's static rather than that
 * product's real active version: a sibling product's version list isn't
 * available from here). `cloud` and `connectors` have no version switcher
 * of their own, so they're never in this list. */
const VERSIONED_PRODUCTS: ProductKey[] = ['integrator', 'agentBuilder'];

/** Detects which of the three sites this build is, from its own baseUrl
 * -- no per-branch config needed, so this file can be byte-identical
 * across branches. Exported so other wholesale-shared components that
 * need per-product data (e.g. ReportIssueButton's issue-tracker repo)
 * can reuse the same detection instead of duplicating it -- keeps the
 * "which product is this" logic in exactly one place. */
export function detectCurrentProduct(baseUrl: string): ProductKey {
  if (baseUrl.includes('/integrator/')) return 'integrator';
  if (baseUrl.includes('/agent-builder/')) return 'agentBuilder';
  if (baseUrl.includes('/connectors/')) return 'connectors';
  if (baseUrl.includes('/saas/')) return 'cloud';
  // Fallback for a local/dev build with baseUrl '/' (no product segment
  // at all) -- still saas, since that's this branch's own default.
  return 'cloud';
}

/** Page path of the current URL relative to this site's baseUrl, with no
 * leading/trailing slash ('' for the homepage). */
function currentPagePath(pathname: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/+$/, '');
  const rel = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return rel.replace(/^\/+|\/+$/g, '');
}

const sitemapCache = new Map<string, Promise<Set<string> | null>>();

/** Fetches a sibling product's sitemap (same origin, separate build) and
 * returns the set of its page paths relative to that product's root, or
 * null if unavailable (e.g. local dev) -- callers then fall back to the
 * product's home page. Compared by pathname only, since sitemap <loc>s use
 * the configured `url` origin, which may differ from the serving origin. */
function loadProductPages(sitemapUrl: string, segment: string): Promise<Set<string> | null> {
  let cached = sitemapCache.get(sitemapUrl);
  if (!cached) {
    cached = fetch(sitemapUrl)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((xml) => {
        const pages = new Set<string>();
        for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
          let pathname: string;
          try {
            pathname = new URL(m[1].trim()).pathname;
          } catch {
            continue;
          }
          const marker = `/${segment}/`;
          const i = pathname.indexOf(marker);
          if (i >= 0) pages.add(pathname.slice(i + marker.length).replace(/\/+$/, ''));
        }
        return pages.size ? pages : null;
      })
      .catch(() => null);
    sitemapCache.set(sitemapUrl, cached);
  }
  return cached;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function ChevronIcon({ size = 13, up = false, strokeWidth = 2 }: { size?: number; up?: boolean; strokeWidth?: number }): ReactNode {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={up ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/** The version step's "back to products" button. */
function BackIcon(): ReactNode {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The WSO2 pulse mark -- the actual static/img/favicon.svg asset
 * (loaded as-is via <img>, not redrawn as an inline SVG icon), shared
 * across every product entry -- including "Coming soon" ones like
 * Agent Builder -- instead of a distinct icon per product, for brand
 * consistency. No circular ring/fill around it (.badge in
 * styles.module.css is a plain sizing box now) -- the mark is sized to
 * fill that 26px box itself instead of sitting small inside one; the
 * compact trigger button's own 22px override lives in
 * `.compact .seg .badge img`. An <img>'s content can't pick up
 * `currentColor` the way an inline <svg> can, so this always renders in
 * the source file's own fixed brand orange regardless of which
 * product's row it's in -- intentional, not a limitation to work
 * around: the mark itself stays the same real logo everywhere, Agent
 * Builder included now that it's live. */
function PulseIcon(): ReactNode {
  const src = useBaseUrl('/img/favicon.svg');
  return <img src={src} alt="" width={26} height={26} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Versions                                                           */
/* ------------------------------------------------------------------ */
type VersionTag = 'Preview' | 'Latest' | 'Older';
type VersionTone = 'verNext' | 'verLatest' | 'verOlder';

type SwitcherVersion = {
  key: string;
  label: string;
  tag: VersionTag;
  tone: VersionTone;
  /** In-site path of the version's equivalent of the current page. */
  path: string;
};

const TONE_FOR_TAG: Record<VersionTag, VersionTone> = {
  Preview: 'verNext',
  Latest: 'verLatest',
  Older: 'verOlder',
};

type VersionModel = {
  versions: SwitcherVersion[];
  active: SwitcherVersion;
  /** Path of the active version's main doc (the "name click" target). */
  activeMainPath: string;
};

/** Same data as @docusaurus/theme-classic's DocsVersionDropdownNavbarItem
 * (same hooks, same "don't render for a single version" rule), reshaped for
 * the switcher. `current` (labelled "Next") is the preview; the first
 * released version is "Latest", every other one "Older". */
function useVersionModel(): VersionModel | null {
  const docsVersions = useVersions(undefined);
  const activeDocContext = useActiveDocContext(undefined);
  const candidates = useDocsVersionCandidates(undefined);

  if (docsVersions.length <= 1) return null;

  const firstReleased = docsVersions.find((v) => v.name !== 'current');
  const tagFor = (v: (typeof docsVersions)[number]): VersionTag =>
    v.name === 'current' ? 'Preview' : v === firstReleased ? 'Latest' : 'Older';

  const mainPathOf = (v: (typeof docsVersions)[number]) =>
    v.docs.find((doc) => doc.id === v.mainDocId)?.path ?? v.path;

  // docsVersions itself lists `current` ("Next") first -- reorder so the
  // list reads Latest, then Older (their existing relative order, which
  // is already newest-first), with Next last: a visitor opening the
  // version picker is almost always after a released version, not the
  // preview, so that's what should be at the top.
  const versions: SwitcherVersion[] = [...docsVersions]
    .sort((a, b) => Number(a.name === 'current') - Number(b.name === 'current'))
    .map((v) => {
      const tag = tagFor(v);
      const targetDoc = activeDocContext.alternateDocVersions[v.name] ?? v.docs.find((doc) => doc.id === v.mainDocId);
      return { key: v.name, label: v.label, tag, tone: TONE_FOR_TAG[tag], path: targetDoc?.path ?? v.path };
    });

  const activeVersion =
    candidates.map((c) => docsVersions.find((v) => v === c)).find((v) => v !== undefined) ?? docsVersions[0];
  const active = versions.find((v) => v.key === activeVersion.name) ?? versions[0];

  return { versions, active, activeMainPath: mainPathOf(activeVersion) };
}

/** 'closed' / step 1 (product list) / step 2 (the current product's
 * version list -- only reachable when `model` isn't null). */
type PanelStep = 'closed' | 'products' | 'versions';

/* ------------------------------------------------------------------ */
/*  Switcher                                                           */
/* ------------------------------------------------------------------ */
function Switcher({ model, compact }: { model: VersionModel | null; compact: boolean }): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const current = detectCurrentProduct(siteConfig.baseUrl);
  const crossProductBase = (siteConfig.customFields?.crossProductBase as string) || DEFAULT_CROSS_PRODUCT_BASE;
  const { pathname, hash } = useLocation();
  const pagePath = currentPagePath(pathname, siteConfig.baseUrl);

  const [step, setStep] = useState<PanelStep>('closed');
  // Sibling products that are known to have the current page, keyed by product.
  const [sharedPages, setSharedPages] = useState<Partial<Record<ProductKey, boolean>>>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const open = step !== 'closed';

  const close = () => setStep('closed');

  // Outside click / Escape close the panel.
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    setSharedPages({});
    if (!pagePath) return;
    let cancelled = false;
    PRODUCT_ORDER.forEach((key) => {
      if (key === current || key === 'connectors') return;
      const segment = PRODUCTS[key].path.replace(/\/$/, '');
      loadProductPages(`${crossProductBase}${segment}/sitemap.xml`, segment).then((pages) => {
        if (!cancelled && pages?.has(pagePath)) {
          setSharedPages((prev) => ({ ...prev, [key]: true }));
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, [pagePath, current, crossProductBase]);

  const hrefFor = (key: ProductKey) =>
    `${crossProductBase}${PRODUCTS[key].path}${sharedPages[key] ? `${pagePath}${hash}` : ''}`;

  const cur = PRODUCTS[current];
  const CurIcon = cur.icon;
  const versioned = model !== null;

  return (
    <div ref={rootRef} className={clsx(styles.root, compact && styles.compact)}>
      {/* ---- Trigger: same segmented control as the product rows ---- */}
      <div className={clsx(styles.seg, open && styles.segOpen)}>
        <button
          type="button"
          className={clsx(styles.segBtn, styles.segProduct, !versioned && styles.segFull)}
          aria-haspopup="dialog"
          aria-expanded={open}
          title="Change product"
          onClick={() => setStep((s) => (s === 'products' ? 'closed' : 'products'))}>
          <span className={clsx(styles.badge, styles[cur.tone])}>
            <CurIcon />
          </span>
          <span className={styles.segLabel}>{cur.label}</span>
          <span className={styles.chev}>
            <ChevronIcon />
          </span>
        </button>
        {versioned && (
          <>
            <span className={styles.segDivider} />
            <button
              type="button"
              className={clsx(styles.segBtn, styles.segVersion, styles[model.active.tone])}
              aria-haspopup="dialog"
              aria-expanded={open}
              title="Change version"
              onClick={() => setStep('versions')}>
              <span className={styles.dot} />
              {model.active.label}
              <ChevronIcon size={12} strokeWidth={2.2} />
            </button>
          </>
        )}
      </div>

      {/* ---- Panel ---- */}
      {step === 'products' && (
        <div role="dialog" aria-label="Choose a product" className={styles.panel}>
          <div className={styles.panelCols}>
            <span className={styles.colProduct}>Platform components</span>
            <span className={styles.colVersion}>Version</span>
          </div>
          <div className={styles.panelBody}>
            {PRODUCT_ORDER.map((key) => {
              const product = PRODUCTS[key];
              const Icon = product.icon;
              const isCurrent = key === current;
              // The current product's row carries the site's version half
              // (a button that opens step 2, not an inline list); a
              // different versioned product's row shows a static "Latest"
              // half instead (that site's version list isn't available
              // from here).
              const rowVersioned = isCurrent && versioned;
              const staticLatest = !isCurrent && VERSIONED_PRODUCTS.includes(key);

              const nameContent = (
                <>
                  <span className={clsx(styles.badge, styles[product.tone])}>
                    <Icon />
                  </span>
                  <span className={styles.rowText}>
                    <span>{product.label}</span>
                    {isCurrent && <span className={styles.rowMark}>Current</span>}
                  </span>
                </>
              );
              const nameClass = clsx(styles.segBtn, styles.rowName, (rowVersioned || staticLatest) && styles.rowNameHalf);

              return (
                <div key={key} className={styles.rowGroup}>
                  {key === 'connectors' && <span aria-hidden="true" className={styles.rule} />}
                  <div className={clsx(styles.row, isCurrent && styles.rowCurrent)}>
                    {isCurrent ? (
                      <Link
                        to={rowVersioned ? model.activeMainPath : siteConfig.baseUrl}
                        className={nameClass}
                        title={`Open ${product.label} docs`}
                        onClick={close}>
                        {nameContent}
                      </Link>
                    ) : (
                      // Real <a>, not <Link>: each product is a separate
                      // static build, must always be a real page load.
                      <a href={hrefFor(key)} className={nameClass} title={`Open ${product.label} docs`}>
                        {nameContent}
                      </a>
                    )}
                    {rowVersioned && (
                      <>
                        <span className={styles.segDivider} />
                        <button
                          type="button"
                          className={clsx(styles.segBtn, styles.segVersion, styles[model.active.tone])}
                          title={`Choose a ${product.label} version`}
                          onClick={() => setStep('versions')}>
                          <span className={styles.dot} />
                          {model.active.label}
                          <ChevronIcon size={12} strokeWidth={2.2} />
                        </button>
                      </>
                    )}
                    {staticLatest && (
                      <>
                        <span className={styles.segDivider} />
                        <a href={hrefFor(key)} className={clsx(styles.segBtn, styles.segVersion, styles.verLatest)} title="Open the latest version">
                          <span className={styles.dot} />
                          Latest
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.panelFoot}>
            Click a <strong>name</strong> → its latest docs · click a <strong>version</strong> → choose a version first
          </div>
        </div>
      )}

      {/* ---- Panel: step 2, the current product's versions. A dedicated,
          independently-scrolling step (capped height, own scrollbar)
          instead of a list dropped inline under the product row -- so the
          panel's own height stays fixed no matter how many versions this
          product has. ---- */}
      {step === 'versions' && model && (
        <div role="dialog" aria-label={`${cur.label} versions`} className={styles.panel}>
          <div className={styles.verHeader}>
            <button type="button" className={styles.backBtn} title="Back to products" aria-label="Back to products" onClick={() => setStep('products')}>
              <BackIcon />
            </button>
            <span className={styles.verHeaderTitle}>{cur.label} versions</span>
          </div>
          <div role="listbox" aria-label={`${cur.label} versions`} className={styles.verListStep}>
            {model.versions.map((v) => (
              <Link
                key={v.key}
                to={v.path}
                role="option"
                aria-selected={v.key === model.active.key}
                className={clsx(styles.verRow, styles[v.tone], v.key === model.active.key && styles.verRowSelected)}
                onClick={close}>
                <span className={styles.verRowLabel}>
                  <span className={styles.dot} />
                  {v.label}
                </span>
                <span className={styles.verRowTag}>{v.tag}</span>
              </Link>
            ))}
          </div>
          <div className={styles.panelFoot}>Pick a version to go straight to it.</div>
        </div>
      )}
    </div>
  );
}

/** The docs plugin's version hooks (useActiveDocContext/useDocsVersionCandidates)
 * assume they're called from a page wrapped by the docs plugin's version-context
 * providers; where that isn't true they throw ("Hook ... is called outside the
 * ...ContextProvider"). A class component is the only way to catch a render error
 * from a child, so this isolates that crash: worst case the switcher renders
 * without a version half, rather than an unrelated page-level crash. */
class VersionBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function SwitcherWithVersions({ compact }: { compact: boolean }): ReactNode {
  const model = useVersionModel();
  return <Switcher model={model} compact={compact} />;
}

/** `compact` -- the shorter 34px control used in the secondary row, sized
 * to the row's fixed --wso2-secondary-row-height; the default 42px one is
 * for the main navbar. */
export default function SidebarProductHeader({ compact = false }: { compact?: boolean }): ReactNode {
  return (
    <VersionBoundary fallback={<Switcher model={null} compact={compact} />}>
      <SwitcherWithVersions compact={compact} />
    </VersionBoundary>
  );
}
