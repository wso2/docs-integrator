/**
 * Full custom swizzle (not a @theme-original wrapper). Stock EditThisPage
 * renders inline wherever DocItem/Footer places it -- the very bottom of
 * the article, alongside "Last updated" -- easy to miss below a long
 * page. Portals the SAME link (same editUrl prop, same destination,
 * Docusaurus's own computation of it entirely untouched) into
 * #wso2-edit-page-slot instead, a target rendered next to CopyPageButton
 * in the secondary navbar row (see theme/Navbar/index.tsx's docstring)
 * -- so it's visible immediately, not just after scrolling to the
 * bottom.
 *
 * DocItem/Footer (stock, not swizzled) still calls this exactly as
 * before and still decides whether to render it at all (only when
 * editUrl exists) -- only WHERE this component's own output ends up in
 * the DOM changes, not who decides to render it or with what URL.
 *
 * The portal target may not exist yet on first render (this component
 * and the navbar row mount as part of the same pass, but createPortal
 * needs a real DOM node, unavailable during SSR) -- render nothing
 * until an effect confirms the target is actually in the DOM.
 *
 * Original: node_modules/@docusaurus/theme-classic/lib/theme/EditThisPage/index.js
 * Keep this file in sync if you bump the @docusaurus/theme-classic major version.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

// @theme/EditThisPage ships no concrete Props type (theme-classic's own
// declaration just re-exports itself) -- stock's actual usage is this one field.
type Props = { editUrl: string };

function EditIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

export default function EditThisPage({ editUrl }: Props): ReactNode {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById('wso2-edit-page-slot'));
  }, []);

  if (!slot) {
    return null;
  }

  return createPortal(
    // aria-label, not just the visible text, because .editLabel is
    // display:none below the icon-only breakpoint (styles.module.css) --
    // an accessible name still has to come from somewhere once that
    // text is gone.
    <Link to={editUrl} className={clsx(ThemeClassNames.common.editThisPage, styles.editLink)} aria-label="Edit this page">
      <EditIcon />
      <span className={styles.editLabel}>
        <Translate id="theme.common.editThisPage" description="The link label to edit the current page">
          Edit this page
        </Translate>
      </span>
    </Link>,
    slot,
  );
}
