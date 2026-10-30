/**
 * Command-palette search dialog (navbar icon). Queries Algolia directly
 * (see sharedAlgoliaSearch in themeConfig.ts) -- one index across every
 * product instead of each build's own local search.
 *
 * Hit titles are always the page's own h1; the matched heading/snippet
 * shows as a detail line underneath. Results group by sidebar section,
 * then by page within each section (groupByPage), so repeat headings on
 * one page don't repeat that page's title.
 *
 * `product`/`version` facets must be declared in the index's own
 * attributesForFaceting (Algolia dashboard) -- a crawler re-run alone
 * doesn't apply that retroactively. See the console.warn fallback below.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { liteClient as algoliasearch } from 'algoliasearch/lite';

import styles from './SearchModal.module.css';

// Raised from 20 so one heavily-matched section can't crowd out every
// other section before GROUP_PREVIEW_LIMIT gets a chance to cap it.
const RESULT_LIMIT = 50;
// Pages (not raw hits) shown per section before a "Show more" button.
const GROUP_PREVIEW_LIMIT = 4;
const HEADING_LEVELS = ['lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'] as const;

/** 'all' applies no facet filter; every other key maps to the `product`
 * facet value the crawler stamps on each record -- must match the
 * `product` facet the Algolia crawler config stamps on agent-builder's
 * own records (dashboard-side, not in this repo) or this pill silently
 * returns zero results instead of erroring. */
const PRODUCTS: { key: string; label: string }[] = [
  { key: 'all', label: 'All products' },
  { key: 'saas', label: 'WSO2 Cloud' },
  { key: 'integrator', label: 'WSO2 Integrator' },
  { key: 'agent-builder', label: 'Agent Builder' },
  { key: 'connectors', label: 'Connectors' },
];

interface HighlightField {
  value: string;
}

interface AlgoliaHit {
  objectID: string;
  url: string;
  hierarchy: Partial<Record<(typeof HEADING_LEVELS)[number] | 'lvl0', string | null>>;
  type: string; // 'lvl1'..'lvl6' | 'content'
  product?: string;
  _highlightResult?: { hierarchy?: Partial<Record<string, HighlightField>> };
  _snippetResult?: { content?: HighlightField };
}

/** Sentinel highlight markers -- control characters, so they can't
 * collide with real indexed text -- requested via highlightPreTag/
 * highlightPostTag below instead of trusting Algolia's own default. */
const HL_OPEN = '\u0001';
const HL_CLOSE = '\u0002';

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** The only place a hit value becomes dangerouslySetInnerHTML content.
 * Escapes the whole string first, then turns just the HL sentinels into
 * real `<mark>` tags -- skipping the escape step let indexed text with
 * literal markup (e.g. an `<img onerror=...>` code sample) execute as
 * real HTML. */
function renderHighlighted(value: string): string {
  return escapeHtml(value).split(HL_OPEN).join('<mark>').split(HL_CLOSE).join('</mark>');
}

/** Always the page's own h1, regardless of what actually matched. */
function hitTitleHtml(hit: AlgoliaHit): string {
  return renderHighlighted(hit._highlightResult?.hierarchy?.lvl1?.value ?? hit.hierarchy.lvl1 ?? hit.url);
}

/** What matched: a heading or a content snippet; null for a page-title
 * hit, where showing it again would be redundant. */
function hitDetailHtml(hit: AlgoliaHit): string | null {
  if (hit.type === 'lvl1') return null;
  if (hit.type === 'content') {
    const snippet = hit._snippetResult?.content?.value;
    return snippet ? renderHighlighted(snippet) : null;
  }
  const value = hit._highlightResult?.hierarchy?.[hit.type]?.value ?? hit.hierarchy[hit.type as (typeof HEADING_LEVELS)[number]];
  return value ? renderHighlighted(value) : null;
}

/** Rewrites a hit's crawled (always production) URL onto this build's
 * own crossProductBase, so a cross-product path resolves correctly on
 * production, staging, or a fork preview alike. */
function hitTargetPath(hit: AlgoliaHit, crossProductBase: string): string {
  const rawPath = hit.url.replace(/^https?:\/\/[^/]+/, '');
  const match = rawPath.match(/^\/integration-platform\/docs\/([^/]+)\/(.*)$/);
  return match ? `${crossProductBase}${match[1]}/${match[2]}` : rawPath;
}

