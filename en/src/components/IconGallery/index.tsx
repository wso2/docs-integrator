import { useState } from 'react';
import type { ReactNode } from 'react';
import PaletteIcon, { PALETTE_ICON_NAMES } from '@site/src/components/PaletteIcon';

import styles from './styles.module.css';

/**
 * Renders every icon in the `PaletteIcon` set (see that component's own
 * docstring) as a labeled, click-to-copy tile -- so a doc author can
 * browse what's available and copy the exact `icon="..."` value straight
 * into a `PaletteCard` or `PaletteIcon`, instead of reading the name out
 * of `PaletteIcon/index.tsx`'s source. Reads `PALETTE_ICON_NAMES`
 * (a runtime export next to the type) rather than a hand-maintained list,
 * so a new icon added to that file shows up here automatically.
 *
 *   <IconGallery />
 */
export default function IconGallery(): ReactNode {
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(name: string) {
    // Clipboard API needs a secure context (https, or localhost during
    // dev) -- silently no-ops elsewhere rather than throwing, since a
    // failed copy shouldn't break the page.
    navigator.clipboard?.writeText(`icon="${name}"`).then(() => {
      setCopied(name);
      setTimeout(() => setCopied((current) => (current === name ? null : current)), 1500);
    }).catch(() => {});
  }

  return (
    <div className={styles.grid}>
      {PALETTE_ICON_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          className={styles.tile}
          onClick={() => handleCopy(name)}
          title={`Copy icon="${name}"`}>
          <span className={styles.tileIcon}>
            <PaletteIcon name={name} />
          </span>
          <span className={styles.tileName}>{name}</span>
          <span className={styles.tileHint}>{copied === name ? 'Copied!' : 'Click to copy'}</span>
        </button>
      ))}
    </div>
  );
}
