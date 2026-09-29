/**
 * Swizzled from @docusaurus/theme-classic -- identical to stock except
 * LinkLabel optionally renders an icon before the label, via `railIconFor`
 * (the same lookup DocSidebarItem/Category already uses for its own
 * level-1 icons, and the collapsed icon rail uses for every top-level
 * item regardless of type). Needed because a bare top-level
 * `{ type: 'doc' }` item -- "Overview" on this branch -- has no category
 * to carry that icon; without this swizzle it's the one top-level
 * sidebar item with no icon in the full (uncollapsed) view, even though
 * it already gets one in the collapsed rail.
 *
 * Also renders an icon at level 3 for CONNECTOR_SUBPAGE_LABELS (Setup
 * Guide/Actions/Triggers/Example) -- a deliberate, narrow exception to
 * the level-1-only rule, not a general "nested items get icons" change.
 * It's safe here specifically because the scoped sidebar (see
 * DocRoot/Layout/Sidebar) only ever expands one connector's own category
 * at a time: at most 4 of these icons are ever on screen together, not
 * 165 connectors' worth.
 *
 * Original: node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/Link/index.js
 * Keep this file in sync if you bump the @docusaurus/theme-classic major version.
 */
import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/DocSidebarItem/Link';
import { railIconFor } from '@site/src/theme/DocSidebar/Desktop/icons';

import styles from './styles.module.css';

// Every connector's Setup Guide/Actions/Triggers/Example page uses
// exactly this frontmatter `title` -- enforced across all ~165
// connectors (see HOW_TO_ADD_A_CONNECTOR_DOCUMENTATION.md on wso2-connectors), so no
// alias/plural variants are needed here.
const CONNECTOR_SUBPAGE_LABELS = new Set(['setup guide', 'actions', 'triggers', 'example']);

function hasIcon(level: number, label: string): boolean {
  return level === 1 || (level === 3 && CONNECTOR_SUBPAGE_LABELS.has(label.trim().toLowerCase()));
}

function LinkLabel({ label, level }: { label: string; level: number }): ReactNode {
  const showIcon = hasIcon(level, label);
  return (
    <span title={label} className={clsx(styles.linkLabel, showIcon && styles.linkLabelTop)}>
      {showIcon && <span className={styles.linkIcon}>{railIconFor(label)}</span>}
      {label}
    </span>
  );
}

export default function DocSidebarItemLink({ item, onItemClick, activePath, level, index, ...props }: Props): ReactNode {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx('menu__link', !isInternalLink && styles.menuExternalLink, {
          'menu__link--active': isActive,
        })}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <LinkLabel label={label} level={level} />
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
