import React, { type ComponentProps } from 'react';
import OriginalA from '@theme-original/MDXComponents/A';
import { InsideAnchorContext } from './AnchorContext';

type Props = ComponentProps<typeof OriginalA>;

/**
 * A markdown link written as `pathname:///<root-relative path>` (the form
 * plugins/crossProductLinks.js emits for `product://` links) points at a
 * SIBLING site's real URL, so it must not get this site's baseUrl
 * prepended -- stock Link prepends it to every href starting with `/`,
 * which turns `/integration-platform/docs/integrator/x` into
 * `/integration-platform/docs/connectors/integration-platform/docs/integrator/x`.
 * Passing autoAddBaseUrl={false} is the same opt-out the navbar items
 * use. No doc relies on the stock behavior (nothing in docs/ links with
 * `pathname://` at all).
 */
export default function AWrapper(props: Props): React.ReactElement {
  const isRootRelativeSiteLink = typeof props.href === 'string' && props.href.startsWith('pathname://');
  return (
    <InsideAnchorContext.Provider value={true}>
      <OriginalA {...props} {...(isRootRelativeSiteLink && { autoAddBaseUrl: false })} />
    </InsideAnchorContext.Provider>
  );
}
