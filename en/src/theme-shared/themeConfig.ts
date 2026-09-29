import { themes as prismThemes } from 'prism-react-renderer';

/**
 * The shared visual identity contract across every docs-integrator site
 * branch (main, wso2-integrator, wso2-connectors, and future sites).
 *
 * This file is kept in sync across branches by
 * .github/workflows/sync-theme.yaml, sourced from wso2-integrator as the
 * canonical branch. Per the branch rule (Docs Repo & Branch Strategy §5):
 * this is evergreen, decoupled-from-content configuration, so it is
 * synced like the connectors catalog rather than authored per-branch.
 *
 * What's deliberately NOT here: title, tagline, docs.path, editUrl,
 * navbar.items, and footer.links beyond the shared community group —
 * those are genuinely per-branch and stay local to each
 * docusaurus.config.ts.
 */

/** Absolute path the saas site is rooted at in real production/staging --
 * used for any link that must resolve to a SIBLING site's real URL
 * regardless of this build's own baseUrl (sharedNavbarLogo below,
 * SidebarProductHeader, and each docusaurus.config.ts's own
 * pathname:// cross-product links). Overridable via env var so a
 * one-off build hosted at a different absolute root (e.g. a GitHub
 * fork's own Pages URL) can point these at itself instead --
 * real production/staging never set this, so they're unaffected. */
export const CROSS_PRODUCT_BASE = process.env.CROSS_PRODUCT_BASE || '/integration-platform/docs/';

export const sharedColorMode = {
  defaultMode: 'light' as const,
  respectPrefersColorScheme: true,
};

export const sharedDocsSidebar = {
  sidebar: {
    // Collapse sibling categories whenever a category expands. With
    // `useAutoExpandActiveCategory`, this means navigating to a page
    // collapses every other top-level category and only leaves the
    // current path expanded.
    autoCollapseCategories: true,
    // Off by default in Docusaurus -- turns on the collapse toggle at
    // all. theme/DocSidebar/Desktop replaces what it collapses TO (a
    // 64px icon rail) but this flag is what makes the toggle exist.
    hideable: true,
  },
};

/** The real WSO2 lockup files, used as-is (not recreated in CSS/HTML) --
 * `src` is the solid-black variant (light theme, dark ink on a light
 * navbar), `srcDark` is the white+orange variant (dark theme -- it's
 * white ink, so it only reads correctly on a dark navbar background).
 *
 * `href` is a plain absolute path to the saas site's root, not a
 * hardcoded `https://wso2.com/...` domain -- the logo is meant to be
 * the one consistent "home base" across every site branch (saas,
 * wso2-integrator, wso2-connectors), so clicking it from anywhere lands
 * on the saas homepage specifically -- pointed directly at
 * `${CROSS_PRODUCT_BASE}saas/`, not just the bare family root. Those
 * used to be the same URL (saas owned the bare root outright); now that
 * saas has its own /saas/ subpath like every other product, the bare
 * root is only a static redirect stub (root-redirect/index.html) that
 * immediately bounces to /saas/ anyway -- pointing here saves that
 * extra hop rather than relying on it. Still resolves against whatever
 * origin is CURRENTLY serving the site (localhost while testing, the
 * real domain in production), not a hardcoded production URL. Rendered
 * via the theme/Logo swizzle (a plain native <a>, not Docusaurus's
 * <Link>) -- see that file's docstring for why stock Logo can't do
 * this safely (it always runs href through useBaseUrl, which would
 * double-prepend this site's own baseUrl onto an already-absolute
 * path). */
export const sharedNavbarLogo = {
  alt: 'WSO2 Integration Platform',
  src: 'img/wso2-integration-platform-black.svg',
  srcDark: 'img/wso2-integration-platform-full-colour.svg',
  href: `${CROSS_PRODUCT_BASE}saas/`,
};

export const sharedFooterStyle = 'dark' as const;

export const sharedFooterCopyright = `Copyright © ${new Date().getFullYear()} WSO2 LLC. Built with Docusaurus.`;

export const sharedPrism = {
  theme: prismThemes.github,
  darkTheme: prismThemes.dracula,
  additionalLanguages: ['java', 'bash', 'json', 'yaml', 'toml'],
};

export const sharedImage = 'img/logo.svg';

