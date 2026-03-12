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
  baseUrl: '/',

  organizationName: 'wso2',
  projectName: 'docs-integrator',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
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
          editUrl: 'https://github.com/wso2/docs-integrator/tree/main/',
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
      },
      items: [
        {
          to: '/docs/get-started',
          label: 'Get Started',
          position: 'left',
        },
        {
          to: '/docs/develop',
          label: 'Develop',
          position: 'left',
        },
        {
          to: '/docs/connectors',
          label: 'Connectors',
          position: 'left',
        },
        {
          to: '/docs/genai',
          label: 'GenAI',
          position: 'left',
        },
        {
          to: '/docs/tutorials',
          label: 'Tutorials',
          position: 'left',
        },
        {
          to: '/docs/deploy-operate',
          label: 'Deploy & Operate',
          position: 'left',
        },
        {
          to: '/docs/reference',
          label: 'Reference',
          position: 'left',
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
            {label: 'Integration Artifacts', to: '/docs/develop/integration-artifacts'},
            {label: 'Transform', to: '/docs/develop/transform/data-mapper'},
            {label: 'Test', to: '/docs/develop/test/try-it'},
            {label: 'Connectors', to: '/docs/connectors'},
            {label: 'GenAI', to: '/docs/genai'},
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
