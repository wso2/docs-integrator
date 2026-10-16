import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';
import { PaletteGrid, PaletteCard } from '@site/src/components/PaletteCard';
import type { PaletteIconName } from '@site/src/components/PaletteIcon';

import styles from './styles.module.css';

/**
 * One card per guide (not one card per subsection), with a search box
 * that filters across them. Two usages:
 *
 * - `<GuidesCatalog />` on the top-level Guides page: every category,
 *   each under its own "How to Guides" / "Business Use Cases" /
 *   "Tutorials" heading, with a search box (across all guides) that
 *   hides a section along with its grid once a search leaves it empty.
 * - `<GuidesCatalog category="how-to" />` (or "business" / "tutorial") on
 *   a category's own landing page, if a branch has one: just a plain grid of that category's
 *   cards, no heading (the page already has one, its `# Title`) and no
 *   search box (a search over 2-7 items doesn't earn its keep, and
 *   without it these pages read as a distinct "browse this category"
 *   view instead of a smaller echo of the top-level page). This is
 *   what keeps those two pages from needing their own hand-written
 *   guide list, same single-source-of-truth reasoning as the top-level
 *   page.
 *
 * The search text lives in the URL as `?q=...` (kept alongside any `#section`
 * hash), so a filtered view can be shared as a link, e.g.
 * /guides/overview?q=slack or /guides/overview?q=slack#tutorials. It is read
 * back after mount rather than during render, so the server-rendered HTML
 * (which has no query string) and the first client render match.
 *
 * The guide list itself comes from guidesCatalogPlugin (plain JS, see
 * its own docstring for why -- so its GuideCardData shape is
 * redeclared here rather than imported), which reads it straight out
 * of each guide doc's own frontmatter -- adding a new guide card is
 * just adding the right frontmatter to its doc, nothing here needs
 * editing. Keep this type in sync with that plugin's `cards.push({...})`
 * shape if it ever changes.
 */
type GuideCategory = 'how-to' | 'business' | 'tutorial';

type Guide = {
  title: string;
  href: string;
  icon: string;
  summary: string;
  keywords: string[];
  category: GuideCategory;
};

// `id` is the section heading's anchor, so a type can be shared as a link:
// /guides/overview#tutorials, #how-to-guides or #business-use-cases.
const SECTIONS: { category: GuideCategory; heading: string; id: string }[] = [
  { category: 'how-to', heading: 'How to Guides', id: 'how-to-guides' },
  { category: 'business', heading: 'Business Use Cases', id: 'business-use-cases' },
  { category: 'tutorial', heading: 'Tutorials', id: 'tutorials' },
];

function SearchIcon(): ReactNode {
  return (
    <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ClearIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function GuideCard({ guide }: { guide: Guide }): ReactNode {
  return (
    <PaletteCard icon={guide.icon as PaletteIconName} href={guide.href}>
      <h3 className="palette-card-title">{guide.title}</h3>
      <ul className="palette-card-list">
        <li>{guide.summary}</li>
      </ul>
    </PaletteCard>
  );
}

export default function GuidesCatalog({ category }: { category?: GuideCategory } = {}): ReactNode {
  const allGuides = usePluginData('guides-catalog-plugin') as Guide[];

  // Single-category usage: a plain grid, no search, no heading -- see
  // this component's own docstring for why.
  if (category) {
    const guides = allGuides.filter((g) => g.category === category);
    return (
      <PaletteGrid>
        {guides.map((g) => (
          <GuideCard key={g.href} guide={g} />
        ))}
      </PaletteGrid>
    );
  }

  return <SearchableGuides guides={allGuides} />;
}

function SearchableGuides({ guides: allGuides }: { guides: Guide[] }): ReactNode {
  const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useState('');

  // Adopt ?q= from the URL: on load, and on back/forward navigation.
  useEffect(() => {
    setSearch(new URLSearchParams(location.search).get('q') ?? '');
  }, [location.search]);

  // Update the box and the URL together. `replace`, not `push`, so typing
  // doesn't add a history entry per keystroke.
  const updateSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(location.search);
    if (value) params.set('q', value);
    else params.delete('q');
    const qs = params.toString();
    history.replace({ pathname: location.pathname, search: qs ? `?${qs}` : '', hash: location.hash });
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allGuides;
    return allGuides.filter(
      (g) =>
        g.title.toLowerCase().includes(query) ||
        g.summary.toLowerCase().includes(query) ||
        g.keywords.some((k) => k.toLowerCase().includes(query)),
    );
  }, [allGuides, search]);

  const resultCount = filtered.length;

  return (
    <div className={styles.guidesCatalog}>
      <div className={styles.searchWrapper}>
        <SearchIcon />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search guides by name or description..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          aria-label="Search guides"
        />
        {search && (
          <button className={styles.clearButton} onClick={() => updateSearch('')} aria-label="Clear search" type="button">
            <ClearIcon />
          </button>
        )}
      </div>

      {search && (
        <p className={styles.resultCount}>
          {resultCount === 0 ? 'No guides match your search.' : `${resultCount} guide${resultCount === 1 ? '' : 's'} found`}
        </p>
      )}

      {SECTIONS.map(({ category: sectionCategory, heading, id }) => {
        const guides = filtered.filter((g) => g.category === sectionCategory);
        if (guides.length === 0) return null;
        return (
          <div key={sectionCategory}>
            <Heading as="h2" id={id}>
              {heading}
            </Heading>
            <PaletteGrid>
              {guides.map((g) => (
                <GuideCard key={g.href} guide={g} />
              ))}
            </PaletteGrid>
          </div>
        );
      })}
    </div>
  );
}
