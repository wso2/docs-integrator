/**
 * Swizzled from @docusaurus/theme-classic. Same state machine as the
 * original (hiddenSidebarContainer / hiddenSidebar / toggleSidebar,
 * ResetOnSidebarChange) -- the only reason for this swizzle is that the
 * original's width-collapse CSS lives inside `@layer docusaurus.theme-classic`
 * in its styles.module.css. Cascade layers make unlayered normal rules win
 * over layered ones, and unlayered `!important` rules the LOSE to layered
 * `!important` (the important-vs-layer order is the reverse of normal's) --
 * so nothing in our own custom.css could override that module's collapsed
 * width to the 64px our icon rail (theme/DocSidebar/Desktop) needs, no
 * matter the selector specificity or `!important`. Authoring the
 * width-setting rules ourselves, in a stylesheet that never opts into a
 * layer, sidesteps that fight entirely.
 *
 * Also drops the original's <ExpandButton> -- our icon rail already
 * fills the whole collapsed width with clickable icons, including its
 * own expand button, so a second one stacked on top would be redundant.
 *
 * Original: node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Sidebar/index.js
 * Keep this file in sync if you bump the @docusaurus/theme-classic major version.
 *
 * Also scopes the sidebar to the current connector when viewing one of
 * its own pages (.../catalog/<area>/<package>/<doc>): instead of the
 * full alphabetical tree of all ~165 connectors, shows just Overview
 * plus that one connector's own category (its overview/setup/actions/
 * example items) -- the other 164 connectors aren't relevant while
 * you're reading one specific connector's docs, and 165 sibling
 * categories is a lot of scrolling to find your way back otherwise.
 * "Build Your Own" stays visible throughout -- it's a short, constant-size
 * link regardless of which connector you're on, not something that needs
 * scoping away.
 *
 * And the other direction: until a connector IS selected, "Connector
 * Catalog" itself renders as a plain link, not an expandable category.
 * Landing on the catalog's own index page makes that category "active"
 * by Docusaurus's own reckoning (its `link` doc is the current page),
 * which normally force-expands it and dumps all ~165 connectors into
 * the sidebar even though nothing under it is actually the active
 * page -- the catalog page's own filter rail is how you browse from
 * there, not a wall of sidebar links. Dropping `items`/`collapsed` and
 * changing `type` to `'link'` sidesteps that auto-expand entirely
 * rather than fighting it (see DocSidebarItem/Category's own
 * `useAutoExpandActiveCategory` -- it re-expands on every render where
 * the category is active, so merely setting `collapsed: true` in the
 * data doesn't stick).
 *
 * `connectorPrefixFor` strips the site's own `baseUrl` off `pathname`
 * before looking for the `catalog/...` prefix. `useLocation().pathname`
 * is the real browser path, which includes `baseUrl` (e.g.
 * `/docs-integrator/connectors/catalog/...` on this fork's Pages site,
 * `/integration-platform/docs/connectors/catalog/...` in production) --
 * only a root `baseUrl` (`/`, the dev-server default, since nothing sets
 * `BASE_URL` locally) ever put `catalog` at `parts[0]` directly. Every
 * real deployment sets a nested `BASE_URL`, so without this the check
 * silently never matched and this whole scoping feature no-opped on
 * every actual deployment while looking correct in local dev.
 */
import React, { useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import clsx from 'clsx';
import { prefersReducedMotion, ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocSidebar from '@theme/DocSidebar';
import type { PropSidebarItem, PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';
import type { Props } from '@theme/DocRoot/Layout/Sidebar';

import styles from './styles.module.css';

function isCategory(item: PropSidebarItem): item is PropSidebarItemCategory {
  return item.type === 'category';
}

/** Non-catalog pages, and the catalog listing page itself (exactly
 * `/catalog` or `/catalog/`), return null -- nothing to scope down to.
 * The returned prefix keeps `baseUrl` on it, matching `sub.href` below
 * (sidebar item hrefs are baseUrl-prefixed absolute paths too). */
function connectorPrefixFor(pathname: string, baseUrl: string): string | null {
  if (!pathname.startsWith(baseUrl)) return null;
  const parts = pathname.slice(baseUrl.length).split('/').filter(Boolean);
  if (parts[0] !== 'catalog' || parts.length < 3) return null;
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${base}/catalog/${parts[1]}/${parts[2]}/`;
}

function asPlainLink(item: PropSidebarItemCategory): PropSidebarItemLink | PropSidebarItemCategory {
  if (!item.href) return item;
  return { key: item.key, className: item.className, type: 'link', href: item.href, label: item.label };
}

function scopeSidebarToConnector(sidebar: PropSidebarItem[], pathname: string, baseUrl: string): PropSidebarItem[] {
  const prefix = connectorPrefixFor(pathname, baseUrl);

  if (!prefix) {
    return sidebar.map((item) =>
      isCategory(item) && item.label === 'Connector Catalog' ? asPlainLink(item) : item,
    );
  }

  return sidebar.map((item) => {
    if (!isCategory(item) || item.label !== 'Connector Catalog') return item;
    const match = item.items.find((sub) => isCategory(sub) && sub.href?.startsWith(prefix));
    return match ? { ...item, items: [match] } : item;
  });
}

function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return <React.Fragment key={sidebar?.name ?? 'noSidebar'}>{children}</React.Fragment>;
}

export default function DocRootLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): ReactNode {
  const { pathname } = useLocation();
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();
  const scopedSidebar = useMemo(
    () => scopeSidebarToConnector(sidebar, pathname, baseUrl),
    [sidebar, pathname, baseUrl],
  );
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    // onTransitionEnd won't fire when sidebar animation is disabled
    // fixes https://github.com/facebook/docusaurus/issues/8918
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  // Auto-collapse to the icon rail on narrower desktop widths, so the
  // sidebar doesn't eat too much of the content column before Infima's own
  // breakpoint (996px) swaps to the mobile drawer entirely. Only binds
  // within the "still desktop" range -- .docSidebarContainer itself is
  // display:none below 997px (see Infima's docSidebar.css), so this never
  // fights the mobile sidebar.
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1200px)');
    const applyForMatch = (matches: boolean) => {
      setHiddenSidebarContainer(matches);
      if (!matches) {
        setHiddenSidebar(false);
      }
    };
    applyForMatch(mql.matches);
    const listener = (e: MediaQueryListEvent) => applyForMatch(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
        hiddenSidebarContainer && styles.docSidebarContainerHidden,
      )}
      onTransitionEnd={(e) => {
        if (!e.currentTarget.classList.contains(styles.docSidebarContainer)) {
          return;
        }
        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}>
      <ResetOnSidebarChange>
        <div
          className={clsx(
            styles.sidebarViewport,
            hiddenSidebar && styles.sidebarViewportHidden,
          )}>
          <DocSidebar sidebar={scopedSidebar} path={pathname} onCollapse={toggleSidebar} isHidden={hiddenSidebar} />
        </div>
      </ResetOnSidebarChange>
    </aside>
  );
}
