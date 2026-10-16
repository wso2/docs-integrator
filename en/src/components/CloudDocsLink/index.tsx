import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const DEFAULT_CROSS_PRODUCT_BASE = '/integration-platform/docs/';

/**
 * Link from doc content to a page on the WSO2 Cloud (saas) docs site.
 *
 * Each product is a separate static build with its own baseUrl, so a plain
 * markdown link (`[x](/manage)`) would be prefixed with THIS site's base and
 * land on the wrong page. This needs a real page load to the sibling site,
 * whose path comes from the same `customFields.crossProductBase` the
 * SidebarProductHeader uses -- keeping that base out of the markdown itself.
 * `to` is the saas site's own route, e.g. "/manage/integrations".
 */
export default function CloudDocsLink({ to, children }: { to: string; children: ReactNode }): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const base = (siteConfig.customFields?.crossProductBase as string) || DEFAULT_CROSS_PRODUCT_BASE;
  const root = base.endsWith('/') ? base : `${base}/`;
  return <a href={`${root}saas/${to.replace(/^\//, '')}`}>{children}</a>;
}
