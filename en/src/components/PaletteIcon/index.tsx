import React from 'react';

/**
 * Icon set for the .palette-card component (see the "PALETTE CARDS"
 * section in src/css/custom.css) -- one entry per category used
 * across the Concepts, Node Palette, and Editor Tour landing pages.
 * Centralizing the SVG paths here keeps the .md/.mdx source for each
 * card down to a single `<PaletteIcon name="..." />` tag instead of
 * a multi-line inline <svg> block repeated on every page.
 */
export type PaletteIconName =
  | 'editor-window'
  | 'views'
  | 'canvases'
  | 'designers'
  | 'panels'
  | 'ai'
  | 'foundations'
  | 'develop-test'
  | 'deploy-run'
  | 'manage-observe'
  | 'connections'
  | 'statement'
  | 'control'
  | 'error-handling'
  | 'concurrency'
  | 'logging'
  | 'more'
  | 'book'
  | 'cloud'
  | 'quickstart'
  | 'automation'
  | 'api'
  | 'event'
  | 'file'
  | 'artifacts'
  | 'ai-building-blocks'
  | 'agents'
  | 'rag'
  | 'mcp'
  | 'natural-functions'
  | 'model-providers'
  | 'embedding-providers'
  | 'vector-stores'
  | 'knowledge-bases'
  | 'chunkers'
  | 'data-loaders'
  | 'json'
  | 'xml'
  | 'csv'
  | 'xlsx'
  | 'edi'
  | 'pdf'
  | 'template'
  | 'zip'
  | 'yaml-toml'
  | 'graphql'
  | 'asyncapi'
  | 'health'
  | 'wsdl'
  | 'xsd'
  | 'persist'
  | 'scan'
  | 'tools'
  | 'transform'
  | 'test'
  | 'debug'
  | 'security'
  | 'server'
  | 'billing'
  | 'audit'
  | 'metrics'
  | 'migrate'
  | 'faq'
  | 'external';

