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
  sharedPrism,
  sharedImage,
  sharedAlgoliaSearch,
  sharedHeadTags,
  CROSS_PRODUCT_BASE,
} from './src/theme-shared/themeConfig';

const config: Config = {
  title: 'Choreo Integration Documentation',
  tagline: 'Build, deploy, and manage integrations at cloud speed',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://wso2.com',
  baseUrl: process.env.BASE_URL || '/',

  // Exposes CROSS_PRODUCT_BASE to client-side code (SidebarProductHeader) --
  // config-time TS modules like themeConfig.ts aren't importable from
  // browser-bundled components, so Docusaurus's customFields is the
  // sanctioned bridge. See themeConfig.ts's CROSS_PRODUCT_BASE docstring.
  customFields: {
    crossProductBase: CROSS_PRODUCT_BASE,
  },

  organizationName: 'wso2',
  projectName: 'docs-integrator',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

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
    './src/plugins/guidesCatalogPlugin',
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
          editUrl: 'https://github.com/wso2/docs-integrator/tree/saas/en/',
          showLastUpdateTime: true,
          // Lets docs link to a sibling product with `product://<product>/<path>`
          // instead of a hardcoded production path -- see the plugin's docstring.
          remarkPlugins: [[require('./src/plugins/crossProductLinks'), { base: CROSS_PRODUCT_BASE }]],
        },
        blog: false,
        theme: {
          // product.css is this branch's own, never-synced CSS file --
          // see MAINTENANCE.md, "When a branch needs its own CSS".
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
    // "On this page" shows H2/H3 only, matching wso2-integrator/
    // wso2-connectors -- see wso2-integrator's own docusaurus.config.ts
    // for the full reasoning.
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    navbar: {
      logo: sharedNavbarLogo,
      // Single-header design (matches wso2-integrator/wso2-connectors):
      // four text links, then (right zone) colour-mode toggle, GitHub
      // and "Launch WSO2 Cloud". The former "Connectors" self-link and
      // "Explore" dropdown are gone from here -- Connectors is one click
      // away via the product switcher (SidebarProductHeader) next to the
      // logo, and Explore's own sections are the homepage's "Explore the
      // platform" grid + the docs sidebar. Footer (en/src/theme/Footer,
      // shared) already renders the Discord/Stack Overflow/LinkedIn/
      // YouTube/X icons itself.
      items: [
        {
          href: `pathname://${CROSS_PRODUCT_BASE}connectors/catalog`,
          html: 'Connectors',
          autoAddBaseUrl: false,
          target: '_self',
          position: 'left' as const,
        },
        sharedBlogNavbarItem,
        sharedCommunityNavbarItem,
        // Plain-text FAQ (the shared sharedFaqNavbarItem adds a "?" icon
        // the new header doesn't have) -- same as wso2-integrator/
        // wso2-connectors.
        { label: 'FAQ', to: '/reference/faq', position: 'left' },
        sharedGithubNavbarItem,
        // Last on purpose: the right zone renders toggle, divider, then
        // these in array order (see theme/Navbar/Content), so this
        // button ends the row. `html` (not `label`) so Docusaurus
        // doesn't append its external-link arrow; styled by
        // .navbar-download-btn in custom.css -- same orange CTA
        // treatment wso2-integrator's Download / wso2-connectors'
        // Integration Store buttons use, different destination (saas is
        // cloud-hosted, no download).
        {
          html: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2.5c2.5 2.5 4 6 4 9.5 0 2-.5 3.5-1.5 5l-2.5 3-2.5-3c-1-1.5-1.5-3-1.5-5 0-3.5 1.5-7 4-9.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="11" r="1.8" stroke="currentColor" stroke-width="2"/><path d="M8.5 16 6 21l3-1.2M15.5 16 18 21l-3-1.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Launch Choreo Cloud',
          href: 'https://cloud-console-development.gateway.dev.cloud.wso2.com',
          position: 'right',
          className: 'navbar-download-btn',
          'aria-label': 'Launch Choreo Cloud',
        },
      ]
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
            { label: 'Quickstarts', to: '/get-started/quickstarts/build-automation' },
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
          // One column for the whole develop -> deploy -> manage ->
          // observe journey (each linking to that section's own
          // landing page) instead of a separate column per stage --
          // four nearly-empty columns read as more cluttered than one
          // well-organized one. Matches Resources' landing-page-only
          // pattern below.
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
            { label: 'Migrate', to: '/migrate' },
            { label: 'Guides', to: '/guides/overview' },
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
