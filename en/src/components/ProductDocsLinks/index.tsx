import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

type ProductLink = {
  href: string;
  title: string;
  /** When set, the Ballerina wordmark renders after `title` in place of
   * writing out the word -- see the trademark note in sidebars.ts for
   * why these two specific files (unaltered, as provided) and not a
   * recolored/resized copy. */
  ballerinaLogo?: boolean;
};

const PRODUCT_LINKS: ProductLink[] = [
  { href: 'https://mi.docs.wso2.com', title: 'WSO2 Integrator: MI' },
  { href: 'https://si.docs.wso2.com/latest/', title: 'WSO2 Integrator: SI' },
  { href: 'https://ballerina.io/learn/', title: 'Learn', ballerinaLogo: true },
];

/** Both light/dark Ballerina wordmark images are always in the DOM;
 * CSS shows only the one matching the current theme (same
 * [data-theme='dark'] approach as src/theme/DocSidebarItem/Link, kept
 * out of that file's useColorMode-free technique for the same reason:
 * that hook needs a <ColorModeProvider> this component sits outside of
 * during static-site generation). */
function BallerinaLogo(): ReactNode {
  const lightSrc = useBaseUrl('/img/branding/ballerina-logo-light.png');
  const darkSrc = useBaseUrl('/img/branding/ballerina-logo-dark.png');
  return (
    <>
      <img src={lightSrc} alt="Ballerina" className={clsx(styles.productLinkLogo, styles.productLinkLogoLight)} />
      <img src={darkSrc} alt="Ballerina" className={clsx(styles.productLinkLogo, styles.productLinkLogoDark)} />
    </>
  );
}

function ProductLinkRow({
  href,
  title,
  ballerinaLogo,
  onLinkClick,
}: ProductLink & { onLinkClick?: () => void }): ReactNode {
  return (
    <Link href={href} className={styles.productLink} onClick={onLinkClick}>
      <span className={styles.productLinkText}>
        {title}
        {ballerinaLogo && <BallerinaLogo />}
      </span>
      <svg
        className={styles.productLinkIcon}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </Link>
  );
}

/**
 * Renders external WSO2 product doc links as plain sidebar-style entries.
 *
 * Used at the bottom of both the homepage drawer (SiteNav) and the docs
 * page sidebar (swizzled DocSidebar/Desktop) so navigation to the related
 * MI and SI doc sites stays one click away regardless of where the user
 * is. Typography matches Docusaurus's `.menu__link` so the links blend
 * in with the rest of the sidebar; a divider above marks the boundary.
 */
export default function ProductDocsLinks({
  onLinkClick,
}: {
  onLinkClick?: () => void;
} = {}): ReactNode {
  return (
    <div className={styles.productLinks}>
      {PRODUCT_LINKS.map((link) => (
        <ProductLinkRow key={link.href} {...link} onLinkClick={onLinkClick} />
      ))}
    </div>
  );
}
