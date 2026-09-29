import React, { useMemo, useState } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { CATEGORIES, ARTIFACTS, type ArtifactCategoryKey } from './data';
import { INLINE_ICONS } from './inlineIcons';
import styles from './styles.module.css';

/**
 * Renders a monochrome glyph icon inline (so its fill="currentColor"
 * adapts to light/dark theme via CSS) if one exists for this file,
 * otherwise falls back to a plain <img> for icons that ARE a real,
 * fixed-color brand mark (Solace, MySQL, Azure, ...) and should stay
 * exactly as vendored, not be recolored. `src` must already be
 * baseUrl-resolved (see ArtifactPicker's own withBaseUrl use below) --
 * this component doesn't resolve it itself.
 */
function ArtifactIcon({ src, className }: { src: string; className?: string }): React.ReactElement {
  const key = src.split('/').pop()?.replace(/\.svg$/, '') ?? '';
  const inline = INLINE_ICONS[key];
  if (inline) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: inline }} />;
  }
  return <img src={src} alt="" className={className} />;
}

export default function ArtifactPicker(): React.ReactElement {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ArtifactCategoryKey | 'all'>('all');
  // data.ts's href/icon constants are root-relative ('/develop-and-test/...',
  // '/img/artifact-icons') with no baseUrl prefix -- correct on localhost
  // (baseUrl is '/' there) but broken on GitHub Pages, where every
  // product site is served under its own subpath (e.g. '/integration-platform/docs/saas/').
  // withBaseUrl (Docusaurus's own utility, useBaseUrlUtils so it's one
  // hook call up here rather than one per item in the loops below,
  // which the rules of hooks don't allow) prepends that subpath.
  const { withBaseUrl } = useBaseUrlUtils();

  const query = search.trim().toLowerCase();

  const visibleByCategory = useMemo(() => {
    const map = new Map<ArtifactCategoryKey, typeof ARTIFACTS>();
    for (const category of CATEGORIES) {
      if (activeCategory !== 'all' && activeCategory !== category.key) continue;
      const items = ARTIFACTS.filter(
        (a) => a.category === category.key && (!query || a.name.toLowerCase().includes(query)),
      );
      if (items.length > 0) map.set(category.key, items);
    }
    return map;
  }, [activeCategory, query]);

  const resultCount = useMemo(
    () => Array.from(visibleByCategory.values()).reduce((sum, items) => sum + items.length, 0),
    [visibleByCategory],
  );

  return (
    <div className={styles.picker}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search artifacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search artifacts"
          />
          {search && (
            <button className={styles.clearButton} onClick={() => setSearch('')} aria-label="Clear search" type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className={styles.categoryChips}>
          <button
            type="button"
            className={`${styles.chip} ${activeCategory === 'all' ? styles.chipActive : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`${styles.chip} ${activeCategory === c.key ? styles.chipActive : ''}`}
              onClick={() => setActiveCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {resultCount === 0 ? (
        <div className={styles.empty}>
          <p>No artifacts found matching your search.</p>
          <button
            type="button"
            className={styles.resetButton}
            onClick={() => {
              setSearch('');
              setActiveCategory('all');
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        CATEGORIES.filter((c) => visibleByCategory.has(c.key)).map((category) => (
          <section key={category.key} className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionIconWrap}>
                  <ArtifactIcon src={withBaseUrl(category.icon)} className={styles.sectionIcon} />
                </span>
                <h3 className={styles.sectionTitle}>{category.label}</h3>
              </div>
              <p className={styles.sectionDesc}>{category.description}</p>
            </div>
            <div className={styles.grid}>
              {visibleByCategory.get(category.key)!.map((artifact) => {
                const content = (
                  <>
                    <span className={styles.cardIconWrap}>
                      <ArtifactIcon src={withBaseUrl(artifact.icon)} className={styles.cardIcon} />
                    </span>
                    <span className={styles.cardName}>{artifact.name}</span>
                    {artifact.beta && <span className={styles.betaBadge}>Beta</span>}
                    {artifact.generated && (
                      <span className={styles.generatedBadge} title="Page written by research agents, not yet checked against the real product UI">
                        Generated
                      </span>
                    )}
                  </>
                );
                return artifact.href ? (
                  <a key={artifact.name} href={withBaseUrl(artifact.href)} className={styles.card}>
                    {content}
                  </a>
                ) : (
                  <div key={artifact.name} className={`${styles.card} ${styles.cardDisabled}`} title="Documentation coming soon">
                    {content}
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
