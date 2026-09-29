import type { ReactNode } from 'react';
import AiAssistantPanel from '@site/src/components/AiAssistantPanel';
import ReportIssueButton from '@site/src/components/ReportIssueButton';

import styles from './styles.module.css';

/**
 * Shared fixed-position bottom-right cluster for every floating action
 * button on the site -- currently ReportIssueButton and
 * AiAssistantPanel. One shared wrapper (not each button positioning
 * itself independently) so they move, space, and resize together at
 * each breakpoint via a single set of media queries here, instead of
 * duplicating the same right/bottom/gap/size numbers in every button's
 * own CSS and risking them drifting out of sync. Mounted once, in
 * src/theme/Root.js, so it's present on every page.
 *
 * Order matters: ReportIssueButton first (left, secondary action),
 * AiAssistantPanel second (right, closest to the corner -- the
 * primary action).
 */
export default function FloatingActions(): ReactNode {
  return (
    <div className={styles.wrapper}>
      <ReportIssueButton />
      <AiAssistantPanel />
    </div>
  );
}
