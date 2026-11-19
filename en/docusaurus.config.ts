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
  sharedAlgoliaSearch,
  sharedHeadTags,
  CROSS_PRODUCT_BASE,
} from './src/theme-shared/themeConfig';

const config: Config = {
  title: 'Choreo Agent Builder',
  tagline: 'Build, evaluate, and deploy AI agents with Copilot — powered by your Agent Manager\'s LLMs and MCP tools',
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
    // The WSO2 -> Choreo rebrand renamed deploy-to-wso2-cloud, which is
    // the one doc whose route carried the old brand. Two `from` entries,
    // not one: `lastVersion: '1.0'` (see the docs preset below) serves
    // version 1.0 unprefixed at the site root while `current` serves
    // under /next, so the old URL existed at both. Paths are written
    // without `baseUrl` -- the plugin prepends it, so these still
    // resolve under /agent-builder/ in production.
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/deploy-and-run/deploy-to-choreo-cloud',
            from: [
              '/deploy-and-run/deploy-to-wso2-cloud',
              '/next/deploy-and-run/deploy-to-wso2-cloud',
            ],
          },
        ],
      },
    ],
  ],

  // Search is Algolia (themeConfig.algolia), shared across products.
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
          // Lets docs link to a sibling product with `product://<product>/<path>`
          // instead of a hardcoded production path -- see the plugin's docstring.
          remarkPlugins: [[require('./src/plugins/crossProductLinks'), { base: CROSS_PRODUCT_BASE }]],
          lastVersion: '1.0',
          versions: {
            current: {
              label: 'Next',
              // No longer `lastVersion`, so Docusaurus already applies
              // `banner: 'unreleased'` by default -- kept explicit here
              // for the same reason wso2-integrator's own config does.
              banner: 'unreleased',
            },
            // The version ID itself stays `1.0` -- it's the literal
            // `versioned_docs/version-1.0`/`versioned_sidebars/
            // version-1.0-sidebars.json` folder/file name and
            // `versions.json`'s own entry, same convention
            // wso2-integrator's config uses for its own label overrides.
            // `label` only overrides what's DISPLAYED (version dropdown,
            // DocVersionBadge/Banner) to `1.0-beta` -- deliberately NOT
            // overriding `path` too: this version is also `lastVersion`
            // below, and Docusaurus only serves `lastVersion` unprefixed
            // at the site root when it keeps its *default* path. Giving
            // it an explicit `path: '1.0-beta'` un-aliases it from root,
            // and this branch's navbar/footer (docusaurus.config.ts)
            // hardcode absolute unprefixed links (`to: '/reference/faq'`,
            // `/get-started/cloud-setup'`, etc., rendered on every page)
            // that depend on that root-aliasing -- confirmed by a real
            // build: that combination 404s all of them, on every page.
            // Dropping `path` keeps the URL as plain `/1.0/`, matching
            // wso2-integrator's own convention exactly. Going GA later
            // is then just deleting this `label` -- no versioned_docs
            // rename, no re-cut.
            '1.0': {
              label: '1.0-beta',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
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
        // Overrides sharedGithubNavbarItem's href -- this product's own
        // repo, not the docs-integrator repo every other branch points
        // at. Same icon/styling, only the target differs.
        { ...sharedGithubNavbarItem, href: 'https://github.com/wso2/product-agent-builder' },
        // Last on purpose: the right zone renders search, toggle,
        // divider, then these in array order (see theme/Navbar/Content),
        // so this button ends the row. `html` (not `label`) so
        // Docusaurus doesn't append its external-link arrow; styled by
        // .navbar-download-btn in custom.css.
        {
          html: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Download',
          href: 'https://github.com/wso2/product-agent-builder/releases',
          position: 'right',
          className: 'navbar-download-btn',
          'aria-label': 'Download Choreo Agent Builder',
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
            { label: 'Concepts', to: '/get-started/concepts' },
            { label: 'Setup', to: '/get-started/setup' },
            { label: 'Quickstarts', to: '/get-started/quickstarts/build-ai-agent' },
          ],
        },
        {
          title: 'Editor Tour',
          items: [
            { label: 'Flow Canvas', to: '/editor/canvases/flow-canvas' },
            { label: 'Copilot', to: '/editor/copilot' },
            { label: 'Project View', to: '/editor/views/project-view' },
          ],
        },
        {
          // Same develop -> deploy -> manage -> observe column as
          // wso2-integrator's footer.
          title: 'Integration Lifecycle',
          items: [
            { label: 'Develop and Test', to: '/develop-and-test' },
            { label: 'Deploy and Run', to: '/deploy-and-run' },
            { label: 'Manage', to: '/manage' },
            { label: 'Observe', to: '/observe' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Guides', to: '/guides' },
            { label: 'FAQ', to: '/reference/faq' },
          ],
        },
      ],
      copyright: sharedFooterCopyright,
    },
    prism: sharedPrism,
  } satisfies Preset.ThemeConfig,
};

export default config;