/** A normal `<Link>` (SPA nav) for a hit within this build; a real
 * `<a>` otherwise -- a cross-product hit has no route in this build, so
 * Docusaurus's own client-side navigation would silently 404. Same
 * escape hatch SidebarProductHeader already uses. */
function ResultLink({
  target,
  baseUrl,
  className,
  active,
  onMouseMove,
  onClick,
  children,
}: {
  target: string;
  baseUrl: string;
  className: string;
  active: boolean;
  onMouseMove: () => void;
  onClick: () => void;
  children: ReactNode;
}): ReactNode {
  if (target.startsWith(baseUrl)) {
    return (
      <Link to={target} className={className} data-active={active} onMouseMove={onMouseMove} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={target} className={className} data-active={active} onMouseMove={onMouseMove} onClick={onClick}>
      {children}
    </a>
  );
}

/** Breadcrumb of intermediate headings, e.g. "Develop and Test > Create an Agent". */
function hitPath(hit: AlgoliaHit): string {
  const matchedLevel = hit.type === 'content' ? undefined : hit.type;
  return HEADING_LEVELS.slice(1)
    .filter((lvl) => lvl !== matchedLevel)
    .map((lvl) => hit.hierarchy[lvl])
    .filter((v): v is string => Boolean(v))
    .join(' › ');
}

/** One page's hits nested under a section: `headHit` is the parent row,
 * `children` render indented underneath it. */
type PageGroup = {
  url: string;
  title: string;
  headHit: AlgoliaHit;
  /** True when headHit was synthesized -- no real hit on this page was
   * a title/intro match, so every actual hit is a child. */
  syntheticHead: boolean;
  children: AlgoliaHit[];
};

type ResultGroup = { category: string; pages: PageGroup[] };

const PRODUCT_LABELS: Record<string, string> = Object.fromEntries(PRODUCTS.filter((p) => p.key !== 'all').map((p) => [p.key, p.label]));

/** Sidebar section from the hit's own URL -- the crawler has no
 * equivalent to Docusaurus's sidebar category tree to derive this from
 * server-side. */
function hitSection(hit: AlgoliaHit): string {
  const match = hit.url.match(/^https?:\/\/[^/]+\/integration-platform\/docs\/[^/]+\/(?:(?:next|\d+\.\d+\.\d+)\/)?([^/]+)/);
  const slug = match?.[1];
  return slug ? slug.replace(/-/g, ' ') : 'Overview';
}

/** Groups by hitSection, qualified by product label when showing more
 * than one product -- otherwise same-named sections from different
 * products would silently merge. Preserves Algolia's own rank order. */
function groupBySection(hits: AlgoliaHit[], disambiguateByProduct: boolean): { category: string; results: AlgoliaHit[] }[] {
  const order: string[] = [];
  const byCategory = new Map<string, AlgoliaHit[]>();
  for (const hit of hits) {
    const section = hitSection(hit);
    const productLabel = hit.product && PRODUCT_LABELS[hit.product];
    const cat = disambiguateByProduct && productLabel ? `${productLabel} · ${section}` : section;
    if (!byCategory.has(cat)) {
      byCategory.set(cat, []);
      order.push(cat);
    }
    byCategory.get(cat)!.push(hit);
  }
  return order.map((category) => ({ category, results: byCategory.get(category)! }));
}

/** Nests a section's hits by page (URL with any `#anchor` stripped), so
 * several matched headings on one page collapse under one parent row
 * instead of repeating that page's title. The parent hit is a title or
 * intro-paragraph match if one exists; otherwise one is synthesized
 * (just the page's title/link) so a single mid-page heading match isn't
 * swallowed into an unlabeled parent. */
function groupByPage(hits: AlgoliaHit[]): PageGroup[] {
  const order: string[] = [];
  const byUrl = new Map<string, AlgoliaHit[]>();
  for (const hit of hits) {
    const url = hit.url.split('#')[0];
    if (!byUrl.has(url)) {
      byUrl.set(url, []);
      order.push(url);
    }
    byUrl.get(url)!.push(hit);
  }
  return order.map((url) => {
    const pageHits = byUrl.get(url)!;
    const title = pageHits[0].hierarchy.lvl1 ?? pageHits[0].url;
    const explicitHead = pageHits.find((h) => h.type === 'lvl1') ?? pageHits.find((h) => h.type === 'content' && hitPath(h) === '');
    if (explicitHead) {
      return { url, title, headHit: explicitHead, syntheticHead: false, children: pageHits.filter((h) => h !== explicitHead) };
    }
    const syntheticHead: AlgoliaHit = { objectID: `${url}::page`, url, hierarchy: { lvl1: title }, type: 'lvl1' };
    return { url, title, headHit: syntheticHead, syntheticHead: true, children: pageHits };
  });
}

/** A child row's title: the matched heading, or for a content hit, its
 * nearest ancestor heading (falling back to the snippet). */
function childTitleHtml(hit: AlgoliaHit): string {
  if (hit.type !== 'content') return hitDetailHtml(hit) ?? renderHighlighted(hit.hierarchy.lvl1 ?? hit.url);
  for (let i = HEADING_LEVELS.length - 1; i >= 1; i -= 1) {
    const lvl = HEADING_LEVELS[i];
    const value = hit._highlightResult?.hierarchy?.[lvl]?.value ?? hit.hierarchy[lvl];
    if (value) return renderHighlighted(value);
  }
  return renderHighlighted(hit._snippetResult?.content?.value ?? hit.hierarchy.lvl1 ?? hit.url);
}

function SearchIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function HitIcon({ heading }: { heading: boolean }): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {heading ? (
        <path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" />
      ) : (
        <>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
        </>
      )}
    </svg>
  );
}

