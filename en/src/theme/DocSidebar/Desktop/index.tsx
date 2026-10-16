/**
 * Swizzled from @docusaurus/theme-classic -- two additions on top of the
 * original:
 *
 * 1. `<ProductDocsLinks />` between `<Content>` and the collapse button
 *    (unchanged from before, text-style external links to WSO2 MI/SI docs).
 *
 * 2. A collapse button overlaid on the first sidebar row (no separate
 *    title row above Content -- see `.sidebarContentWrap` in
 *    styles.module.css) + a real icon rail for the collapsed state,
 *    instead of stock Docusaurus's fully-hidden sidebar with a tiny
 *    30px re-expand sliver. This reuses Docusaurus's own `isHidden`/
 *    `onCollapse` props and the same collapse animation (see custom.css's
 *    `--doc-sidebar-hidden-width: 64px` override) -- only what gets
 *    rendered at each state differs, not how the collapse itself works.
 *    Rail icons don't navigate (mirrors the reference design): clicking
 *    one just re-expands the sidebar, same as the overlay toggle.
 *
 * Original: node_modules/@docusaurus/theme-classic/lib/theme/DocSidebar/Desktop/index.js
 * Keep this file in sync if you bump the @docusaurus/theme-classic major version.
 */
import React, { useEffect, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Logo from '@theme/Logo';
import Content from '@theme/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar';

import ProductDocsLinks from '@site/src/components/ProductDocsLinks';
import { railIconFor } from './icons';

import styles from './styles.module.css';

/** Matches the top margin of the sidebar's divided top-level rows (custom.css). */
const PINNED_GAP = 8;

/** Space kept below the active sidebar link when deciding whether it stays visible. */
const ACTIVE_MARGIN = 24;

function CollapseIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5v14" />
      <path d="M20 12H9" />
      <path d="m13 8-4 4 4 4" />
    </svg>
  );
}

function ExpandIcon(): ReactNode {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** Collapsed state: a 64px icon-only rail -- an expand button, a divider,
 * then one icon per top-level sidebar category. Icons don't navigate;
 * clicking any of them just re-expands the sidebar (same as the reference). */
function IconRail({ sidebar, onExpand }: { sidebar: Props['sidebar']; onExpand: () => void }): ReactNode {
  return (
    <nav className={styles.rail}>
      <button
        type="button"
        onClick={onExpand}
        title="Expand navigation"
        aria-label="Expand navigation"
        className={styles.railButton}>
        <ExpandIcon />
      </button>
      <div className={styles.railDivider} />
      {sidebar
        .filter((item) => item.type !== 'html')
        .map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={onExpand}
            title={item.label}
            aria-label={item.label}
            className={styles.railButton}>
            {railIconFor(item.label)}
          </button>
        ))}
    </nav>
  );
}

/** Keeps the "Platform Overview" row pinned to the top of the sidebar and
 * scrolls the active top-level section up to just beneath it so its whole
 * subtree is visible -- only when the section changes (or on first load),
 * so browsing within a section never moves the scroll position. */
function usePinnedOverviewAndScroll(path: string, disabled: boolean) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastSection = useRef<string | null>(null);

  useEffect(() => {
    if (disabled) return undefined;
    const menu = wrapRef.current?.querySelector<HTMLElement>('nav.menu');
    if (!menu) return undefined;

    const first = menu.querySelector<HTMLElement>('ul.theme-doc-sidebar-menu > li');
    const pinned = first?.textContent?.trim() === 'Platform Overview' ? first : null;
    if (pinned) pinned.dataset.pinned = 'true';

    const section = menu.querySelector<HTMLElement>(
      'li.theme-doc-sidebar-item-category-level-1:has(.menu__link--active)',
    );
    const key = section?.querySelector('.menu__link')?.textContent ?? null;
    if (!section || key === lastSection.current) return undefined;
    lastSection.current = key;
    // Wait out the category's expand animation so the scroll range is final.
    const timer = window.setTimeout(() => {
      // The pinned row sticks below .menu's own top padding, so that padding counts too.
      const inset = pinned ? parseFloat(getComputedStyle(menu).paddingTop) + pinned.offsetHeight + PINNED_GAP : 0;
      const menuRect = menu.getBoundingClientRect();
      let delta = section.getBoundingClientRect().top - (menuRect.top + inset);
      // A long section (e.g. the connector catalog) can put the active page
      // far below its heading; never scroll it out of view -- center it instead.
      const activeLinks = section.querySelectorAll<HTMLElement>('a.menu__link--active');
      const active = activeLinks[activeLinks.length - 1];
      if (active) {
        const r = active.getBoundingClientRect();
        if (r.bottom - delta > menuRect.bottom - ACTIVE_MARGIN) {
          delta = r.top - (menuRect.top + (menu.clientHeight - r.height) / 2);
        }
      }
      menu.scrollTo({ top: menu.scrollTop + delta, behavior: 'smooth' });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [path, disabled]);

  return wrapRef;
}

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props): ReactNode {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();
  // On by default; a product with no top-level sections to scroll between
  // (e.g. the connectors site) turns it off with
  // `customFields: { sidebarScrollToSection: false }` in its docusaurus.config.ts.
  const { siteConfig } = useDocusaurusContext();
  const scrollEnabled = siteConfig.customFields?.sidebarScrollToSection !== false;
  const wrapRef = usePinnedOverviewAndScroll(path, isHidden || !scrollEnabled);

  if (isHidden) {
    return <IconRail sidebar={sidebar} onExpand={onCollapse} />;
  }

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <div ref={wrapRef} className={styles.sidebarContentWrap}>
        {hideable && (
          <button
            type="button"
            onClick={onCollapse}
            title="Collapse navigation"
            aria-label="Collapse navigation"
            className={styles.sidebarCollapseOverlay}>
            <CollapseIcon />
          </button>
        )}
        <Content path={path} sidebar={sidebar} />
      </div>
      <ProductDocsLinks />
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
