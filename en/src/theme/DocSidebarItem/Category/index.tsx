/**
 * Full custom swizzle (not a @theme-original wrapper) -- the only real
 * change from stock is CategoryLinkLabel optionally rendering an icon
 * before the label, via `railIconFor` (the same hand-picked
 * label->icon lookup the collapsed icon rail already uses -- see
 * DocSidebar/Desktop/icons.tsx). Deliberately level-1 only: nested
 * categories have no icon mapped (that lookup only covers today's
 * top-level sections) and adding icons at every depth would compete
 * with the existing indentation/guide-line hierarchy cues instead of
 * reinforcing them.
 *
 * A category can carry a small pill next to its label via
 * `customProps.badge` in its _category_.json (e.g. "ICP") -- for short
 * qualifiers that shouldn't lengthen the label itself.
 *
 * Everything else (collapse state, auto-expand-when-active, the SSR
 * href fallback, keyboard/ARIA handling) is copied as-is from stock --
 * see the original for the reasoning behind each of those.
 *
 * Original: node_modules/@docusaurus/theme-classic/lib/theme/DocSidebarItem/Category/index.js
 * Keep this file in sync if you bump the @docusaurus/theme-classic major version.
 */
import { useEffect, useMemo, type ReactNode, type ComponentProps, type MouseEvent } from 'react';
import clsx from 'clsx';
import { ThemeClassNames, useThemeConfig, usePrevious, Collapsible, useCollapsible } from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
  useVisibleSidebarItems,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';
import type { Props } from '@theme/DocSidebarItem/Category';
import { railIconFor } from '@site/src/theme/DocSidebar/Desktop/icons';

import styles from './styles.module.css';

// @docusaurus/plugin-content-docs/client doesn't export this type by name --
// derive it from the theme's own (correctly-typed) Props instead.
type PropSidebarItemCategory = Props['item'];

function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
  activePath,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (toCollapsed?: boolean) => void;
  activePath: string;
}) {
  const wasActive = usePrevious(isActive);
  const previousActivePath = usePrevious(activePath);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    const stillActiveButPathChanged = isActive && wasActive && activePath !== previousActivePath;
    if ((justBecameActive || stillActiveButPathChanged) && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed, activePath, previousActivePath]);
}

function useCategoryHrefWithSSRFallback(item: PropSidebarItemCategory): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

function CollapseButton({
  collapsed,
  categoryLabel,
  onClick,
}: {
  collapsed: boolean;
  categoryLabel: string;
  onClick: (e: MouseEvent) => void;
}): ReactNode {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
                description: 'The ARIA label to expand the sidebar category',
              },
              { label: categoryLabel },
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
                description: 'The ARIA label to collapse the sidebar category',
              },
              { label: categoryLabel },
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}

function CategoryLinkLabel({ label, level, badge }: { label: string; level: number; badge?: string }): ReactNode {
  return (
    <span title={label} className={level === 1 ? styles.categoryLinkLabelTop : styles.categoryLinkLabel}>
      {level === 1 && <span className={styles.categoryIcon}>{railIconFor(label)}</span>}
      {badge ? (
        <span className={styles.categoryTextCol}>
          <span className={styles.categoryTextOneLine}>{label}</span>
          <span className={styles.categoryBadge}>{badge}</span>
        </span>
      ) : (
        label
      )}
    </span>
  );
}

export default function DocSidebarItemCategory(props: Props): ReactNode {
  const visibleChildren = useVisibleSidebarItems(props.item.items, props.activePath);
  if (visibleChildren.length === 0) {
    return <DocSidebarItemCategoryEmpty {...props} />;
  }
  return <DocSidebarItemCategoryCollapsible {...props} />;
}

function isCategoryWithHref(category: PropSidebarItemCategory): boolean {
  return typeof category.href === 'string';
}

function DocSidebarItemCategoryEmpty({ item, ...props }: Props): ReactNode {
  if (!isCategoryWithHref(item)) {
    return null;
  }
  const { type, collapsed, collapsible, items, linkUnlisted, ...forwardableProps } = item;
  // `isCategoryWithHref` above already guarantees `href` is a real string at
  // runtime; TS can't carry that narrowing through the destructure/spread.
  const linkItem = {
    type: 'link' as const,
    ...forwardableProps,
  } as ComponentProps<typeof DocSidebarItemLink>['item'];
  return <DocSidebarItemLink item={linkItem} {...props} />;
}

function DocSidebarItemCategoryCollapsible({ item, onItemClick, activePath, level, index, ...props }: Props): ReactNode {
  const { items, label, collapsible, className, href } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);
  const { collapsed, setCollapsed } = useCollapsible({
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : (item.collapsed as boolean);
    },
  });
  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  const updateCollapsed = (toCollapsed: boolean = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };
  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed, activePath });
  useEffect(() => {
    if (collapsible && expandedItem != null && expandedItem !== index && autoCollapseCategories) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);
  const handleItemClick = (e: MouseEvent) => {
    onItemClick?.(item);
    if (collapsible) {
      if (href) {
        if (isCurrentPage) {
          e.preventDefault();
          updateCollapsed();
        } else {
          updateCollapsed(false);
        }
      } else {
        e.preventDefault();
        updateCollapsed();
      }
    }
  };
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        { 'menu__list-item--collapsed': collapsed },
        className,
      )}>
      <div className={clsx('menu__list-item-collapsible', { 'menu__list-item-collapsible--active': isCurrentPage })}>
        <Link
          className={clsx(styles.categoryLink, 'menu__link', {
            'menu__link--sublist': collapsible,
            'menu__link--sublist-caret': !href && collapsible,
            'menu__link--active': isActive,
          })}
          onClick={handleItemClick}
          aria-current={isCurrentPage ? 'page' : undefined}
          role={collapsible && !href ? 'button' : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={collapsible ? (hrefWithSSRFallback ?? '#') : hrefWithSSRFallback}
          {...props}>
          <CategoryLinkLabel label={label} level={level} badge={item.customProps?.badge as string | undefined} />
        </Link>
        {href && collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={(e) => {
              e.preventDefault();
              updateCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems items={items} tabIndex={collapsed ? -1 : 0} onItemClick={onItemClick} activePath={activePath} level={level + 1} />
      </Collapsible>
    </li>
  );
}
