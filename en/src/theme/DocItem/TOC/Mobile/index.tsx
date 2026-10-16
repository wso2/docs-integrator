/**
 * Wraps @theme-original/DocItem/TOC/Mobile (stock: a collapsed "On this
 * page" accordion, see theme-classic's own DocItem/TOC/Mobile + its
 * TOCCollapsible) -- mirrors theme/TOC/index.tsx's own repurposing of
 * the desktop TOC slot for the connector catalog page, but for the
 * mobile-inline slot instead. Docusaurus renders the desktop TOC
 * (`@theme/TOC`, via DocItem/TOC/Desktop) and this mobile one through
 * two entirely separate components -- theme/TOC's own swizzle only
 * ever runs on desktop widths, so without this wrapper here too, the
 * search box, Area/Vendor filters, and "Missing a connector?" promo
 * never reached mobile users at all.
 *
 * Same path-matching approach as theme/TOC/index.tsx (see that file's
 * own docstring for why the regex is just `/\/catalog\/?$/`, not
 * `/connectors/catalog` -- this site's docs plugin already strips both
 * the `connectors` and `docs` segments via routeBasePath: '/').
 *
 * Original: node_modules/@docusaurus/theme-classic/lib/theme/DocItem/TOC/Mobile/index.js
 * Keep this file in sync if you bump the @docusaurus/theme-classic major version.
 */
import type { ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import DocItemTOCMobile from '@theme-original/DocItem/TOC/Mobile';
import { ConnectorCatalogFiltersMobile } from '@site/src/components/ConnectorCatalog/Filters';

const CONNECTOR_CATALOG_PATH = /\/catalog\/?$/;

// Unlike @theme/TOC, stock DocItemTOCMobile takes no props at all (see
// node_modules/@docusaurus/theme-classic's own .d.ts for it) -- nothing
// to import or forward here.
export default function DocItemTOCMobileWrapper(): ReactNode {
  const { pathname } = useLocation();
  const isConnectorCatalog = CONNECTOR_CATALOG_PATH.test(pathname);

  if (isConnectorCatalog) {
    return <ConnectorCatalogFiltersMobile />;
  }

  return <DocItemTOCMobile />;
}
