import React, { type ComponentProps } from 'react';
import OriginalImg from '@theme-original/MDXComponents/Img';
import { useInsideAnchor } from './AnchorContext';

type Props = ComponentProps<typeof OriginalImg>;

export default function ImgWrapper(props: Props): React.ReactElement {
  const insideAnchor = useInsideAnchor();
  const src = typeof (props as { src?: unknown }).src === 'string'
    ? ((props as { src: string }).src)
    : undefined;
  if (!src || insideAnchor) return <OriginalImg {...props} />;
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="zoomable-img-link"
      aria-label="Open image in new tab"
    >
      <OriginalImg {...props} />
    </a>
  );
}
