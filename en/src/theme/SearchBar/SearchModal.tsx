/**
 * Command-palette style search dialog opened by the navbar's search icon:
 * a blurred backdrop, one input (search icon + "Search documentation"
 * placeholder, no title), live results, and a keyboard-hint footer.
 *
 * Queries Algolia directly (via themeConfig.algolia -- see
 * sharedAlgoliaSearch's own docstring in themeConfig.ts for why this
 * replaced @easyops-cn/docusaurus-search-local: one index crawled across
 * every product, instead of each product's build only ever seeing its
 * own pages). Unlike the local-search worker this replaced, Algolia's
 * API works identically in `docusaurus start` and a production build --
 * no more dev-only "search doesn't work here" notice.
 *
 * Each hit's title is always its page's own h1 (`hierarchy.lvl1`, set by
 * the crawler's recordExtractor) regardless of which heading/paragraph
 * on that page actually matched, so results read as "which page",
 * consistently -- the matched location (a specific heading, or a
 * content snippet) renders underneath as the path/detail line.
 *
 * The product tabs key off a `product` facet (`saas` | `integrator` |
 * `connectors` | `agent-builder`, see PRODUCTS below) the crawler's
 * recordExtractor stamps on every record from its URL. `version` is a
 * second facet, wso2-integrator-specific (the only versioned product)
 * -- `next` for unreleased docs, an explicit X.Y.Z for an older pinned
 * release, `current` for the default/latest release served at the bare
 * path. Search always filters to `version:current`, with no UI to see
 * other versions yet -- otherwise the same page shows up once per
 * version it exists at, which reads as "the same result over and over"
 * rather than the near-duplicates they actually are (confirmed the hard
 * way: `distinct`/`attributeForDistinct: url` doesn't help here, since
 * each version is a genuinely different URL).
 *
 * Result grouping, unlike the tabs, does NOT use the `product` facet --
 * it groups by sidebar section instead (see hitSection's own docstring),
 * matching the old local-search-based SearchModal's own grouping, which
 * this rewrite initially dropped (grouping by product instead) before
 * that turned out to be a real regression: once a product tab narrows
 * results to one product, every group would share the same header,
 * making the grouping pointless. The crawler has no equivalent to
 * Docusaurus's own sidebar category tree (it only sees a page's own
 * heading structure), so the section is derived from the hit's own URL
 * client-side instead, with no crawler involvement at all.
 *
 * Both facets need to exist in the index's own attributesForFaceting
 * setting (Algolia dashboard, not this file) for any of this to work --
 * a crawler re-run alone doesn't reliably apply that to an index that
 * already existed before the facet was added to its config, confirmed
 * the hard way too. See the `console.warn` below for the fallback this
 * degrades to when that's not (yet) the case.
 *
 * Within each section, hits are nested one level further by page
 * (groupByPage): multiple headings matching on the same page collapse
 * under one page-level parent row instead of repeating that page's
 * title on every row (the docsearch-style "page > matched headings"
 * layout). See groupByPage's own docstring for how the parent hit is
 * chosen/synthesized.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { liteClient as algoliasearch } from 'algoliasearch/lite';

import styles from './SearchModal.module.css';

// Raised from 20: at 20, one heavily-matched section (e.g. "Observe" for
// a monitoring-tool query) could fill the entire fetched set, pushing
// every other relevant section out of the results entirely -- not just
// off-screen, genuinely never fetched. GROUP_PREVIEW_LIMIT below keeps
// the initial render just as compact despite fetching more.
const RESULT_LIMIT = 50;
// Each sidebar-section group shows at most this many PAGES up front
// (not raw hits -- a page with several matched headings still counts as
// one), with a "Show more" button revealing the rest of that group's
// already-fetched pages -- so the first screenful represents every
// matching section instead of one section's results crowding the
// others out entirely.
const GROUP_PREVIEW_LIMIT = 4;
const HEADING_LEVELS = ['lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'] as const;

/** `key: 'all'` applies no facet filter; every other key maps straight
 * to the `product` facet value the crawler patch assigns (see this
 * file's own docstring). Add a product here the moment it's live on a
 * real branch -- wso2-agent-builder isn't yet (see MEMORY.md's own
 * "Agent Builder not live" note), so it's deliberately left out until
 * then, not because the facet scheme couldn't support it today. When
 * it's added, its key stays `agent-builder` (must match the real URL
 * path segment the crawler derives `product` from), but its label
 * should be `'AB'`, not `'Agent Builder'` -- the other labels are full
 * words today, but that was this product's own call once it's live. */