// The product-switcher dropdown used to live here as a navbar item
// (sharedProductDropdown). It's now a persistent row under the navbar
// instead (see src/components/SidebarProductHeader, rendered globally via
// the src/theme/Navbar wrapper swizzle) to match the reference pattern
// from reactnative.dev/docs -- no navbar duplicate. That component keeps
// its own copy of the product list (label/href) since it's a client-side
// React component and this file is TS-only config-time code; keep the two
// in sync by hand if the product list ever changes.

/** Icon-only social navbar links -- same `html`-not-`label` and
 * `navbar-icon-link` treatment as `sharedGithubNavbarItem` below (see
 * its own docstring for why), so the whole row reads as one visual
 * family of icon buttons. Each icon's own viewBox aspect ratio is kept
 * (not forced square) with a shared 18px height, so none of these
 * brand marks (Discord/YouTube are wider than tall, LinkedIn taller
 * than wide, X square) look stretched relative to the others. */
export const sharedDiscordNavbarItem = {
  html: '<svg width="22" height="18" viewBox="0 0 640 512" fill="currentColor" aria-hidden="true"><path d="M524.531 69.836a1.5 1.5 0 0 0-.764-.7A485.065 485.065 0 0 0 404.081 32.03a1.816 1.816 0 0 0-1.923.91 337.461 337.461 0 0 0-14.9 30.6 447.848 447.848 0 0 0-134.426 0 309.541 309.541 0 0 0-15.135-30.6 1.89 1.89 0 0 0-1.924-.91 483.689 483.689 0 0 0-119.688 37.107 1.712 1.712 0 0 0-.788.676C39.068 183.651 18.186 294.69 28.43 404.354a2.016 2.016 0 0 0 .765 1.375 487.666 487.666 0 0 0 146.825 74.189 1.9 1.9 0 0 0 2.063-.676A348.2 348.2 0 0 0 208.12 430.4a1.86 1.86 0 0 0-1.019-2.588 321.173 321.173 0 0 1-45.868-21.853 1.885 1.885 0 0 1-.185-3.126 251.047 251.047 0 0 0 9.109-7.137 1.819 1.819 0 0 1 1.9-.256c96.229 43.917 200.41 43.917 295.5 0a1.812 1.812 0 0 1 1.924.233 234.533 234.533 0 0 0 9.132 7.16 1.884 1.884 0 0 1-.162 3.126 301.407 301.407 0 0 1-45.89 21.83 1.875 1.875 0 0 0-1 2.611 391.055 391.055 0 0 0 30.014 48.815 1.864 1.864 0 0 0 2.063.7A486.048 486.048 0 0 0 610.7 405.729a1.882 1.882 0 0 0 .765-1.352c12.264-126.783-20.532-236.912-86.934-334.541ZM222.491 337.58c-28.972 0-52.844-26.587-52.844-59.239s23.409-59.241 52.844-59.241c29.665 0 53.306 26.82 52.843 59.239 0 32.654-23.41 59.241-52.843 59.241Zm195.38 0c-28.971 0-52.843-26.587-52.843-59.239s23.409-59.241 52.843-59.241c29.667 0 53.307 26.82 52.844 59.239 0 32.654-23.177 59.241-52.844 59.241Z"/></svg>',
  href: 'https://discord.com/invite/wso2',
  position: 'right' as const,
  className: 'navbar-icon-link',
  'aria-label': 'Discord',
};

export const sharedLinkedInNavbarItem = {
  html: '<svg width="16" height="18" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>',
  href: 'https://www.linkedin.com/company/wso2',
  position: 'right' as const,
  className: 'navbar-icon-link',
  'aria-label': 'LinkedIn',
};

// YouTube URL matches the one already used in src/pages/community.tsx
// and theme/Footer/index.tsx -- keep all three in sync if it changes.
export const sharedYoutubeNavbarItem = {
  html: '<svg width="20" height="18" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>',
  href: 'https://www.youtube.com/@WSO2official',
  position: 'right' as const,
  className: 'navbar-icon-link',
  'aria-label': 'YouTube',
};

export const sharedXNavbarItem = {
  html: '<svg width="18" height="18" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/></svg>',
  href: 'https://twitter.com/intent/follow?screen_name=wso2',
  position: 'right' as const,
  className: 'navbar-icon-link',
  'aria-label': 'X (Twitter)',
};

