/**
 * Wraps @easyops-cn/docusaurus-search-local's own stock SearchPage,
 * adding a floating close ("X") button that returns to wherever the
 * user was before opening search -- browser back, not a fixed link to
 * a specific page, since /search can be reached from any page (the
 * navbar's search input, or SearchBar's icon-only mobile/narrow-navbar
 * trigger, both from wherever you already were). Falls back to the
 * homepage only when there's no in-app history to go back to (e.g.
 * someone opened /search directly via a shared link or bookmark, where
 * a browser back would leave the site entirely).
 *
 * Original: @easyops-cn/docusaurus-search-local's own theme/SearchPage
 * (a plugin-provided theme component, not part of @docusaurus/theme-classic
 * -- there's no stock node_modules/@docusaurus/theme-classic equivalent
 * to diff against or keep in sync with a Docusaurus version bump).
 */
import { useMemo, type ReactNode } from 'react';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import OriginalSearchPage from '@theme-original/SearchPage';

import styles from './styles.module.css';

function CloseIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function SearchPage(): ReactNode {
  const history = useHistory();
  const label = translate({
    id: 'theme.SearchPage.closeButtonLabel',
    message: 'Close search',
    description: 'The ARIA label for the button that closes the search page and returns to the page you were on before',
  });
  // `window.history.length` also counts entries from before this site
  // was ever loaded, so this is a "probably has somewhere to go back
  // to" heuristic, not a guarantee -- good enough here since the
  // fallback (a link to the homepage) is a perfectly reasonable place
  // to land either way, never a dead end.
  const hasPriorPage = useMemo(() => typeof window !== 'undefined' && window.history.length > 1, []);

  return (
    <>
      {hasPriorPage ? (
        <button type="button" className={styles.closeButton} onClick={() => history.goBack()} aria-label={label} title={label}>
          <CloseIcon />
        </button>
      ) : (
        <Link to="/" className={styles.closeButton} aria-label={label} title={label}>
          <CloseIcon />
        </Link>
      )}
      <OriginalSearchPage />
    </>
  );
}