const PRODUCTS: { key: string; label: string }[] = [
  { key: 'all', label: 'All products' },
  { key: 'saas', label: 'WSO2 Cloud' },
  { key: 'integrator', label: 'WSO2 Integrator' },
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
  /** Not emitted by the crawler yet -- see this file's own docstring. */
  product?: string;
  _highlightResult?: { hierarchy?: Partial<Record<string, HighlightField>> };
  _snippetResult?: { content?: HighlightField };
}

/** The page's own title (hierarchy.lvl1) -- always present, always the
 * result's heading, regardless of which level actually matched. */
function hitTitleHtml(hit: AlgoliaHit): string {
  return hit._highlightResult?.hierarchy?.lvl1?.value ?? hit.hierarchy.lvl1 ?? hit.url;
}

/** What actually matched within the page: the specific heading (for a
 * heading-level hit) or a content snippet (for a body-text hit) -- null
 * when the match IS the page title itself (type === 'lvl1'), since
 * showing it twice would be redundant. */
function hitDetailHtml(hit: AlgoliaHit): string | null {
  if (hit.type === 'lvl1') return null;
  if (hit.type === 'content') return hit._snippetResult?.content?.value ?? null;
  return hit._highlightResult?.hierarchy?.[hit.type]?.value ?? hit.hierarchy[hit.type as (typeof HEADING_LEVELS)[number]] ?? null;
}

/** Breadcrumb of intermediate heading levels between the page title and
 * whatever matched, e.g. "Develop and Test > Create an Agent". */
function hitPath(hit: AlgoliaHit): string {
  const matchedLevel = hit.type === 'content' ? undefined : hit.type;
  return HEADING_LEVELS.slice(1)
    .filter((lvl) => lvl !== matchedLevel)
    .map((lvl) => hit.hierarchy[lvl])
    .filter((v): v is string => Boolean(v))
    .join(' › ');
}

/** One page's worth of hits, nested one level under a section: `headHit`
 * is what the parent row links to/displays, `children` are the other
 * matches on that same page, rendered indented underneath it. */
type PageGroup = {
  url: string;
  title: string;
  headHit: AlgoliaHit;
  /** True when no hit in this page's group was actually a page-title or
   * page-intro match -- `headHit` was synthesized purely to carry the
   * page's own title/link, and every real hit is a child. See
   * groupByPage's own docstring. */
  syntheticHead: boolean;
  children: AlgoliaHit[];
};

type ResultGroup = { category: string; pages: PageGroup[] };

const PRODUCT_LABELS: Record<string, string> = Object.fromEntries(PRODUCTS.filter((p) => p.key !== 'all').map((p) => [p.key, p.label]));

/** Derives the sidebar section a hit belongs to from its own URL -- the
 * path segment right after the product (and, for wso2-integrator, after
 * an optional version prefix) -- e.g. ".../integrator/develop-and-test/..."
 * -> "develop and test". Mirrors the crawler's own product/version
 * URL-parsing (see sharedAlgoliaSearch's docstring in themeConfig.ts),
 * done here client-side instead since there's no crawler-side
 * equivalent: the crawler only sees a page's own heading structure, not
 * Docusaurus's sidebar category tree, which is what the old
 * local-search-based grouping actually used (see this file's own
 * docstring for the full "why did grouping change" explanation). */
function hitSection(hit: AlgoliaHit): string {
  const match = hit.url.match(/^https?:\/\/[^/]+\/integration-platform\/docs\/[^/]+\/(?:(?:next|\d+\.\d+\.\d+)\/)?([^/]+)/);
  const slug = match?.[1];
  return slug ? slug.replace(/-/g, ' ') : 'Overview';
}

/** Groups by hitSection (see its own docstring), qualified by product
 * label when results span more than one product (the "All products"
 * tab) -- otherwise, say, "Guides" from two different products would
 * silently merge into one group. Preserves each hit's original rank
 * (first appearance order) -- Algolia's own relevance ordering stays
 * intact within and across groups. */
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

