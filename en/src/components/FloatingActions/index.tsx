import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AIAssistantSidePanel from '@site/src/components/AIAssistantSidePanel/Launcher';
import ReportIssueButton from '@site/src/components/ReportIssueButton';

import styles from './styles.module.css';

/**
 * Shared fixed-position bottom-right cluster for every floating action
 * button on the site -- currently ReportIssueButton and
 * AIAssistantSidePanel. One shared wrapper (not each button positioning
 * itself independently) so they move, space, and resize together at
 * each breakpoint via a single set of media queries here, instead of
 * duplicating the same right/bottom/gap/size numbers in every button's
 * own CSS and risking them drifting out of sync. Mounted once, in
 * src/theme/Root.js, so it's present on every page.
 *
 * Order matters: ReportIssueButton first (left, secondary action),
 * AIAssistantSidePanel second (right, closest to the corner -- the
 * primary action).
 *
 * AIAssistantSidePanel only shows when the site's docusaurus.config.ts
 * sets `customFields.showAiAssistant: true`. A branch without the
 * setting keeps it hidden.
 */
export default function FloatingActions(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const showAiAssistant = siteConfig.customFields?.showAiAssistant === true;

  return (
    <div className={`${styles.wrapper} floating-actions`}>
      <ReportIssueButton />
      {showAiAssistant && <AIAssistantSidePanel />}
    </div>
  );
}
