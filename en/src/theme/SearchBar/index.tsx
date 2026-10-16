/**
 * The navbar search entry point. Always opens SearchModal (a
 * blurred-backdrop search dialog) -- only the trigger's shape changes:
 * from 1800px up there is room between FAQ and the icon row for a
 * search-bar-shaped trigger ("Search documentation" placeholder); below
 * that it collapses to a 2rem icon button so it never crowds FAQ (see
 * Navbar/Content/styles.module.css for the layout it sits in).
 *
 * The breakpoint is a real, tunable `window.matchMedia` -- not
 * Docusaurus's own binary `useWindowSize()` (~996px mobile/desktop
 * split). Same `matchMedia` + `change`-listener pattern, and the same
 * SSR-safety reasoning (default to the wide form before hydration, then
 * swap down once the client confirms a narrow viewport), as
 * DocRoot/Layout/Sidebar/index.tsx's own icon-rail auto-collapse.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';

import SearchModal from './SearchModal';
import styles from './styles.module.css';

function useIsNarrowNavbar(breakpointPx: number): boolean {
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const applyForMatch = (matches: boolean) => setIsNarrow(matches);
    applyForMatch(mql.matches);
    const listener = (e: MediaQueryListEvent) => applyForMatch(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isNarrow;
}

function SearchTrigger({ wide }: { wide: boolean }): ReactNode {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const label = translate({
    id: 'theme.SearchBar.label',
    message: 'Search',
    description: 'The ARIA label and placeholder for search button',
  });

  // Ctrl/Cmd+K opens the dialog from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Icon form: no visible text (see .trigger in styles.module.css);
  // `aria-label` carries the accessible name. Wide form: an input-shaped
  // button with the placeholder text (.triggerWide).
  return (
    <>
      <button
        type="button"
        className={`navbar__search-input ${wide ? styles.triggerWide : styles.trigger}`}
        aria-label={label}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}>
        {wide && <span className={styles.triggerText}>Search documentation</span>}
      </button>
      {open && <SearchModal onClose={close} />}
    </>
  );
}

export default function SearchBar(): ReactNode {
  const isNarrow = useIsNarrowNavbar(1799);
  return <SearchTrigger wide={!isNarrow} />;
}
