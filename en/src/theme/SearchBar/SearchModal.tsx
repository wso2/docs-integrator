/**
 * Command-palette style search dialog opened by the navbar's search icon:
 * a blurred backdrop, one input (search icon + "Search documentation"
 * placeholder, no title), live results, and a keyboard-hint footer.
 *
 * Reuses @easyops-cn/docusaurus-search-local's own index and web worker
 * (the same ones its stock SearchBar and /search page use), so results,
 * ranking, and highlighting are identical -- only the presentation
 * differs. The worker only exists in production builds (the plugin's own
 * limitation), so `docusaurus start` shows a notice instead of results.
 */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { useActivePlugin, useActiveVersion } from '@docusaurus/plugin-content-docs/client';
import { fetchIndexesByWorker, searchByWorker } from '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker';
import { highlight } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight';
import { highlightStemmed } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed';
import { getStemmedPositions } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions';
import { concatDocumentPath } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/concatDocumentPath';

import styles from './SearchModal.module.css';

// Mirrors the plugin's SearchDocumentType enum (dist/client/shared/interfaces).
const TYPE_HEADING = 1;
const TYPE_KEYWORDS = 3;
const TYPE_ASK_AI = 5;
const RESULT_LIMIT = 20;

interface SearchResult {
  document: { i: number; t: string; s?: string; u: string; h?: string; b?: string[] };
  type: number;
  page?: { t: string; b?: string[] };
  tokens: string[];
  metadata: Record<string, unknown>;
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

function hitTitleHtml(r: SearchResult): string {
  return r.type === TYPE_KEYWORDS
    ? highlight(r.document.s, r.tokens)
    : highlightStemmed(r.document.t, getStemmedPositions(r.metadata, 't'), r.tokens);
}

function hitPath(r: SearchResult): string {
  const items = r.page
    ? (r.page.b ?? []).concat(r.page.t).concat(!r.document.s || r.document.s === r.page.t ? [] : r.document.s)
    : (r.document.b ?? []);
  return concatDocumentPath(items);
}

export default function SearchModal({ onClose }: { onClose: () => void }): ReactNode {
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();
  const activePlugin = useActivePlugin();
  const activeVersion = useActiveVersion(activePlugin?.pluginId);
  const versionUrl = activeVersion && !activeVersion.isLast ? `${activeVersion.path}/` : baseUrl;
  const history = useHistory();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const isProd = process.env.NODE_ENV === 'production';

  useEffect(() => {
    inputRef.current?.focus();
    fetchIndexesByWorker(versionUrl, '');
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [versionUrl]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const found: SearchResult[] = await searchByWorker(versionUrl, '', q, RESULT_LIMIT);
      if (cancelled) return;
      setResults((found ?? []).filter((r) => r.type !== TYPE_ASK_AI));
      setActive(0);
      setLoading(false);
    }, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, versionUrl]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, results]);

  const open = useCallback(
    (r: SearchResult) => {
      history.push(r.document.u + (r.document.h ?? ''));
      onClose();
    },
    [history, onClose],
  );

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      open(results[active]);
    }
  };

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
            onKeyDown={onInputKeyDown}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {hasQuery && (
          <div className={styles.body}>
            {results.length > 0 ? (
              <ul ref={listRef} className={styles.results}>
                {results.map((r, i) => (
                  <li key={`${r.document.i}-${r.type}`}>
                    <Link
                      to={r.document.u + (r.document.h ?? '')}
                      className={styles.hit}
                      data-active={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={onClose}>
                      <span className={styles.hitIcon}>
                        <HitIcon heading={r.type === TYPE_HEADING} />
                      </span>
                      <span className={styles.hitText}>
                        <span className={styles.hitTitle} dangerouslySetInnerHTML={{ __html: hitTitleHtml(r) }} />
                        <span className={styles.hitPath}>{hitPath(r)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>
                {loading
                  ? 'Searching…'
                  : isProd
                    ? `No results for “${query.trim()}”`
                    : 'Search only works in a production build (npm run build, then npm run serve).'}
              </p>
            )}
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.hint}>
            <kbd>↓</kbd>
            <kbd>↑</kbd>
            Navigate
          </span>
          <span className={styles.hint}>
            <kbd>↵</kbd>
            Select
          </span>
          <span className={styles.hint}>
            <kbd>esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
