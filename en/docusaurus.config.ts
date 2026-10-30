import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {
  sharedColorMode,
  sharedDocsSidebar,
  sharedNavbarLogo,
  sharedFooterStyle,
  sharedFooterCopyright,
  sharedCommunityNavbarItem,
  sharedGithubNavbarItem,
  sharedBlogNavbarItem,
  sharedContributeNavbarItem,
  sharedPrism,
  sharedImage,
  sharedHeadTags,
  sharedAlgoliaSearch,
  CROSS_PRODUCT_BASE,
} from './src/theme-shared/themeConfig';

const config: Config = {
  title: 'WSO2 Integrator Documentation',
  tagline: 'Build integrations with low-code simplicity and pro-code power',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://wso2.com',
  baseUrl: process.env.BASE_URL || '/',

  // Exposes CROSS_PRODUCT_BASE to client-side code (SidebarProductHeader) --
  // see themeConfig.ts's CROSS_PRODUCT_BASE docstring, and saas's own
  // docusaurus.config.ts for the fuller explanation of why this bridge
  // exists at all.
  customFields: {
    crossProductBase: CROSS_PRODUCT_BASE,
    // Shows the AI assistant button and side panel (see FloatingActions).
    // Off until the feature is ready; set to true to bring it back.
    showAiAssistant: false,
  },

  organizationName: 'wso2',
  projectName: 'docs-integrator',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'throw',

  // Google Tag Manager + CookiePro -- see themeConfig.ts's sharedHeadTags
  // docstring for the full explanation (same snippet on every product
  // branch, and why there is deliberately no GTM <noscript> snippet).
  headTags: sharedHeadTags,

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    './src/plugins/connector-versions',
    './plugins/docusaurus-plugin-markdown-export',
    './src/plugins/expose-sidebars',
    // Now registered -- docs/guides/ has sample content for it to scan
    // (see docs/guides/guides.md and HOW_TO_WRITE_A_GUIDE.md).
    './src/plugins/guidesCatalogPlugin.js',
  ],

  // @easyops-cn/docusaurus-search-local used to live here -- replaced by
  // Algolia (themeConfig.algolia below), which is site-wide across every
  // product instead of scoped to just this build. See sharedAlgoliaSearch's
  // own docstring in themeConfig.ts for the full explanation.
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/wso2/docs-integrator/tree/main/en/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          // custom.css is wholesale-shared (sync-theme.yaml), overwritten in
          // full on every sync from main -- product.css is this branch's own,
          // never synced (see its own header comment). Keep page-specific or
          // branch-specific CSS there, not in custom.css.
          customCss: ['./src/css/custom.css', './src/css/product.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: sharedImage,
    colorMode: sharedColorMode,
    docs: sharedDocsSidebar,
    algolia: sharedAlgoliaSearch,
    // "On this page" shows H2/H3 only, matching every real product
    // branch -- see wso2-integrator's own docusaurus.config.ts for the
    // full reasoning.
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    navbar: {
      logo: sharedNavbarLogo,
      // Single-header design, matching every real product branch: four
      // text links, then (right zone) search, colour-mode toggle,
      // GitHub and a CTA button. The old "Connectors" self-link and
      // "Explore" mega-dropdown are gone -- a new product branch
      // starting from this scaffold should follow the same pattern,
      // not the pre-redesign one. Explore's own sections are now this
      // page's own "Explore the scaffold" grid and the docs sidebar.
      items: [
        sharedBlogNavbarItem,
        sharedCommunityNavbarItem,
        sharedContributeNavbarItem(),
        // Plain-text FAQ (the shared sharedFaqNavbarItem adds a "?" icon
        // the new header doesn't have) -- same as every real product.
        { label: 'FAQ', to: '/reference/faq', position: 'left' },
        sharedGithubNavbarItem,
        // Last on purpose: the right zone renders search, toggle,
        // divider, then these in array order (see theme/Navbar/Content),
        // so this button ends the row. `html` (not `label`) so
        // Docusaurus doesn't append its external-link arrow; styled by
        // .navbar-download-btn in custom.css.
        {
          html: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Download',
          href: 'https://wso2.com/products/downloads/?product=wso2integrator',
          position: 'right',
          className: 'navbar-download-btn',
          'aria-label': 'Download WSO2 Integrator',
        },
      ],
    },
    footer: {
      style: sharedFooterStyle,
      links: [
        {
          title: 'Get Started',
          items: [
            { label: 'Platform Overview', to: '/platform-overview' },
            { label: 'Cloud Setup', to: '/get-started/cloud-setup' },
            { label: 'Concepts', to: '/get-started/concepts' },
            { label: 'Quickstarts', to: '/get-started/quickstarts' },
          ],
        },
        {
          title: 'Section 1',
          items: [
            { label: 'Overview', to: '/section-1' },
            { label: 'Sub-section 1', to: '/section-1/sub-section-1' },
            { label: 'Sample Page', to: '/section-1/sub-section-1/sample-page' },
            { label: 'Sub-section 2', to: '/section-1/sub-section-2' },
          ],
        },
        {
          title: 'Section 2',
          items: [
            { label: 'Overview', to: '/section-2' },
            { label: 'Page 1', to: '/section-2/page-1' },
            { label: 'Page 2', to: '/section-2/page-2' },
          ],
        },
        {
          title: 'Guides',
          items: [
            { label: 'Overview', to: '/guides' },
            { label: 'How to Guides', to: '/guides/how-to-guides' },
            { label: 'Business Use Cases', to: '/guides/business-use-cases' },
          ],
        },
        {
          title: 'Reference',
          items: [
            { label: 'Overview', to: '/reference' },
            { label: 'FAQ', to: '/reference/faq' },
            { label: 'Glossary', to: '/reference/glossary' },
          ],
        },
      ],
      copyright: sharedFooterCopyright,
    },
    prism: sharedPrism,
  } satisfies Preset.ThemeConfig,
};

export default config;
