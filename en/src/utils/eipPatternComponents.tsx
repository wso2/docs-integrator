import React, { type ComponentProps } from 'react';
import Tabs from '@theme/Tabs';
import useBaseUrl from '@docusaurus/useBaseUrl';

type EipReferenceLinkProps = {
  href: string;
  label: string;
};

type PatternImplementationTabsProps = {
  children: ComponentProps<typeof Tabs>['children'];
};

type PatternImageProps = {
  src: string;
  alt: string;
  width: number | string;
};

export function EipReferenceLink({ href, label }: EipReferenceLinkProps): React.ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title="EIP Reference"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ verticalAlign: '-2px' }}
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </svg>
    </a>
  );
}

export function PatternImplementationTabs({
  children,
}: PatternImplementationTabsProps): React.ReactElement {
  return <Tabs>{children}</Tabs>;
}

export function PatternImage({ src, alt, width }: PatternImageProps): React.ReactElement {
  return (
    <img
      src={useBaseUrl(src)}
      alt={alt}
      width={width}
      style={{ display: 'block', margin: '0 auto' }}
    />
  );
}