export default function SearchModal({
  onClose,
  initialQuery = '',
}: {
  onClose: () => void;
  /** Pre-fills and runs the query immediately (e.g. from HeroSearch, so
   * someone can type before the modal even opens). */
  initialQuery?: string;
}): ReactNode {
  const {
    siteConfig: { themeConfig, baseUrl, customFields },
  } = useDocusaurusContext();
  const { appId, apiKey, indexName } = (themeConfig as { algolia?: { appId: string; apiKey: string; indexName: string } }).algolia ?? {};
  const client = useMemo(() => (appId && apiKey ? algoliasearch(appId, apiKey) : null), [appId, apiKey]);
  const history = useHistory();
  // Same source/fallback SidebarProductHeader reads this from.
  const crossProductBase = (customFields?.crossProductBase as string) || '/integration-platform/docs/';

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [product, setProduct] = useState('all');
  const [results, setResults] = useState<AlgoliaHit[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState<number | null>(null);
  /** The true match count (uncapped), unlike `results.length` which is
   * capped at RESULT_LIMIT -- lets the UI say "Showing 20 of 54". */
  const [filteredTotal, setFilteredTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  /** Group categories expanded via "Show more" -- reset per query/
   * product change so it doesn't carry over to the next search. */
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const open = useCallback(
    (hit: AlgoliaHit) => {
      const target = hitTargetPath(hit, crossProductBase);
      // Cross-product hit: real navigation, not history.push -- see
      // ResultLink's own docstring.
      if (target.startsWith(baseUrl)) {
        history.push(target);
      } else {
        window.location.assign(target);
      }
      onClose();
    },
    [history, onClose, baseUrl, crossProductBase],
  );

  // visibleResults flattens only the pages actually shown (respecting
  // "Show more"), so `active`/arrow keys never land on a hit hidden
  // behind a collapsed group.
  const grouped = useMemo(
    () => groupBySection(results, product === 'all').map((g) => ({ category: g.category, pages: groupByPage(g.results) })),
    [results, product],
  );
  const visibleResults = useMemo(
    () =>
      grouped.flatMap((g) => {
        const pages = expandedGroups.has(g.category) ? g.pages : g.pages.slice(0, GROUP_PREVIEW_LIMIT);
        return pages.flatMap((p) => [p.headHit, ...p.children]);
      }),
    [grouped, expandedGroups],
  );

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Document-level: a focused product pill would otherwise stop
  // receiving these keys if the handler were scoped to the input.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, visibleResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (
        e.key === 'Enter' &&
        visibleResults[active] &&
        // Only from the input/tabs -- elsewhere Enter should do its own
        // thing (expand "Show more", activate Clear/Esc).
        (e.target === inputRef.current || tabsRef.current?.contains(e.target as Node))
      ) {
        e.preventDefault();
        open(visibleResults[active]);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, visibleResults, active, open]);

  useEffect(() => {
    const q = query.trim();
    if (!q || !client || !indexName) {
      setResults([]);
      setProductCounts({});
      setTotalCount(null);
      setFilteredTotal(null);
      setExpandedGroups(new Set());
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const baseRequest = {
        indexName,
        query: q,
        hitsPerPage: RESULT_LIMIT,
        attributesToSnippet: ['content:20'],
        attributesToHighlight: ['hierarchy', 'content'],
        // Matches HL_OPEN/HL_CLOSE so renderHighlighted knows exactly
        // what to convert.
        highlightPreTag: HL_OPEN,
        highlightPostTag: HL_CLOSE,
        // Raises the index's own defaults (3/7) -- short acronyms
        // (ICP, MCP, API) were fuzzy-matching 1-typo-off unrelated text.
        minWordSizefor1Typo: 5,
        minWordSizefor2Typos: 9,
      };
      // Current-version only, across every product tab -- otherwise a
      // versioned wso2-integrator page appears once per version.
      const filters = ['version:current', ...(product !== 'all' ? [`product:${product}`] : [])];
      // Same query/version, no product filter -- just for each pill's
      // own count, independent of which tab is selected.
      const countsRequest = {
        indexName,
        query: q,
        hitsPerPage: 0,
        facets: ['product'],
        facetFilters: ['version:current'],
        minWordSizefor1Typo: 5,
        minWordSizefor2Typos: 9,
      };
      try {
        // A genuine failure (network, rate limit) throws here and skips
        // straight to the outer catch -- the fallback below is only for
        // a response that came back malformed, not one that never came
        // back at all (retrying it would likely fail the same way).
        let { results: responses } = await client.search<AlgoliaHit>({
          requests: [{ ...baseRequest, facetFilters: filters }, countsRequest],
        });
        // product/version need attributesForFaceting set in the Algolia
        // dashboard; a crawler re-run doesn't apply that retroactively,
        // and v5's client doesn't always throw for a missing facet --
        // it can come back as an object with no `hits`. Falls back to
        // an unfiltered request (no counts) instead of a false "no
        // results".
        if (!(responses?.[0] && 'hits' in responses[0])) {
          console.warn(`[search] facetFilters/facets on "product"/"version" returned no usable response -- are both declared in the index's attributesForFaceting? Falling back to unfiltered results with no counts.`);
          const fallback = await client.search<AlgoliaHit>({ requests: [baseRequest] });
          responses = fallback.results;
        }
        if (cancelled) return;
        const mainResponse = responses?.[0] as { hits?: AlgoliaHit[]; nbHits?: number } | undefined;
        const hits = mainResponse?.hits ?? [];
        const countsResponse = responses?.[1] as { facets?: { product?: Record<string, number> }; nbHits?: number } | undefined;
        setResults(hits);
        setProductCounts(countsResponse?.facets?.product ?? {});
        setTotalCount(countsResponse?.nbHits ?? null);
        setFilteredTotal(mainResponse?.nbHits ?? null);
        setExpandedGroups(new Set());
        setActive(0);
      } catch (err) {
        // The fallback request itself failing (a real outage, not the
        // facet case above, which already recovers) -- clear results
        // instead of leaving the previous query's stale ones on screen.
        if (cancelled) return;
        console.warn('[search] Algolia request failed', err);
        setResults([]);
        setProductCounts({});
        setTotalCount(null);
        setFilteredTotal(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, product, client, indexName]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, visibleResults]);

  const placeholder = translate({ id: 'wso2.search.placeholder', message: 'Search documentation' });
  const hasQuery = query.trim().length > 0;

  return createPortal(
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={placeholder}>
        <div className={styles.header}>
          <span className={styles.headerIcon}>
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            placeholder={placeholder}
            aria-label={placeholder}
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {hasQuery && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}>
              Clear
            </button>
          )}
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
            Esc
          </button>
        </div>

        <div className={styles.tabs} ref={tabsRef} aria-label="Filter by product">
          {PRODUCTS.map((p) => {
            const count = p.key === 'all' ? totalCount : productCounts[p.key];
            return (
              <button
                key={p.key}
                type="button"
                aria-pressed={product === p.key}
                className={styles.tab}
                data-active={product === p.key}
                onClick={() => setProduct(p.key)}>
                {p.label}
                {/* Omitted, not "(0)", when not yet computed. */}
                {typeof count === 'number' && <span className={styles.tabCount}>{count}</span>}
              </button>
            );
          })}
        </div>

        {hasQuery && (
          <div className={styles.body}>
            {results.length > 0 ? (
              <ul ref={listRef} className={styles.results}>
                {grouped.map((group) => {
                  const isExpanded = expandedGroups.has(group.category);
                  const shownPages = isExpanded ? group.pages : group.pages.slice(0, GROUP_PREVIEW_LIMIT);
                  const remainingPages = group.pages.length - shownPages.length;
                  const totalHits = group.pages.reduce((n, p) => n + 1 + p.children.length, 0);
                  return (
                    <li key={group.category} className={styles.group}>
                      <span className={styles.groupHeader}>
                        {group.category}
                        <span className={styles.groupCount}>
                          {totalHits} {totalHits === 1 ? 'result' : 'results'}
                        </span>
                      </span>
                      <ul className={styles.groupList}>
                        {shownPages.map((page) => {
                          const headIndex = visibleResults.indexOf(page.headHit);
                          const description = !page.syntheticHead && page.headHit.type === 'content' ? hitDetailHtml(page.headHit) : null;
                          return (
                            <li key={page.url} className={styles.page}>
                              <ResultLink
                                target={hitTargetPath(page.headHit, crossProductBase)}
                                baseUrl={baseUrl}
                                className={styles.hit}
                                active={headIndex === active}
                                onMouseMove={() => setActive(headIndex)}
                                onClick={onClose}>
                                <span className={styles.hitIcon}>
                                  <HitIcon heading={false} />
                                </span>
                                <span className={styles.hitText}>
                                  <span className={styles.hitTitle} dangerouslySetInnerHTML={{ __html: hitTitleHtml(page.headHit) }} />
                                  {description && <span className={styles.hitPath} dangerouslySetInnerHTML={{ __html: description }} />}
                                </span>
                                <span className={styles.hitOpen} aria-hidden="true">
                                  Open <kbd>↵</kbd>
                                </span>
                              </ResultLink>
                              {page.children.length > 0 && (
                                <ul className={styles.children}>
                                  {page.children.map((hit) => {
                                    const i = visibleResults.indexOf(hit);
                                    return (
                                      <li key={hit.objectID}>
                                        <ResultLink
                                          target={hitTargetPath(hit, crossProductBase)}
                                          baseUrl={baseUrl}
                                          className={styles.childHit}
                                          active={i === active}
                                          onMouseMove={() => setActive(i)}
                                          onClick={onClose}>
                                          <span className={styles.childIcon}>
                                            <HitIcon heading={true} />
                                          </span>
                                          <span className={styles.hitText}>
                                            <span className={styles.hitTitle} dangerouslySetInnerHTML={{ __html: childTitleHtml(hit) }} />
                                            <span className={styles.childPageLabel}>{page.title}</span>
                                          </span>
                                          <span className={styles.hitOpen} aria-hidden="true">
                                            Open <kbd>↵</kbd>
                                          </span>
                                        </ResultLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      {remainingPages > 0 && (
                        <button
                          type="button"
                          className={styles.showMore}
                          onClick={() =>
                            setExpandedGroups((prev) => {
                              const next = new Set(prev);
                              next.add(group.category);
                              return next;
                            })
                          }>
                          Show {remainingPages} more {remainingPages === 1 ? 'page' : 'pages'}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className={styles.empty}>{loading ? 'Searching…' : `No results for “${query.trim()}”`}</p>
            )}
            {/* True match count vs. the capped `results.length`. */}
            {filteredTotal !== null && filteredTotal > results.length && (
              <p className={styles.resultsTruncated}>
                Showing {results.length} of {filteredTotal} results. Refine your search to narrow it down.
              </p>
            )}
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.hint}>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            to navigate
          </span>
          <span className={styles.hint}>
            <kbd>↵</kbd>
            to open
          </span>
          <span className={styles.footerSpacer} />
          <span>Searching across every WSO2 Integration Platform product</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
