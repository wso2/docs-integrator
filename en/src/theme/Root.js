import React, { useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import { Prism } from 'prism-react-renderer';
import SiteNav from '@site/src/components/SiteNav';
import FloatingActions from '@site/src/components/FloatingActions';
import { CatalogProvider } from '@site/src/components/ConnectorCatalog/context';

// Make Prism available globally so extensions can reach it
(typeof global !== 'undefined' ? global : window).Prism = Prism;

Prism.languages.ballerina = {
  comment: [
    { pattern: /\/\/.*$/m, greedy: true },
    { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
  ],

  string: [
    { pattern: /`(?:[^\\`]|\\.)*`/, greedy: true },        // template strings
    { pattern: /"(?:[^\\"\r\n]|\\.)*"/, greedy: true },    // regular strings
  ],

  annotation: {
    pattern: /@(?:[\w.]+)/,
    alias: 'builtin',
  },

  // Module-qualified types: devant:BinaryDataLoader, twilio:Client, http:Listener
  'class-name': /\b[a-z]\w*:[A-Z]\w*\b/,

  // Standalone PascalCase user-defined types and records
  'type-name': {
    pattern: /\b[A-Z]\w*\b/,
    alias: 'class-name',
  },

  keyword: /\b(?:import|as|public|private|external|final|service|resource|function|object|record|annotation|type|typedesc|new|map|future|error|stream|table|transaction|from|on|returns|return|match|foreach|in|while|do|if|else|fork|worker|wait|start|flush|send|receive|check|checkpanic|trap|panic|fail|is|typeof|var|const|configurable|isolated|transactional|rollback|commit|retry|lock|enum|class|distinct|readonly|any|anydata|never|byte|int|float|boolean|string|decimal|json|xml|handle|xmlns|listener|client|let|where|select|limit|join|outer|order|by|ascending|descending|equals|conflict|version)\b/,

  boolean: /\b(?:true|false)\b/,

  nil: {
    pattern: /\(\s*\)/,
    alias: 'constant',
  },

  number: /\b0[xX][\da-fA-F]+\b|\b0[oO][0-7]+\b|\b0[bB][01]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+)?(?:d|f)?\b/,

  operator: /->|=>|::|\.\.\.?|[+\-*/%^&|~!=<>?:]+/,

  punctuation: /[{}[\];(),.:]/,
};

// Fix navbar active state for unified sidebar — only highlight the
// tab whose path matches the current URL.
const sectionPaths = [
  '/docs/get-started',
  '/docs/develop',
  '/docs/connectors',
  '/docs/genai',
  '/docs/tutorials',
  '/docs/deploy-operate',
  '/docs/reference',
];

// Map section paths to their sidebar label text for matching.
const sectionLabels = {
  '/docs/get-started': 'Get Started',
  '/docs/develop': 'Develop',
  '/docs/connectors': 'Connectors',
  '/docs/genai': 'GenAI',
  '/docs/tutorials': 'Tutorials',
  '/docs/deploy-operate': 'Deploy & Operate',
  '/docs/reference': 'Reference',
};

function useNavbarActiveState() {
  const { pathname } = useLocation();
  const prevSectionRef = useRef(null);

  useEffect(() => {
    // Update navbar active link highlights
    const links = document.querySelectorAll('.navbar__items .navbar__link');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || !sectionPaths.some((p) => href.startsWith(p))) return;
      const section = sectionPaths.find((p) => href.startsWith(p));
      if (section && pathname.startsWith(section)) {
        link.classList.add('navbar__link--active');
      } else {
        link.classList.remove('navbar__link--active');
      }
    });

    // Collapse non-active top-level sidebar categories when section changes
    const currentSection = sectionPaths.find((p) => pathname.startsWith(p));
    if (currentSection && currentSection !== prevSectionRef.current) {
      prevSectionRef.current = currentSection;
      // Small delay to let Docusaurus render the sidebar first
      requestAnimationFrame(() => {
        const topItems = document.querySelectorAll(
          '.theme-doc-sidebar-menu > .theme-doc-sidebar-item-category-level-1'
        );
        topItems.forEach((li) => {
          const labelEl = li.querySelector(
            ':scope > .menu__list-item-collapsible .menu__link'
          );
          const label = labelEl?.textContent?.trim();
          const isActive = label === sectionLabels[currentSection];
          const toggleBtn = li.querySelector(
            ':scope > .menu__list-item-collapsible .clean-btn'
          );
          const isCollapsed = li.classList.contains('menu__list-item--collapsed');

          if (!isActive && !isCollapsed && toggleBtn) {
            toggleBtn.click();
          } else if (isActive && isCollapsed && toggleBtn) {
            toggleBtn.click();
          }
        });
      });
    }
  }, [pathname]);
}

export default function Root({ children }) {
  useNavbarActiveState();
  return (
    <CatalogProvider>
      <SiteNav />
      {children}
      <FloatingActions />
    </CatalogProvider>
  );
}
