import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useLocation, useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import { useConnectorVersion } from '@site/src/utils/connectorVersion';
import styles from './styles.module.css';

const CATEGORY_TAGS = {
  'built-in':                   { label: 'Built-in',                    color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  'ai-ml':                      { label: 'AI & ML',                      color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  'cloud-infrastructure':       { label: 'Cloud & Infrastructure',       color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
  'communication':              { label: 'Communication',                color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
  'crm-sales':                  { label: 'CRM & Sales',                  color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
  'database':                   { label: 'Database',                     color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
  'developer-tools':            { label: 'Developer Tools',              color: '#475569', bg: '#f8fafc', border: '#cbd5e1' },
  'ecommerce':                  { label: 'E-Commerce',                   color: '#db2777', bg: '#fdf2f8', border: '#f9a8d4' },
  'finance-accounting':         { label: 'Finance & Accounting',         color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
  'healthcare':                 { label: 'Healthcare',                   color: '#0f766e', bg: '#f0fdfa', border: '#99f6e4' },
  'hrms':                       { label: 'HRMS',                         color: '#7e22ce', bg: '#faf5ff', border: '#e9d5ff' },
  'marketing-social':           { label: 'Marketing & Social',           color: '#e11d48', bg: '#fff1f2', border: '#fecdd3' },
  'messaging':                  { label: 'Messaging',                    color: '#ca8a04', bg: '#fefce8', border: '#fef08a' },
  'productivity-collaboration': { label: 'Productivity & Collaboration',  color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  'security-identity':          { label: 'Security & Identity',          color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  'storage-file':               { label: 'Storage & Files',              color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' },
};

function CategoryBadge({ categorySlug }) {
  const category = CATEGORY_TAGS[categorySlug];
  if (!category) return null;
  return (
    <span
      className={styles.categoryBadge}
      style={{ color: category.color, backgroundColor: category.bg, borderColor: category.border }}
    >
      {category.label}
    </span>
  );
}

function sortVersionsDesc(versions) {
  return [...versions].sort((a, b) => {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const diff = (pb[i] || 0) - (pa[i] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  });
}

function VersionDropdown({ versions, currentVersion, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.versionDropdown} ref={ref}>
      <button
        className={styles.versionButton}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        v{currentVersion}
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <ul className={styles.dropdownMenu} role="listbox">
          {sortVersionsDesc(versions).map((v) => (
            <li
              key={v}
              role="option"
              aria-selected={v === currentVersion}
              className={`${styles.dropdownItem} ${v === currentVersion ? styles.dropdownItemActive : ''}`}
              onClick={() => {
                onSelect(v);
                setOpen(false);
              }}
            >
              v{v}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function buildVersionedPath({
  pathname,
  pageVersion,
  newVersion,
  latestVersion,
  isDefaultPage,
  latestSlug,
}) {
  const isTargetLatest = newVersion === latestVersion;

  if (isDefaultPage) {
    if (isTargetLatest) return pathname;
    const segments = pathname.split('/');
    const currentSlug = segments.pop();
    segments.push(newVersion);
    segments.push(currentSlug);
    return segments.join('/');
  }

  if (isTargetLatest) {
    const segments = pathname.split('/');
    segments.pop();
    segments.pop();
    segments.push(latestSlug);
    return segments.join('/');
  }

  return pathname.replace(`/${pageVersion}/`, `/${newVersion}/`);
}

export default function DocBreadcrumbsWrapper(props) {
  const { frontMatter } = useDoc();
  const breadcrumbs = useSidebarBreadcrumbs();
  const location = useLocation();
  const history = useHistory();

  // Read connector version data from the plugin's global data.
  let allConnectorVersions = {};
  try {
    allConnectorVersions = usePluginData('connector-versions') || {};
  } catch {
    // Plugin not loaded — no connector versions available.
  }

  // Derive category slug from URL: /connectors/catalog/<category>/...
  const pathParts = location.pathname.split('/').filter(Boolean);
  const catalogIdx = pathParts.indexOf('catalog');
  const categorySlug = catalogIdx !== -1 ? pathParts[catalogIdx + 1] : null;

  const isConnector = frontMatter.connector === true;
  const connectorName = frontMatter.connector_name;

  // Look up version config from the centralized versions.json via plugin data.
  const versionConfig = connectorName ? allConnectorVersions[connectorName] : null;
  const availableVersions = versionConfig?.versions || [];
  const latestVersion = versionConfig?.latest || null;
  const sharedPages = versionConfig?.shared || [];
  const hasMultipleVersions = availableVersions.length > 1;

  // Determine if this is a default page or a versioned page based on the URL.
  // Versioned pages have a version segment in the path: .../twilio/1.0.0/overview
  // Default pages don't: .../twilio/overview
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pageSlug = pathSegments[pathSegments.length - 1];
  const parentSegment = pathSegments[pathSegments.length - 2];
  const isDefaultPage = !availableVersions.includes(parentSegment);

  // Page version: from frontmatter if set, otherwise derive from URL or use latest.
  const isSharedPage = sharedPages.includes(pageSlug);

  const pageVersion = frontMatter.connector_version
    || (isDefaultPage ? latestVersion : parentSegment);

  // The slug to navigate to when switching to the latest version from a versioned page.
  // The page slug is the same filename (action-reference, overview, etc.)
  const latestSlug = pageSlug;

  // Hook must be called unconditionally.
  const [activeVersion, setVersion] = useConnectorVersion(
    connectorName || '__none__',
    availableVersions.length > 0 ? availableVersions : ['__none__'],
    pageVersion || '__none__',
  );

  // Redirect if stored version differs from the page's version.
  // Shared pages (e.g. setup-guide) have no versioned equivalent — skip redirect.
  useLayoutEffect(() => {
    if (!isConnector || !hasMultipleVersions || isSharedPage) return;
    if (activeVersion && activeVersion !== pageVersion) {
      const newPath = buildVersionedPath({
        pathname: location.pathname,
        pageVersion,
        newVersion: activeVersion,
        latestVersion,
        isDefaultPage,
        latestSlug,
      });
      if (newPath !== location.pathname) {
        history.replace(newPath);
      }
    }
  }, [activeVersion, pageVersion, location.pathname, history, isConnector, hasMultipleVersions, isDefaultPage, latestVersion, latestSlug]);

  // On versioned pages, highlight the corresponding default sidebar link.
  // E.g. when on /twilio/1.0.0/action-reference, highlight /twilio/action-reference.
  useEffect(() => {
    if (!isConnector || !hasMultipleVersions || isDefaultPage) return;

    // Build the default page path by removing the version segment.
    const segments = location.pathname.split('/');
    const slugIdx = segments.length - 1;
    const versionIdx = segments.length - 2;
    const defaultPath = [
      ...segments.slice(0, versionIdx),
      segments[slugIdx],
    ].join('/');

    // Find the sidebar link that points to the default page.
    const selector = `.menu__link[href="${defaultPath}"]`;
    const link = document.querySelector(selector);
    if (!link) return;

    const ACTIVE_CLASS = 'menu__link--active';
    link.classList.add(ACTIVE_CLASS);

    // Also expand parent categories so the active link is visible.
    let parent = link.closest('.menu__list-item');
    while (parent) {
      const collapsible = parent.querySelector(':scope > .menu__list-item-collapsible');
      if (collapsible) {
        const btn = collapsible.querySelector('.menu__caret, .menu__link--sublist');
        if (btn && btn.getAttribute('aria-expanded') === 'false') {
          btn.click();
        }
      }
      parent = parent.parentElement?.closest('.menu__list-item');
    }

    return () => {
      link.classList.remove(ACTIVE_CLASS);
    };
  }, [isConnector, hasMultipleVersions, isDefaultPage, location.pathname]);

  // Not a versioned connector page — render default breadcrumbs + badge.
  if (!isConnector || !hasMultipleVersions) {
    return (
      <div className={styles.breadcrumbsLeft}>
        <DocBreadcrumbs {...props} />
        {pageSlug === 'overview' && <CategoryBadge categorySlug={categorySlug} />}
      </div>
    );
  }

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return (
      <div className={styles.breadcrumbsLeft}>
        <DocBreadcrumbs {...props} />
        {pageSlug === 'overview' && <CategoryBadge categorySlug={categorySlug} />}
      </div>
    );
  }

  const handleVersionSelect = (newVersion) => {
    setVersion(newVersion);
    // Shared pages have no versioned equivalent — store the version but don't navigate.
    if (isSharedPage) return;
    const newPath = buildVersionedPath({
      pathname: location.pathname,
      pageVersion,
      newVersion,
      latestVersion,
      isDefaultPage,
      latestSlug,
    });
    if (newPath !== location.pathname) {
      history.push(newPath);
    }
  };

  const displayVersion = availableVersions.includes(activeVersion)
    ? activeVersion
    : latestVersion;

  // Find the connector crumb and split: before + connector | dropdown | remaining.
  const connectorLabel = connectorName.toLowerCase();
  let connectorIdx = breadcrumbs.findIndex(
    (c) => c.label.toLowerCase() === connectorLabel,
  );
  if (connectorIdx === -1) {
    connectorIdx = isDefaultPage
      ? breadcrumbs.length - 1
      : breadcrumbs.length - 2;
  }

  const beforeConnector = breadcrumbs.slice(0, connectorIdx + 1);
  const allAfterConnector = breadcrumbs.slice(connectorIdx + 1);

  const isOverviewPage = pageSlug === 'overview';
  const afterConnector = isOverviewPage ? [] : allAfterConnector;

  return (
    <nav className={styles.breadcrumbsLeft} aria-label="Breadcrumbs">
      {pageSlug === 'overview' && <CategoryBadge categorySlug={categorySlug} />}
      {beforeConnector.map((crumb, i) => (
        <React.Fragment key={i}>
          <span className={styles.breadcrumbItem}>
            {crumb.href ? (
              <Link className={styles.breadcrumbLink} to={crumb.href}>
                {crumb.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbLink}>{crumb.label}</span>
            )}
          </span>
          <span className={styles.separator}>/</span>
        </React.Fragment>
      ))}

      <span className={styles.breadcrumbItem}>
        <VersionDropdown
          versions={availableVersions}
          currentVersion={displayVersion}
          onSelect={handleVersionSelect}
        />
      </span>

      {afterConnector.map((crumb, i) => (
        <React.Fragment key={`after-${i}`}>
          <span className={styles.separator}>/</span>
          <span className={styles.breadcrumbItem}>
            <span className={styles.breadcrumbLink}>
              <strong>{crumb.label}</strong>
            </span>
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}
