/**
 * Wraps @docusaurus/theme-classic's Navbar to add a persistent
 * product+version pill row directly under it, present on every page
 * (not just doc pages with a sidebar -- SidebarProductHeader used to
 * live inside the swizzled DocSidebar/Desktop, which meant it was
 * invisible on the homepage, search, etc). The navbar itself
 * (`.navbar--fixed-top`) is `position: sticky; top: 0`; this row is
 * `position: sticky; top: var(--ifm-navbar-height)` in its own
 * stylesheet, so it sits directly beneath it and stays there together
 * while scrolling.
 *
 * The row also carries the "Copy page" export dropdown (CopyPageButton,
 * moved here from DocBreadcrumbs) and, immediately before it,
 * `#wso2-edit-page-slot` -- an empty portal TARGET, not a component: the
 * actual "Edit this page" link only exists deep in DocItem's own tree
 * (stock EditThisPage, reading `editUrl` from useDoc(), a hook that
 * throws out here -- same reason CopyPageButton doesn't call useDoc()
 * either, see its own docstring). The swizzled EditThisPage
 * (src/theme/EditThisPage) portals its real rendered link INTO this
 * slot instead of rendering inline at the bottom of the article (where
 * it stock-defaults to, easy to miss below a long page) -- Docusaurus's
 * own editUrl computation (correct per-version on wso2-integrator too)
 * stays completely untouched, only WHERE the result visually lands
 * changes. Both boundary-wrapped/empty-safe since each depends on
 * doc-page-only hooks/state that may not apply on a non-doc page. */
import type { ReactNode } from 'react';
import Navbar from '@theme-original/Navbar';
import SidebarProductHeader from '@site/src/components/SidebarProductHeader';
import CopyPageButton from './CopyPageButton';

import styles from './styles.module.css';

export default function NavbarWrapper(props: Record<string, unknown>): ReactNode {
  return (
    <>
      <Navbar {...props} />
      <div className={styles.secondaryRow}>
        <div className={styles.secondaryRowInner}>
          <SidebarProductHeader />
          <div className={styles.rightGroup}>
            <div id="wso2-edit-page-slot" />
            <CopyPageButton />
          </div>
        </div>
      </div>
    </>
  );
}
