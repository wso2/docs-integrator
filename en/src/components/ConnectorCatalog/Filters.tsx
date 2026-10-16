import type { ReactNode } from 'react';

/**
 * Inert stub. The real filter rail (search box, Area/Vendor facets, the
 * "Missing a connector?" promo, and their mobile-collapsed counterpart)
 * is wso2-connectors-owned content, maintained only there -- see that
 * branch's own copy of this file, and of ConnectorCatalog/index.tsx and
 * styles.module.css.
 *
 * This stub still has to exist here, identically shaped, because two
 * genuinely shared/synced theme files hard-import from it and need
 * something to resolve at build time on every branch: theme/TOC (desktop
 * "On this page" slot) imports the default export, and
 * theme/DocItem/TOC/Mobile (the mobile equivalent) imports
 * ConnectorCatalogFiltersMobile. Both just render their own normal
 * content instead whenever they're not on the connector catalog page --
 * true on every branch except wso2-connectors, so these components never
 * actually get reached from here and simply return null.
 *
 * See ConnectorCatalog/context.tsx's own docstring for why *that* file
 * (unlike this one) stays fully real and identical everywhere: Root.js
 * (also shared) needs its actual CatalogProvider, not a stub.
 */
export default function ConnectorCatalogFilters(): ReactNode {
  return null;
}

export function ConnectorCatalogFiltersMobile(): ReactNode {
  return null;
}
