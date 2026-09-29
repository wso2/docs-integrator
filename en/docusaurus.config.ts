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
  sharedDiscordNavbarItem,
  sharedStackOverflowNavbarItem,
  sharedYoutubeNavbarItem,
  sharedLinkedInNavbarItem,
  sharedXNavbarItem,
  sharedBlogNavbarItem,
  sharedContributeNavbarItem,
  sharedFaqNavbarItem,
  sharedPrism,
  sharedImage,
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
  },

  organizationName: 'wso2',
  projectName: 'docs-integrator',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'throw',

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

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: false,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        indexPages: true,
        searchBarShortcutHint: false,
      },
    ],
  ],

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
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: sharedImage,
    colorMode: sharedColorMode,
    docs: sharedDocsSidebar,
    navbar: {
      logo: sharedNavbarLogo,
      items: [
        {
          // Real <a> tag (via pathname:// + autoAddBaseUrl:false), not a
          // client-side route -- see SidebarProductHeader's docstring for
          // why. Kept here even though this branch has no real product
          // content, to fully demonstrate the cross-product-link pattern
          // a new product branch would also want.
          href: `pathname://${CROSS_PRODUCT_BASE}connectors/catalog`,
          autoAddBaseUrl: false,
          target: '_self',
          html: 'Connectors',
          position: 'left',
        },
        // Mirrors saas's "Explore" dropdown, pointed at this branch's own
        // scaffold instead of real platform sections. Order matches each
        // section's _category_.json position. Platform Overview is
        // copied verbatim from saas (a genuinely common page across
        // every product -- see its own frontmatter); Get Started/Guides/
        // Reference mirror saas's real structure with sample content;
        // Section 1/2 and Icons/Homepage/Workflows are this scaffold's
        // own convention demonstrations, not present on a real product
        // branch.
        {
          type: 'custom-exploreDropdown',
          label: 'Explore',
          position: 'left',
          items: [
            { title: 'Platform Overview', description: 'Copied verbatim from saas -- common to every product branch.', href: '/platform-overview' },
            { title: 'Get Started', description: 'Sample sign-up/concepts/quickstarts pages, in the same shape saas uses.', href: '/get-started' },
            { title: 'Section 1', description: 'Placeholder top-level section with sample sub-sections.', href: '/section-1' },
            { title: 'Section 2', description: 'Two plain leaf docs, each with its own sidebar separator label.', href: '/section-2' },
            { title: 'Guides', description: 'A searchable guide catalog with a few sample guides.', href: '/guides' },
            { title: 'Reference', description: 'Sample FAQ and glossary pages, in the same shape saas uses.', href: '/reference' },
            { title: 'Icons', description: 'Every icon available to doc authors, and how to use one.', href: '/icons' },
            { title: 'Homepage', description: 'How the landing page and its search bar are put together, and how to customize them.', href: '/homepage' },
            { title: 'Workflows', description: 'Every CI workflow, and the full checklist for onboarding a new product.', href: '/workflows' },
            { title: 'Tools', description: 'Brand color palette/logos, and downloadable Claude Code skills for this repo.', href: '/tools' },
          ],
        },
        sharedContributeNavbarItem(),
        sharedCommunityNavbarItem,
        sharedBlogNavbarItem,
        sharedFaqNavbarItem('/reference/faq'),
        sharedGithubNavbarItem,
        sharedDiscordNavbarItem,
        sharedStackOverflowNavbarItem,
        sharedYoutubeNavbarItem,
        sharedLinkedInNavbarItem,
        sharedXNavbarItem,
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
