import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { detectCurrentProduct } from '@site/src/components/SidebarProductHeader';
import type { ProductKey } from '@site/src/components/SidebarProductHeader';

import styles from './styles.module.css';

/**
 * Floating "Report an issue" button -- see src/components/FloatingActions
 * for where/how this is mounted (alongside AiAssistantPanel) and its
 * shared fixed positioning/sizing.
 *
 * Links straight to each product's own issue-template chooser
 * (`/issues/new/choose`), not a prefilled `/issues/new?title=...`
 * form -- this is about reporting a problem with the *product*, and
 * `/choose` is where that product's own structured templates (bug
 * report, feature request, etc.) live. Files against the product repo,
 * not this docs-integrator repo: most things a reader reports from a
 * doc page ("this doesn't work", "this is out of date") are actually
 * product behavior, not a docs bug.
 *
 * This file is wholesale-shared (sync-theme.yaml's SHARED_PATHS) and
 * synced byte-for-byte to every product branch, so the target repo
 * can't be a single hardcoded constant -- every branch would report
 * against the same product. Instead, same pattern as
 * SidebarProductHeader's own PRODUCTS map: one map keyed by
 * `ProductKey`, with `detectCurrentProduct(baseUrl)` (reused from that
 * component, not duplicated) picking the right entry at runtime. Adding
 * a new product is then a one-line addition to this map on `main` --
 * see MAINTENANCE.md's "Onboarding a new product" checklist -- not a
 * per-branch file edit.
 *
 * TODO: every entry below is wso2/product-integrator as a placeholder
 * until each product's own real issue-tracker repo is confirmed --
 * update per product as those are decided, keeping this a map rather
 * than reverting to a single constant.
 *
 * A plain `<a>`, not a button + `window.open()` -- there's no
 * per-click URL to build anymore (the chooser page doesn't accept
 * `title`/`body` query params the way a template's own form does), so
 * a real link is simpler and gets the usual link affordances (open in
 * new tab, copy link, etc.) for free.
 */
const ISSUE_CHOOSER_URLS: Record<ProductKey, string> = {
  cloud: 'https://github.com/wso2/product-integrator/issues/new/choose',
  integrator: 'https://github.com/wso2/product-integrator/issues/new/choose',
  connectors: 'https://github.com/wso2/product-integrator/issues/new/choose',
};

function FlagIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22V4" />
      <path d="M4 4h14l-2.5 4L18 12H4" />
    </svg>
  );
}

export default function ReportIssueButton(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const product = detectCurrentProduct(siteConfig.baseUrl);
  const issueUrl = ISSUE_CHOOSER_URLS[product];

  return (
    <a
      className={styles.fab}
      href={issueUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Report product issue"
      title="Report product issue">
      <FlagIcon />
    </a>
  );
}
