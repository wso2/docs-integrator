import React from 'react';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import PaletteIcon, { type PaletteIconName } from '@site/src/components/PaletteIcon';

/**
 * The .palette-card component (see "PALETTE CARDS" in src/css/custom.css)
 * as MDX-friendly building blocks.
 *
 * PaletteCard deliberately does NOT take a `title`/`description` prop --
 * write the heading and description as literal children instead, since
 * a heading passed as a JSX prop (e.g. `title="Views"`) can never appear
 * in Docusaurus's "On this page" TOC (that scan can't see inside a
 * custom component's props). Even as literal children, headings inside
 * a custom component are NOT reliably picked up by the TOC either --
 * so on a page where the "On this page" panel matters, don't rely on
 * these cards appearing there. For a landing/hub page where the cards
 * ARE the navigation, set `hide_table_of_contents: true` in that page's
 * frontmatter instead of fighting it.
 *
 *   <PaletteCard icon="connections">
 *     <h4 class="palette-card-title">Connections</h4>
 *     <p class="palette-card-desc">...</p>
 *     <div class="palette-chip-row">
 *       <PaletteChip href="...">Connection</PaletteChip>
 *     </div>
 *   </PaletteCard>
 */

export function PaletteGrid({
  children,
  cols,
}: {
  children: React.ReactNode;
  /** Force exactly this many columns on desktop instead of the default
   * auto-fill/minmax behavior, which packs as many 260px+ columns as fit
   * the current width -- fine when a grid's card count is open-ended, but
   * for a fixed, known set (e.g. 4 cards meant to always read as one row)
   * auto-fill can still wrap unevenly at in-between viewport widths. Below
   * the site's mobile breakpoint this still collapses the same as any
   * other .palette-grid -- see the min-width guard in custom.css. */
  cols?: number;
}): React.ReactElement {
  return (
    <div
      className={cols ? 'palette-grid palette-grid--fixed-cols' : 'palette-grid'}
      style={cols ? ({ '--palette-grid-cols': cols } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}

export function PaletteCard({
  icon,
  href,
  highlight,
  standalone,
  children,
}: {
  icon: PaletteIconName;
  /** Whole-card link -- only for a single-item category with no chips. */
  href?: string;
  /** Distinct tinted treatment for a card that should stand out from its
   * siblings (e.g. an AI-assisted feature among plain reference cards) --
   * see .palette-card--highlight in custom.css. A visual variant only,
   * doesn't change link behavior. */
  highlight?: boolean;
  /** For a lone card that isn't inside a PaletteGrid (its own bottom
   * margin, since it gets none of PaletteGrid's own margin/gap) --
   * see .palette-card--standalone in custom.css. Needed in particular
   * inside a .palette-group, whose own `.palette-grid { margin: 0 }`
   * rule means a card+grid pairing there has no automatic spacing
   * between them otherwise. */
  standalone?: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const content = (
    <>
      <PaletteIcon name={icon} />
      {children}
    </>
  );
  const className = ['palette-card', highlight && 'palette-card--highlight', standalone && 'palette-card--standalone']
    .filter(Boolean)
    .join(' ');

  if (href) {
    const external = !isInternalUrl(href);
    // Internal hrefs MUST go through Link -- a plain <a href="/manage/..."> is
    // un-prefixed and only ever "worked" by accident while this site's own
    // baseUrl was "/"; now that it's "/integration-platform/docs/saas/" (and
    // "/integrator/" on the sibling branch these same shared-slug pages are
    // synced to), a raw <a> does a full-page nav straight to the un-prefixed
    // path and 404s. Link/useBaseUrl resolves against whatever baseUrl this
    // build actually has, so the exact same href is correct on every branch
    // with zero per-page changes. External hrefs keep the plain <a>, since
    // Link is for same-site client-side routing only.
    if (!external) {
      return (
        <Link className={className} to={href}>
          {content}
        </Link>
      );
    }
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export function PaletteChip({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}): React.ReactElement {
  // Same internal-vs-external split as PaletteCard above, and for the same
  // reason -- see that block's comment.
  if (!isInternalUrl(href)) {
    return (
      <a className="palette-chip" href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className="palette-chip" to={href}>
      {children}
    </Link>
  );
}