/** Nests a section's hits one level further, by page (URL with any
 * `#anchor` stripped) -- multiple headings matching on the same page
 * collapse under one parent row instead of repeating that page's title
 * on every row.
 *
 * The parent row's hit is whichever of the page's own hits represents
 * "the page itself": a literal title match (`type === 'lvl1'`), or
 * failing that its intro paragraph (`type === 'content'` with no
 * heading ancestor -- `hitPath` empty). Everything else on the page
 * becomes a child row underneath it.
 *
 * When NEITHER exists -- every match on the page is under some heading,
 * nothing matched the title or intro directly -- there's no real hit to
 * use as the parent, so one is synthesized purely to carry the page's
 * own title and link (to the bare page, not any one heading); every
 * actual hit then renders as a child, same as the explicit-head case,
 * so a single mid-page heading match isn't silently swallowed into an
 * un-labelled parent row. */
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

/** A child row's title: for a heading-level hit, the matched heading
 * itself (same as hitDetailHtml); for a content/body-text hit, the
 * nearest ancestor heading above the matched text (deepest first),
 * falling back to the content snippet only when the hit has no heading
 * ancestor at all (shouldn't happen for an actual child -- a childless
 * content hit is picked as the page's own intro by groupByPage instead,
 * never left as a child). */
function childTitleHtml(hit: AlgoliaHit): string {
  if (hit.type !== 'content') return hitDetailHtml(hit) ?? hit.hierarchy.lvl1 ?? hit.url;
  for (let i = HEADING_LEVELS.length - 1; i >= 1; i -= 1) {
    const lvl = HEADING_LEVELS[i];
    const value = hit._highlightResult?.hierarchy?.[lvl]?.value ?? hit.hierarchy[lvl];
    if (value) return value;
  }
  return hit._snippetResult?.content?.value ?? hit.hierarchy.lvl1 ?? hit.url;
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
  /** Pre-fills the query (e.g. from the landing page's HeroSearch, which
   * lets someone type before the modal even opens) and runs it
   * immediately -- same box, same results, wherever it was opened from. */
  initialQuery?: string;
}): ReactNode {
  const {
    siteConfig: { themeConfig },
  } = useDocusaurusContext();
  const { appId, apiKey, indexName } = (themeConfig as { algolia?: { appId: string; apiKey: string; indexName: string } }).algolia ?? {};
  const client = useMemo(() => (appId && apiKey ? algoliasearch(appId, apiKey) : null), [appId, apiKey]);
  const history = useHistory();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [product, setProduct] = useState('all');
  const [results, setResults] = useState<AlgoliaHit[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState<number | null>(null);
  /** The *true* match count for the current query + active filters (not
   * capped at RESULT_LIMIT, unlike `results.length`) -- lets the UI say
   * "Showing 20 of 54" instead of silently truncating with no
   * indication there's more than what's displayed. */
  const [filteredTotal, setFilteredTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  /** Group categories (see groupResults) the user has clicked "Show
   * more" on -- reset per query/product change below, so expanding one
   * group for "icp" doesn't carry over and surprise-expand a
   * same-named group for the next search. */
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const open = useCallback(
    (hit: AlgoliaHit) => {
      history.push(hit.url.replace(/^https?:\/\/[^/]+/, ''));
      onClose();
    },
    [history, onClose],
  );

  // Recomputed here (not inline in the JSX below) so the keyboard-nav
  // effect and the render can both work off the same grouping/expand
  // state -- `visibleResults` specifically exists so `active` indexes
  // into what's actually ON SCREEN, both the page-parent rows and their
  // child rows, flattened back into one list in render order. Indexing
  // into the full `results` array instead would let ArrowDown move
  // `active` past a collapsed group's GROUP_PREVIEW_LIMIT cutoff,
  // highlighting a hit hidden behind its own "Show more" button --
  // nothing visibly selected, arrow keys apparently doing nothing.
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

  // Document-level, not scoped to the input's own onKeyDown -- clicking
  // a product pill (a <button>) moves keyboard focus there, and an
  // input-scoped handler would stop receiving these keys entirely once
  // that happens (confirmed: that's exactly what broke arrow/Enter nav
  // here before this). Escape already worked for this same reason;
  // ArrowUp/ArrowDown/Enter now share the same document listener so all
  // four behave consistently regardless of which element currently has
  // focus, matching a command-palette's usual keyboard model.
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
      } else if (e.key === 'Enter' && visibleResults[active]) {
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
        // Raises the index's own defaults (minWordSizefor1Typo: 3,
        // minWordSizefor2Typos: 7 -- see the crawler config) specifically
        // for this product's docs, which lean on short, acronym-heavy
        // technical terms (ICP, MCP, API, AI). At the default threshold,
        // a 3-letter query like "icp" is already eligible for 1-typo
        // fuzzy matching, which surfaced unrelated pages whose text was
        // one character off -- not a real mention of "ICP" at all,
        // confirmed by checking the actual matched snippet. Per-query
        // override, not an index setting, so it only affects requests
        // from this file.
        minWordSizefor1Typo: 5,
        minWordSizefor2Typos: 9,
      };
      // Always excludes non-current versions (wso2-integrator's `next`
      // and older pinned releases), regardless of which product tab is
      // selected -- otherwise the same page shows up once per version,
      // which reads as "the same result over and over" rather than
      // the near-duplicates they actually are. No "all versions" UI
      // yet -- see this file's own docstring if that's ever wanted.
      const filters = ['version:current', ...(product !== 'all' ? [`product:${product}`] : [])];
      // A second, parallel request -- same query and version filter, no
      // product filter, zero hits returned -- just for each product's
      // count (shown on its pill). Always unfiltered by `product`
      // regardless of which tab is selected, so switching tabs doesn't
      // change the OTHER pills' counts.
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
        let responses;
        try {
          ({ results: responses } = await client.search<AlgoliaHit>({
            requests: [{ ...baseRequest, facetFilters: filters }, countsRequest],
          }));
        } catch {
          responses = undefined;
        }
        // Filtering/faceting on `product`/`version` fails until both are
        // declared in the index's own attributesForFaceting setting
        // (Algolia dashboard -- Configuration -> Facets; NOT something a
        // crawler re-run reliably applies to an index that already
        // existed before the facet was added to its config, confirmed
        // the hard way once). v5's client doesn't always throw for this
        // -- a per-request error can come back as an object with no
        // `hits` property instead, which silently read as "zero hits"
        // here before this check existed, with no visible sign anything
        // was wrong. Falls back to a fully unfiltered request (and skips
        // counts, rather than guessing at them) so a misconfigured facet
        // degrades to "filter/counts don't work" rather than a false
        // "no results".
        if (!(responses?.[0] && 'hits' in responses[0])) {
          if (typeof console !== 'undefined') {
            console.warn(`[search] facetFilters/facets on "product"/"version" returned no usable response -- are both declared in the index's attributesForFaceting? Falling back to unfiltered results with no counts.`);
          }
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
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 120);
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

        <div className={styles.tabs} role="tablist" aria-label="Filter by product">
          {PRODUCTS.map((p) => {
            const count = p.key === 'all' ? totalCount : productCounts[p.key];
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={product === p.key}
                className={styles.tab}
                data-active={product === p.key}
                onClick={() => setProduct(p.key)}>
                {p.label}
                {/* Omitted (not "(0)") when there's no query yet, or the
                    counts request fell back to unfiltered-with-no-counts
                    (see this file's own docstring) -- a missing number
                    reads as "not computed", not "zero results". */}
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
                              <Link
                                to={page.headHit.url.replace(/^https?:\/\/[^/]+/, '')}
                                className={styles.hit}
                                data-active={headIndex === active}
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
                              </Link>
                              {page.children.length > 0 && (
                                <ul className={styles.children}>
                                  {page.children.map((hit) => {
                                    const i = visibleResults.indexOf(hit);
                                    return (
                                      <li key={hit.objectID}>
                                        <Link
                                          to={hit.url.replace(/^https?:\/\/[^/]+/, '')}
                                          className={styles.childHit}
                                          data-active={i === active}
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
                                        </Link>
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
            {/* filteredTotal is the TRUE match count (uncapped, from
                Algolia's own nbHits), while results.length never
                exceeds RESULT_LIMIT -- without this, hitting that cap
                looks like results silently stopped rather than "there's
                more, narrow your search to see it". */}
            {filteredTotal !== null && filteredTotal > results.length && (
              <p className={styles.resultsTruncated}>
                Showing {results.length} of {filteredTotal} results -- refine your search to narrow it down.
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
