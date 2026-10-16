/**
 * Wraps @theme-original/TOC to add an "ON THIS PAGE" title above the
 * items -- Docusaurus's stock TOC has no title/heading of its own.
 *
 * On the connectors catalog page specifically, this slot is repurposed
 * entirely: instead of a heading list, it renders the catalog's filter
 * rail (see ConnectorCatalog/Filters.tsx and .../context.tsx for why
 * that needs a shared context rather than local state). Harmless on
 * every other page/branch -- useCatalog() just returns null there, so
 * ConnectorCatalogFilters renders nothing and the real TOC list shows
 * as before.
 *
 * The path is just `/catalog`, not `/connectors/catalog`: wso2-connectors'
 * docs plugin is rooted at docs/connectors/ (see its sidebars.ts using
 * bare `catalog/...` doc ids), so routeBasePath: '/' strips the
 * `connectors` segment along with the usual `docs` one. Got this wrong
 * once already -- the old `/connectors/catalog/?$` regex never matched
 * anything real, so the filter rail silently never rendered and nobody
 * noticed until checking the actual built HTML instead of trusting a
 * clean `docusaurus build`.
 */
import type { ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import type { Props } from '@theme/TOC';
import TOC from '@theme-original/TOC';
import ConnectorCatalogFilters from '@site/src/components/ConnectorCatalog/Filters';

import styles from './styles.module.css';

const CONNECTOR_CATALOG_PATH = /\/catalog\/?$/;

export default function TOCWrapper(props: Props): ReactNode {
  const { pathname } = useLocation();
  const isConnectorCatalog = CONNECTOR_CATALOG_PATH.test(pathname);

  // Filters.tsx renders its own "Filters" + "Clear all" header, so skip
  // this wrapper's own title in that case rather than showing it twice.
  if (isConnectorCatalog) {
    return <ConnectorCatalogFilters />;
  }

  return (
    <div className={styles.tocWrapper}>
      <div className={styles.tocTitle}>On this page</div>
      <TOC {...props} />
    </div>
  );
}
