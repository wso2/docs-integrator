import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

export type SearchBarQuickLink = { label: string; sub?: string; to: string };

/**
 * The homepage hero's own search box -- submits to the search-local
 * plugin's `/search` page, same as the persistent one in the navbar
 * (`src/theme/SearchBar`, a separate, always-stock component); this one
 * is bigger, sits in the hero, and adds a "/" keyboard shortcut plus an
 * optional "Popular pages" dropdown. Originally lived inline in
 * `pages/index.tsx` -- pulled out here so a doc page can render a live
 * instance too (see `SearchBarPreview` below and docs/homepage/).
 *
 * Styled for a dark background (white text, translucent white borders)
 * to match the homepage hero it was designed for -- rendering it
 * directly on a plain doc page's light background would make the text
 * unreadable. Use `SearchBarPreview` there instead, which supplies a
 * matching dark frame.
 */
export default function SearchBar({ quickLinks = [] }: { quickLinks?: SearchBarQuickLink[] }): ReactNode {
  const history = useHistory();
  const searchPath = useBaseUrl('/search');
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (e.target as HTMLElement).tagName,
        )
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query.trim()) {
        history.push(`${searchPath}?q=${encodeURIComponent(query.trim())}`);
        setFocused(false);
      }
    },
    [query, history, searchPath],
  );

  return (
    <div ref={wrapperRef} className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchIconButton} aria-label="Search">
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          aria-label="Search documentation"
        />
        <kbd className={styles.searchKbd}>/</kbd>
      </form>

      {/* Quick-links dropdown when focused, empty query, and there's
          something to show -- omitted entirely (no empty box) when the
          caller passes no quickLinks. */}
      {focused && !query && quickLinks.length > 0 && (
        <div className={styles.searchDropdown}>
          <p className={styles.searchDropdownLabel}>Popular pages</p>
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.searchDropdownItem}
              onClick={() => setFocused(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * `SearchBar` wrapped in a frame matching the homepage hero's own navy
 * gradient background -- for embedding a live, correctly-styled instance
 * in a doc page (which is otherwise a plain light/dark theme background,
 * not the hero's fixed dark one). See docs/homepage/homepage.md.
 */
export function SearchBarPreview({ quickLinks }: { quickLinks?: SearchBarQuickLink[] }): ReactNode {
  return (
    <div className={styles.previewFrame}>
      <SearchBar quickLinks={quickLinks} />
    </div>
  );
}
