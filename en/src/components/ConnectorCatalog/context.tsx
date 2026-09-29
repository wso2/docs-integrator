import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Plain useLayoutEffect warns during Docusaurus's server-side static
// generation ("useLayoutEffect does nothing on the server") -- SSG has
// no browser to paint a flash in anyway, so fall back to useEffect
// there and only use the real layout effect once actually in a browser.
const useIsomorphicLayoutEffect = ExecutionEnvironment.canUseDOM ? useLayoutEffect : useEffect;

export interface Connector {
  name: string;
  description: string;
  operations: string;
  auth: string;
  link: string;
  category: string;
  icon?: string;
}

export const SORTS = ['Popular', 'A–Z', 'Most operations'] as const;
export type Sort = (typeof SORTS)[number];

export const PAGE_SIZE = 12;

interface CatalogData {
  connectors: Connector[];
  categories: string[];
}

interface CatalogContextValue {
  data: CatalogData | null;
  setData: (data: CatalogData | null) => void;
  query: string;
  setQuery: (q: string) => void;
  selectedCats: string[];
  toggleCategory: (cat: string) => void;
  sort: Sort;
  setSort: (s: Sort) => void;
  limit: number;
  loadMore: () => void;
  clearAll: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

/**
 * Mounted once, globally, at Root.js (shared across every product
 * branch) -- the actual catalog data only exists inside the MDX page
 * that renders <ConnectorCatalog> (wso2-connectors only), but the
 * filter rail needs to live in the TOC slot (a completely separate
 * sibling in DocItem/Layout's row, not a descendant of the MDX content).
 * A page-scoped local state can't bridge two sibling render trees, so
 * this is a real context instead -- inert (data: null) on every branch
 * that never calls useCatalogRegister.
 *
 * This file (and Filters.tsx) is shared/synced like the rest of the
 * theme even though ConnectorCatalog/index.tsx itself is per-branch
 * content -- Root.js and TOC/index.tsx (both shared) import from here,
 * so it has to exist identically on every branch for those to compile.
 */
export function CatalogProvider({ children }: { children: ReactNode }): ReactNode {
  const [data, setData] = useState<CatalogData | null>(null);
  const [query, setQueryState] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>('Popular');
  const [limit, setLimit] = useState(PAGE_SIZE);

  const setQuery = (q: string) => {
    setQueryState(q);
    setLimit(PAGE_SIZE);
  };
  const toggleCategory = (cat: string) => {
    setSelectedCats((cur) => (cur.includes(cat) ? cur.filter((c) => c !== cat) : [...cur, cat]));
    setLimit(PAGE_SIZE);
  };
  const clearAll = () => {
    setSelectedCats([]);
    setQueryState('');
    setLimit(PAGE_SIZE);
  };
  const loadMore = () => setLimit((l) => l + PAGE_SIZE);

  const value = useMemo<CatalogContextValue>(
    () => ({ data, setData, query, setQuery, selectedCats, toggleCategory, sort, setSort, limit, loadMore, clearAll }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, query, selectedCats, sort, limit],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

/** Called by <ConnectorCatalog> to publish its MDX-provided data into the
 * shared context, and clear it again on unmount (navigating away).
 * useLayoutEffect, not useEffect: registering happens in an effect
 * either way (the data isn't known until this component mounts), but a
 * plain useEffect can let the browser paint the "no data yet" frame
 * first -- the filter rail would flash empty, then pop in a moment
 * later. useLayoutEffect runs before that paint, so the empty frame
 * never actually reaches the screen. */
export function useCatalogRegister(connectors: Connector[], categories: string[]): void {
  const ctx = useContext(CatalogContext);
  useIsomorphicLayoutEffect(() => {
    ctx?.setData({ connectors, categories });
    return () => ctx?.setData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectors, categories]);
}

function opsCount(operations: string): number {
  return operations.split(',').filter((s) => s.trim().length > 0).length;
}

/** Derived, memoized view over the raw context -- both the grid (main
 * content) and the filter rail (TOC slot) call this so the filtering/
 * sorting/counting logic exists in exactly one place. Returns null when
 * there's no registered catalog data (any page other than the catalog). */
export function useCatalog() {
  const ctx = useContext(CatalogContext);
  const data = ctx?.data;

  return useMemo(() => {
    if (!ctx || !data) return null;
    const { connectors, categories } = data;

    const categoryCounts = new Map<string, number>();
    for (const cat of categories) {
      categoryCounts.set(cat, connectors.filter((c) => c.category === cat).length);
    }
    const sortedCategories = [...categories].sort(
      (a, b) => (categoryCounts.get(b) ?? 0) - (categoryCounts.get(a) ?? 0),
    );

    const q = ctx.query.trim().toLowerCase();
    let filtered = connectors.filter((c) => {
      if (
        q &&
        !(
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        )
      ) {
        return false;
      }
      if (ctx.selectedCats.length && !ctx.selectedCats.includes(c.category)) return false;
      return true;
    });
    if (ctx.sort === 'A–Z') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    else if (ctx.sort === 'Most operations') filtered = [...filtered].sort((a, b) => opsCount(b.operations) - opsCount(a.operations));

    return {
      connectors,
      categories,
      categoryCounts,
      sortedCategories,
      filtered,
      query: ctx.query,
      setQuery: ctx.setQuery,
      selectedCats: ctx.selectedCats,
      toggleCategory: ctx.toggleCategory,
      sort: ctx.sort,
      setSort: ctx.setSort,
      limit: ctx.limit,
      loadMore: ctx.loadMore,
      clearAll: ctx.clearAll,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, data]);
}