const PATHS: Record<PaletteIconName, React.ReactNode> = {
  'editor-window': (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  views: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  canvases: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h8v9" />
    </>
  ),
  designers: (
    <>
      <path d="M4 20l4-1 10-10-3-3-10 10-1 4Z" />
      <path d="M14 6l3 3" />
    </>
  ),
  panels: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="9" cy="6" r="1.8" fill="currentColor" stroke="none" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="15" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="11" cy="18" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3l1.8 4.9L19 9.5l-5.2 1.6L12 16l-1.8-4.9L5 9.5l5.2-1.6Z" />
      <path d="M19 3v3" />
      <path d="M17.5 4.5h3" />
    </>
  ),
  foundations: (
    <>
      <path d="M12 3 2 8l10 5 10-5Z" />
      <path d="M2 13l10 5 10-5" />
    </>
  ),
  'develop-test': (
    <>
      <polyline points="8 6 3 12 8 18" />
      <polyline points="16 6 21 12 16 18" />
    </>
  ),
  'deploy-run': (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="16" x2="12" y2="8" />
      <polyline points="8 12 12 8 16 12" />
    </>
  ),
  'manage-observe': (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  connections: (
    <>
      <path d="M9 17H7a5 5 0 0 1 0-10h2" />
      <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  statement: (
    <>
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  control: (
    <>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  'error-handling': (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  concurrency: (
    <>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  logging: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  book: (
    <>
      <rect x="3" y="4" width="8" height="16" rx="1" />
      <rect x="13" y="4" width="8" height="16" rx="1" />
    </>
  ),
  cloud: (
    <>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </>
  ),
  quickstart: (
    <>
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </>
  ),
  automation: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </>
  ),
  api: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </>
  ),
  event: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  file: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </>
  ),
  artifacts: (
    <>
      <path d="M21 8l-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  'ai-building-blocks': (
    <>
      <rect x="9" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="14" width="6" height="6" rx="1" />
      <rect x="15" y="14" width="6" height="6" rx="1" />
    </>
  ),
  agents: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="2" />
      <line x1="12" y1="8" x2="12" y2="4" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  rag: (
    <>
      <path d="M5 3h9l4 4v13a1 1 0 0 1-1 1h-2" />
      <path d="M14 3v4h4" />
      <line x1="8" y1="10" x2="12" y2="10" />
      <line x1="8" y1="13" x2="11" y2="13" />
      <circle cx="9" cy="18" r="3" />
      <line x1="11.2" y1="20.2" x2="13" y2="22" />
    </>
  ),
  mcp: (
    <>
      <path d="M9 2v4" />
      <path d="M15 2v4" />
      <path d="M7 6h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5Z" />
      <path d="M12 14v3" />
      <path d="M9 21h6" />
      <path d="M12 17v4" />
    </>
  ),
  'natural-functions': (
    <>
      <path d="M9 3H7a2 2 0 0 0-2 2v3.5a2 2 0 0 1-1 1.8 2 2 0 0 1 1 1.7V15a2 2 0 0 0 2 2h2" />
      <path d="M15 3h2a2 2 0 0 1 2 2v3.5a2 2 0 0 0 1 1.8 2 2 0 0 0-1 1.7V15a2 2 0 0 1-2 2h-2" />
      <circle cx="12" cy="10.3" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  'model-providers': (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <line x1="9" y1="3" x2="9" y2="7" />
      <line x1="15" y1="3" x2="15" y2="7" />
      <line x1="9" y1="17" x2="9" y2="21" />
      <line x1="15" y1="17" x2="15" y2="21" />
      <line x1="3" y1="9" x2="7" y2="9" />
      <line x1="3" y1="15" x2="7" y2="15" />
      <line x1="17" y1="9" x2="21" y2="9" />
      <line x1="17" y1="15" x2="21" y2="15" />
    </>
  ),
  'embedding-providers': (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <line x1="7.4" y1="7.4" x2="10.6" y2="16.6" />
      <line x1="16.6" y1="7.4" x2="13.4" y2="16.6" />
      <line x1="8" y1="6" x2="16" y2="6" />
    </>
  ),
  'vector-stores': (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14a8 3 0 0 0 16 0V5" />
      <path d="M4 12a8 3 0 0 0 16 0" />
    </>
  ),
  'knowledge-bases': (
    <>
      <rect x="4" y="4" width="16" height="4" rx="1" />
      <rect x="4" y="10" width="16" height="4" rx="1" />
      <rect x="4" y="16" width="16" height="4" rx="1" />
    </>
  ),
  chunkers: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.5" y2="12" />
      <line x1="8.5" y1="12" x2="20" y2="20" />
    </>
  ),
  'data-loaders': (
    <>
      <path d="M12 3v10" />
      <polyline points="8 9 12 13 16 9" />
      <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </>
  ),
  json: (
    <>
      <path d="M8 3a3 3 0 0 0-3 3v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2a3 3 0 0 0 3 3" />
      <path d="M16 3a3 3 0 0 1 3 3v2a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2a3 3 0 0 1-3 3" />
    </>
  ),
  xml: (
    <>
      <polyline points="8 4 3 12 8 20" />
      <polyline points="16 4 21 12 16 20" />
      <line x1="13" y1="4" x2="11" y2="20" />
    </>
  ),
  csv: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="3" y1="16" x2="21" y2="16" />
      <line x1="9" y1="4" x2="9" y2="20" />
      <line x1="15" y1="4" x2="15" y2="20" />
    </>
  ),
  xlsx: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="3" y1="16" x2="21" y2="16" />
      <line x1="9" y1="4" x2="9" y2="20" />
      <line x1="15" y1="4" x2="15" y2="20" />
      <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  edi: (
    <>
      <path d="M4 7h13l-3-3" />
      <path d="M20 17H7l3 3" />
    </>
  ),
  pdf: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 3 14 8 20 8" />
      <path d="M12 12v5" />
      <polyline points="9.5 14.5 12 17 14.5 14.5" />
    </>
  ),
  template: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 9c-1 0-1 1-1 2s0 1-1 1 1 0 1 1 0 2 1 2" />
      <path d="M15 9c1 0 1 1 1 2s0 1 1 1-1 0-1 1 0 2-1 2" />
    </>
  ),
  zip: (
    <>
      <rect x="4" y="7" width="16" height="14" rx="1" />
      <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
      <rect x="10" y="7" width="4" height="4" />
      <line x1="10" y1="15" x2="14" y2="15" />
    </>
  ),
  'yaml-toml': (
    <>
      <line x1="4" y1="6" x2="9" y2="6" />
      <line x1="11" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="9" y2="12" />
      <line x1="11" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="9" y2="18" />
      <line x1="11" y1="18" x2="20" y2="18" />
      <circle cx="9.7" cy="6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="9.7" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="9.7" cy="18" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  graphql: (
    <>
      <path d="M12 2 21 7v10l-9 5-9-5V7Z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  asyncapi: (
    <>
      <path d="M4 4v6h6" />
      <path d="M4.5 15a8 8 0 1 0 2-9.5L4 10" />
    </>
  ),
  health: (
    <>
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
      <path d="M6 12h3l1.5-3 2 6 1.5-3H18" />
    </>
  ),
  wsdl: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 3 14 8 20 8" />
      <polyline points="9 14 11 16 15 12" />
    </>
  ),
  xsd: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 3 14 8 20 8" />
      <polyline points="9 12 7 14 9 16" />
      <polyline points="15 12 17 14 15 16" />
    </>
  ),
  persist: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14a8 3 0 0 0 16 0V5" />
      <path d="M4 12a8 3 0 0 0 16 0" />
    </>
  ),
  scan: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6Z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  tools: (
    <>
      <path d="M17 3a4 4 0 0 0-4.8 4.9L4 16.1V20h3.9l8.2-8.2A4 4 0 0 0 21 7l-3 3-2-2Z" />
    </>
  ),
  transform: (
    <>
      <path d="M4 7a8 8 0 0 1 13-5" />
      <polyline points="17 1 17 5 13 5" />
      <path d="M20 17a8 8 0 0 1-13 5" />
      <polyline points="7 23 7 19 11 19" />
    </>
  ),
  test: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6.5L4.5 19a1.2 1.2 0 0 0 1 1.8h13a1.2 1.2 0 0 0 1-1.8L14 9.5V3" />
      <line x1="7.5" y1="14" x2="16.5" y2="14" />
    </>
  ),
  debug: (
    <>
      <rect x="7" y="9" width="10" height="9" rx="4" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
      <line x1="7" y1="13" x2="3" y2="13" />
      <line x1="17" y1="13" x2="21" y2="13" />
      <line x1="8" y1="18" x2="5" y2="21" />
      <line x1="16" y1="18" x2="19" y2="21" />
      <line x1="12" y1="9" x2="12" y2="18" />
    </>
  ),
  security: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <circle cx="7" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  billing: (
    <>
      <path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </>
  ),
  audit: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <polyline points="9 13 11 15 15 10" />
    </>
  ),
  metrics: (
    <>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="14" width="3" height="6" />
      <rect x="10.5" y="9" width="3" height="11" />
      <rect x="15" y="4" width="3" height="16" />
    </>
  ),
  migrate: (
    <>
      <path d="m4 8 4-4 4 4M8 4v11" />
      <path d="m20 16-4 4-4-4M16 20V9" />
    </>
  ),
  faq: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  external: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </>
  ),
};

/** Every icon name this set has, in definition order -- the runtime
 * counterpart of the `PaletteIconName` type (which doesn't exist at
 * runtime). Powers `IconGallery`, so the gallery always lists exactly
 * what's actually available with zero hand-maintained duplication. */
export const PALETTE_ICON_NAMES = Object.keys(PATHS) as PaletteIconName[];

export default function PaletteIcon({ name }: { name: PaletteIconName }): React.ReactElement {
  return (
    <svg
      className="palette-card-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
