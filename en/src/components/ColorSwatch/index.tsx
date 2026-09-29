import type { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

/**
 * Renders the actual CSS custom property values from src/css/custom.css
 * as swatches, for docs/tools/theme-color-palette/. A dedicated
 * component (not raw <div style="..."> in the .md) because MDX compiles
 * HTML into JSX, and JSX's `style` prop must be an object, not a CSS
 * string -- raw HTML `style="color:red"` fails the build.
 *
 *   <SwatchGrid>
 *     <ColorSwatch color="#F14E23" label="Pulse Orange" varName="--ifm-color-primary" value="#F14E23" />
 *   </SwatchGrid>
 */
export function SwatchGrid({ children }: { children: ReactNode }): ReactNode {
  return <div className={styles.grid}>{children}</div>;
}

export function ColorSwatch({
  color,
  label,
  varName,
  value,
  onColor,
  sample,
}: {
  color: string;
  label: string;
  varName: string;
  value: string;
  /** Text color for `sample`, when the swatch needs to show text-on-color contrast (see the "on dark surfaces" group). */
  onColor?: string;
  /** Short text rendered inside the swatch box itself (e.g. "Aa") -- omit for a plain color block. */
  sample?: string;
}): ReactNode {
  return (
    <div className={styles.swatch}>
      <div className={styles.box} style={{ background: color, color: onColor }}>
        {sample}
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.code}>
        {varName}
        <br />
        {value}
      </div>
    </div>
  );
}

export function LogoSwatch({
  src,
  alt,
  background,
  label,
}: {
  src: string;
  alt: string;
  background: string;
  label: string;
}): ReactNode {
  const resolvedSrc = useBaseUrl(src);
  return (
    <div className={styles.logoSwatch}>
      <div className={styles.logoBox} style={{ background }}>
        <img src={resolvedSrc} alt={alt} className={styles.logoImg} />
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.download}>
        <a href={resolvedSrc} download>
          Download SVG
        </a>
      </div>
    </div>
  );
}
