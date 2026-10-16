import { useState, useRef, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { railIconFor } from '@site/src/theme/DocSidebar/Desktop/icons';

import styles from './styles.module.css';

export interface ExploreItem {
  /** Also used to look up an icon via railIconFor -- reuse the sidebar
   * rail's existing per-section icon set instead of a second copy. */
  title: string;
  description: string;
  href: string;
  /** Span both columns of the desktop grid -- for an odd last item, or one
   * that should read as a distinct row. */
  fullWidth?: boolean;
  /** Small pill shown beside the title (e.g. "ICP"), matching the sidebar's
   * category badge (customProps.badge). */
  badge?: string;
}

interface Props {
  label?: string;
  items: ExploreItem[];
  /** Passed by Navbar/MobileSidebar/PrimaryMenu when this item renders
   * inside the slide-out mobile drawer instead of the desktop navbar --
   * the ONLY signal this component gets to distinguish the two (Infima
   * hides the desktop instance below 996px via the plain `navbar__item`
   * class already on the wrapper below, same as every other navbar
   * item, so this only needs to handle rendering the mobile one). */
  mobile?: boolean;
  /** Passed by the same mobile menu so a link tap also closes the
   * drawer, matching every other navbar item's mobile behavior. */
  onClick?: () => void;
}

function ChevronDownIcon(): ReactNode {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * A navbar dropdown with a card grid instead of Docusaurus's built-in
 * flat link list (registered as the `exploreDropdown` navbar item type
 * -- see theme/NavbarItem/ComponentTypes.js). `items` is supplied per
 * branch from docusaurus.config.ts, since each product's top-level
 * sections differ.
 */
export default function ExploreDropdown({ label = 'Explore', items, mobile, onClick }: Props): ReactNode {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  // The desktop card-grid flyout (position: absolute, a fixed 2x220px
  // grid) doesn't fit the mobile drawer's narrow width -- render a flat
  // link list matching how Docusaurus's own sidebar categories look
  // there (menu__list-item > menu__link--sublist + nested menu__list)
  // instead, always expanded since 8 items is short enough not to need
  // its own collapse/expand state.
  if (mobile) {
    return (
      <li className="menu__list-item">
        <span className="menu__link menu__link--sublist menu__link--sublist-caret">{label}</span>
        <ul className="menu__list">
          {items.map((item) => (
            <li className="menu__list-item" key={item.href}>
              <Link to={item.href} className="menu__link" onClick={onClick}>
                {item.title}
                {item.badge && <span className={styles.mobileBadge}>{item.badge}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <div ref={ref} className={clsx('navbar__item', styles.wrapper)}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}>
        {label}
        <ChevronDownIcon />
      </button>
      {open && (
        <div className={styles.menu}>
          <div className={styles.grid}>
            {items.map((item) => (
              <Link key={item.href} to={item.href} className={clsx(styles.card, item.fullWidth && styles.cardFull)} onClick={() => setOpen(false)}>
                <span className={styles.cardIcon}>{railIconFor(item.title)}</span>
                <span className={styles.cardText}>
                  <span className={styles.cardTitle}>
                    {item.title}
                    {item.badge && <span className={styles.cardBadge}>{item.badge}</span>}
                  </span>
                  <span className={styles.cardDesc}>{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
