import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

import AssistantChat from './index';
import styles from './launcher.module.css';

/**
 * The floating AI Docs Assistant button plus the side panel it opens.
 * Mounted in the shared FloatingActions cluster (src/theme/Root.js), so
 * it's on every page and the conversation survives navigating between
 * pages. The panel slides in over the right side of the page, below the
 * header rows; the page itself doesn't move.
 */

/** Lucide's "bot" icon (https://lucide.dev/icons/bot), ISC-licensed. */
function AssistantButtonIcon(): ReactNode {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

export default function AIAssistantSidePanel(): ReactNode {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {open && (
        <div className={styles.dock}>
          <AssistantChat onClose={close} />
        </div>
      )}
      <button
        type="button"
        className={styles.fab}
        aria-label="AI Docs Assistant"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}>
        <AssistantButtonIcon />
      </button>
    </>
  );
}