/** Icon-only GitHub navbar link -- `html` (not `label`) so Docusaurus's
 * auto-appended external-link arrow (added whenever `label` is used with
 * a non-internal href) doesn't show; an icon needs no such affordance.
 * `className` gives it the same 2rem circular hit target as the
 * color-mode toggle (see custom.css's `.navbar-icon-link`), so the two
 * read as one visual family of icon buttons at the navbar's right edge. */
export const sharedGithubNavbarItem = {
  html: '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  href: 'https://github.com/wso2/docs-integrator',
  position: 'right' as const,
  className: 'navbar-icon-link',
  'aria-label': 'GitHub',
};

/** Same icon-button treatment as the other icon-only navbar links --
 * matches the footer's own social row (Footer/index.tsx's SOCIAL_LINKS),
 * so the same 6 channels (GitHub, Discord, Stack Overflow, YouTube,
 * LinkedIn, X) appear consistently in the navbar, the footer, and
 * pages/community.tsx rather than each surface carrying its own subset. */
export const sharedStackOverflowNavbarItem = {
  html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.4 18.2v-4.6h1.5V19.7H4.6v-6.1h1.5v4.6ZM7.7 13.6l7.3 1.5.3-1.5-7.3-1.6Zm1-3.6 6.8 3.1.6-1.4-6.7-3.2Zm2-3.4 5.8 4.8.9-1.2-5.7-4.8Zm3.3-3.5-1.2.9 4.4 5.9 1.2-.9ZM7.6 17.1h7.4v-1.5H7.6Z"/></svg>',
  href: 'https://stackoverflow.com/questions/tagged/wso2',
  position: 'right' as const,
  className: 'navbar-icon-link',
  'aria-label': 'Stack Overflow',
};

/** FAQ navbar link -- a "?" icon followed by the "FAQ" label, styled as
 * a plain text nav item (like Blog/Community/Contribute) rather than
 * the icon-only circular buttons (GitHub, color-mode toggle). `html`
 * carries both the icon and the text since Docusaurus's `label` can't
 * be combined with a leading icon. `target` is the in-site FAQ doc
 * path, so each branch that has its own FAQ page can point this at it;
 * a branch without one should skip adding this item rather than pass a
 * guess. */
export function sharedFaqNavbarItem(target: string) {
  return {
    html: 'FAQ <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="navbar-faq-icon"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.925-.966 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>',
    to: target,
    position: 'left' as const,
  };
}

/** A plain link to the in-site Community page (src/pages/community.tsx)
 * instead of a dropdown -- that page is where the channel list (same
 * links as sharedCommunityFooterLinks) actually lives now, presented as
 * real cards rather than a flyout menu (ballerina.io/community was the
 * reference for that pattern). `position: 'left'` here (and on the
 * other nav items below) puts these in the CENTER-justified group in
 * theme/Navbar/Content's custom 3-region layout (logo pinned left,
 * these centered, GitHub/toggle/search pinned right) -- despite the
 * name, "left" just means "not explicitly right" to Docusaurus's own
 * left/right split, which our swizzle repurposes. */
export const sharedCommunityNavbarItem = {
  to: '/community',
  label: 'Community',
  position: 'left' as const,
};

export const sharedBlogNavbarItem = {
  href: 'https://wso2.com/integration-platform/learn/',
  label: 'Learn Hub',
  position: 'left' as const,
};

/** Links to the in-site Contribute page (src/pages/contribute.tsx),
 * which itself links out to the real GitHub CONTRIBUTING.md -- `branch`
 * still picks which branch's guide that in-page link points at, same
 * as before. */
export function sharedContributeNavbarItem() {
  return {
    to: '/contribute',
    label: 'Contribute',
    position: 'left' as const,
  };
}

/** `target` is an in-site doc path (rendered as `to`, real client-side route) or an external URL (rendered as `href`) -- wso2-connectors has no release-notes page of its own, so it points at GitHub's releases instead. */
export function sharedReleasesNavbarItem(target: string) {
  const isExternal = target.startsWith('http');
  return {
    [isExternal ? 'href' : 'to']: target,
    label: 'Releases',
    position: 'left' as const,
  };
}
