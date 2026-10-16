import type { ReactNode } from 'react';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import MarkdownButton from '@site/src/theme/DocBreadcrumbs/MarkdownButton';

/**
 * This row renders globally via the Navbar wrapper swizzle, so unlike the
 * original DocBreadcrumbs-based button, there's no `useDoc()` (DocProvider
 * is a *descendant* of Layout/Navbar in the docs route tree, not an
 * ancestor -- calling it here throws "outside DocProvider"). `activeDoc`
 * from useActiveDocContext is the same path-matched lookup VersionPill
 * already relies on in this exact position: it's `undefined` (not a
 * throw) on non-doc pages, since it only depends on global plugin data,
 * not a route-scoped provider.
 */
export default function CopyPageButton(): ReactNode {
  const { activeDoc } = useActiveDocContext(undefined);
  const docsBaseUrl = useBaseUrl('/docs');

  if (!activeDoc) return null;
  return <MarkdownButton markdownUrl={`${docsBaseUrl}/${activeDoc.id}.md`} />;
}
