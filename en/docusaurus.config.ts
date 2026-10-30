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
  title: 'WSO2 Integrator Official Documentation',
  tagline: 'Build, connect, and run integrations, long-running workflows, MCP servers, and AI agents with built-in governance, and architectural freedom.',
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
          editUrl: 'https://github.com/wso2/docs-integrator/tree/wso2-integrator/en/',
          showLastUpdateTime: true,
          // Lets docs link to a sibling product with `product://<product>/<path>`
          // instead of a hardcoded production path -- see the plugin's docstring.
          remarkPlugins: [[require('./src/plugins/crossProductLinks'), { base: CROSS_PRODUCT_BASE }]],
          // Serve the latest *released* version (5.1.0) at the site root
          // by default, with Next (docs/, in-progress for the release
          // after 5.1) behind /next/ and older releases behind the
          // version switcher — Docusaurus's own default behavior.
          //
          // This used to be `lastVersion: 'current'`, back before 5.1.0
          // existed, to force Next to the root instead of the old frozen
          // 5.0.0 snapshot. Now that 5.1.0 is a real release, leaving it
          // as 'current' made Docusaurus treat 5.1.0 as a non-last
          // version too: its auto-banner logic then stamped 5.1.0 with
          // the same `unmaintained` banner as actually-old releases, and
          // visitors landed on unreleased Next docs by default instead
          // of the stable release. Bump this to the new latest release's
          // version id each time one is cut.
          //
          // CHOREO_BUILD overrides this to 'current' (paired with
          // onlyIncludeVersions below): the Choreo-hosted staging preview
          // only ever needs to show in-progress ("Next") content, and
          // building 5.1.0 + 5.0.0's full versioned_docs snapshots on top
          // of it is what was driving the EMFILE failures there -- 3x the
          // concurrent file writes of an unversioned branch for a preview
          // that doesn't need the old releases at all. The real
          // production/GitHub Pages pipeline (staging_sync.yaml,
          // promote_to_production.yaml) runs plain `npm run build`, so it
          // never sets CHOREO_BUILD and keeps building every version.
          lastVersion: process.env.CHOREO_BUILD === 'true' ? 'current' : '5.1.0',
          onlyIncludeVersions: process.env.CHOREO_BUILD === 'true' ? ['current'] : undefined,
          versions: {
            current: {
              label: 'Next',
              // No longer `lastVersion`, so Docusaurus already applies
              // `banner: 'unreleased'` by default -- kept explicit here
              // since theme/DocVersionBanner's comment points back to
              // this line to explain why Next has a banner at all.
              banner: 'unreleased',
            },
            // The version ID itself stays full semver (it's the literal
            // `versioned_docs/version-X.Y.Z` / `versioned_sidebars/
            // version-X.Y.Z-sidebars.json` folder/file name, and
            // versions.json's own entry -- renaming any of those is a
            // bigger, separate change). `label` only overrides what's
            // DISPLAYED (version dropdown, DocVersionBadge/Banner) to the
            // one-decimal form instead. The next cut after this one gets
            // its own entry here the same way.
            '5.1.0': {
              label: '5.1',
            },
            '5.0.0': {
              label: '5.0',
            },
          },
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
    // "On this page" shows H2/H3 only (the "Nesting depth" design
    // reference's own rule) -- a doc with real content below H3 uses a
    // bold lead-in or a list instead, per that same reference ("H5/H6
    // are not used"); H4 still renders in the article body, it just
    // doesn't get its own TOC entry.
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    navbar: {
      logo: sharedNavbarLogo,
      // Single-header design: four text links, then (right zone) search,
      // color-mode toggle, GitHub and Download. Connectors, Explore and
      // Releases moved out of the navbar -- Connectors stays one click away
      // in the product switcher, Explore's sections are the landing page's
      // "Explore the platform" grid and the docs sidebar, Releases in the
      // Reference sidebar -- and the Discord/Stack Overflow/LinkedIn/
      // YouTube/X icons live in the footer and the Community page instead.
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

        // Plain-text FAQ (the shared sharedFaqNavbarItem adds a "?" icon the
        // new header doesn't have).
        { label: 'FAQ', to: '/reference/faq', position: 'left' },
        sharedGithubNavbarItem,
        // Last on purpose: the right zone renders search, toggle, divider,
        // then these in array order (see theme/Navbar/Content), so the
        // Download button ends the row. `html` (not `label`) so Docusaurus
        // doesn't append its external-link arrow; styled by
        // .navbar-download-btn in custom.css.
        {
          html: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Download',
          href: 'https://wso2.com/products/downloads/?product=wso2integrator',
          position: 'right',
          className: 'navbar-download-btn',
          'aria-label': 'Download WSO2 Integrator',
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
          // observe journey (each linking to that section's own landing
          // page), same as saas. The Integration Control Plane is this
          // product's self-hosted manage/observe surface, so it sits here too.
          title: 'Integration Lifecycle',
          items: [
            { label: 'Develop and Test', to: '/develop-and-test' },
            { label: 'Deploy and Run', to: '/deploy-and-run' },
            { label: 'Manage', to: '/manage' },
            { label: 'Observe', to: '/observe' },
            { label: 'Integration Control Plane', to: '/icp' },
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
