import React, { useState, useMemo } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

interface Connector {
  name: string;
  description: string;
  operations: string;
  auth: string;
  link: string;
  category: string;
  icon?: string;
}

interface Props {
  connectors: Connector[];
  categories: string[];
}

export default function ConnectorCatalog({ connectors, categories }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return connectors.filter((c) => {
      const matchesCategory =
        selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.operations.toLowerCase().includes(query) ||
        c.auth.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, connectors]);

  const resultCount = filtered.length;

  const catalogBase = useBaseUrl('/connectors/catalog/');

  return (
    <div className={styles.catalog}>
      {/* Search + Filter Bar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search connectors by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search connectors"
          />
          {search && (
            <button
              className={styles.clearButton}
              onClick={() => setSearch('')}
              aria-label="Clear search"
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className={styles.filterRow}>
          <div className={styles.categoryChips}>
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
                {cat === 'All' && (
                  <span className={styles.chipCount}>{connectors.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className={styles.resultsMeta}>
        <span className={styles.resultCount}>
          {resultCount} connector{resultCount !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {search && ` matching "${search}"`}
        </span>
      </div>

      {/* Connector Cards */}
      {resultCount > 0 ? (
        <div className={styles.grid}>
          {filtered.map((c) => (
            <a key={c.name + c.link} href={`${catalogBase}${c.link.endsWith('/') ? c.link : `${c.link}/`}`} className={styles.card}>
              <div className={styles.cardHeader}>
                {c.icon ? (
                  <img
                    src={c.icon}
                    alt=""
                    className={styles.cardIcon}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <span className={styles.cardIconFallback}>{c.name.charAt(0)}</span>
                )}
                <span className={styles.cardName}>{c.name}</span>
                <span className={styles.cardCategory}>{c.category}</span>
              </div>
              <p className={styles.cardDesc}>{c.description}</p>
              <span className={styles.cardLink}>Learn more →</span>
            </a>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No connectors found matching your criteria.</p>
          <button
            type="button"
            className={styles.resetButton}
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
