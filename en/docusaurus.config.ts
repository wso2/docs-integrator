import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'WSO2 Integrator Documentation',
  tagline: 'Build integrations with low-code simplicity and pro-code power',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://integrator.docs.wso2.com',
  baseUrl: process.env.BASE_URL || '/',

  organizationName: 'wso2',
  projectName: 'docs-integrator',

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    './src/plugins/connector-versions',
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        indexBlog: false,
        searchBarShortcutHint: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
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
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'WSO2 Integrator',
      logo: {
        alt: 'WSO2 Integrator Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: '/',
      },
      items: [
        {
          to: '/docs/get-started/overview',
          label: 'Get Started',
          position: 'left',
          activeBaseRegex: '/docs/get-started(/|$)',
        },
        {
          to: '/docs/develop/overview',
          label: 'Develop',
          position: 'left',
          activeBaseRegex: '/docs/develop(/|$)',
        },
        {
          to: '/docs/connectors/overview',
          label: 'Connectors',
          position: 'left',
          activeBaseRegex: '/docs/connectors(/|$)',
        },
        {
          to: '/docs/genai/overview',
          label: 'GenAI',
          position: 'left',
          activeBaseRegex: '/docs/genai(/|$)',
        },
        {
          to: '/docs/tutorials/overview',
          label: 'Tutorials',
          position: 'left',
          activeBaseRegex: '/docs/tutorials(/|$)',
        },
        {
          to: '/docs/deploy-operate/overview',
          label: 'Deploy & Operate',
          position: 'left',
          activeBaseRegex: '/docs/deploy-operate(/|$)',
        },
        {
          to: '/docs/reference/overview',
          label: 'Reference',
          position: 'left',
          activeBaseRegex: '/docs/reference(/|$)',
        },
        {
          href: 'https://github.com/wso2/docs-integrator',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Get Started',
          items: [
            {label: 'Overview', to: '/docs/get-started/overview'},
            {label: 'Install', to: '/docs/get-started/install'},
            {label: 'Quick Starts', to: '/docs/get-started/quick-start-api'},
          ],
        },
        {
          title: 'Develop',
          items: [
            {label: 'Integration Artifacts', to: '/docs/develop/integration-artifacts/overview'},
            {label: 'Transform', to: '/docs/develop/transform/data-mapper'},
            {label: 'Test', to: '/docs/develop/test/try-it'},
            {label: 'Connectors', to: '/docs/connectors/overview'},
            {label: 'GenAI', to: '/docs/genai/overview'},
          ],
        },
        {
          title: 'Deploy & Operate',
          items: [
            {label: 'Docker & Kubernetes', to: '/docs/deploy-operate/deploy/docker-kubernetes'},
            {label: 'CI/CD', to: '/docs/deploy-operate/cicd/github-actions'},
            {label: 'Observe', to: '/docs/deploy-operate/observe/icp'},
            {label: 'Secure', to: '/docs/deploy-operate/secure/authentication'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'WSO2 MI Documentation', href: 'https://mi.docs.wso2.com'},
            {label: 'Ballerina Central', href: 'https://central.ballerina.io'},
            {label: 'Community Forums', href: 'https://discord.com/invite/wso2'},
            {label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/wso2'},
            {label: 'GitHub', href: 'https://github.com/wso2'},
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} WSO2 LLC. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'json', 'yaml', 'toml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
