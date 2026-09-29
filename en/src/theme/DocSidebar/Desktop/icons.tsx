/**
 * One icon per top-level sidebar category, for the collapsed icon rail
 * (see index.tsx). Sidebar categories are auto-generated from the docs
 * folder structure, so there's no icon field to read from data -- this is
 * a hand-picked lookup by label, matching the categories that exist today.
 * `RailFallbackIcon` covers any future/renamed category so the rail never
 * renders a blank slot.
 */
import type { ReactNode } from 'react';

const iconProps = {
  width: 17,
  height: 17,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function PlatformOverviewIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <rect x="4" y="4" width="7" height="7" rx="2" />
      <rect x="13" y="4" width="7" height="7" rx="2" />
      <rect x="4" y="13" width="7" height="7" rx="2" />
      <rect x="13" y="13" width="7" height="7" rx="2" />
    </svg>
  );
}

function GetStartedIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m10 8.5 6 3.5-6 3.5Z" />
    </svg>
  );
}

function EditorIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function DevelopIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

function TestIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
    </svg>
  );
}

function DeployIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M12 3v11M8 7l4-4 4 4" />
      <path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}

function ObserveIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="M12 14l4-5" />
      <path d="M4 14h1M19 14h1M12 14v1" />
    </svg>
  );
}

function ManageIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function AIIntegrationsIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z" />
    </svg>
  );
}

function MigrateIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="m4 8 4-4 4 4M8 4v11" />
      <path d="m20 16-4 4-4-4M16 20V9" />
    </svg>
  );
}

function IntegrationControlPlaneIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M4 17V9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8" />
      <path d="M8 17v3M16 17v3" />
    </svg>
  );
}

function GuidesIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ReferenceIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M5 5h6a3 3 0 0 1 3 3v11a2.5 2.5 0 0 0-2.5-2.5H5Z" />
      <path d="M19 5h-2a3 3 0 0 0-3 3v11a2.5 2.5 0 0 1 2.5-2.5H19Z" />
    </svg>
  );
}

function ConnectorCatalogIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M8 4v5" />
      <circle cx="12" cy="14.5" r="2.3" />
    </svg>
  );
}

function BuildYourOwnIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5.6 5.2L3 17.6V21h3.4l6.1-6.1a4 4 0 0 0 5.2-5.6l-2.8 2.8-2.4-2.4Z" />
    </svg>
  );
}

function UsingConnectorsIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M9 2v5M15 2v5" />
      <path d="M6 7h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6Z" />
      <path d="M12 17v5" />
    </svg>
  );
}

function PublishConnectorIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M4 21h16" />
    </svg>
  );
}

function FaqIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 1.7-2.3 3.5" />
      <path d="M12 17.2v.1" />
    </svg>
  );
}

// A single connector's own sub-pages -- Setup Guide/Actions/Triggers/
// Example -- reused by every one of the ~165 connectors in the catalog,
// so unlike other nested categories these get icons too (see the level-3
// exception in DocSidebarItem/Link's LinkLabel): only one connector is
// ever expanded at a time in the scoped sidebar, so it's at most 4 icons
// on screen, not 165x4.
function SetupGuideIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function ActionsIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function TriggersIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

function ExampleIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5Z" />
    </svg>
  );
}

// main's own placeholder-scaffold categories (docs/section-1,
// docs/section-2, docs/icons, docs/homepage, docs/workflows) -- not
// real product sections, so their icons are generic/illustrative
// rather than concept-specific like the ones above.
function SectionIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

// Distinct from SectionIcon above -- matches the homepage's own Section 2
// card icon (IconDevelop in pages/index.tsx), so the rail and the
// homepage card agree instead of both sections sharing one glyph.
function Section2Icon(): ReactNode {
  return (
    <svg {...iconProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconsCategoryIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <circle cx="17.5" cy="6.5" r="3.5" />
      <path d="M3 21v-4a4 4 0 0 1 4-4h1" />
      <path d="M21 21v-4a4 4 0 0 0-4-4h-1" />
    </svg>
  );
}

function HomepageIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

function WorkflowsIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M6 9v6M8.5 7.5 15.5 10.5M8.5 16.5 15.5 13.5" />
    </svg>
  );
}

function ToolsIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <path d="M17 3a4 4 0 0 0-4.8 4.9L4 16.1V20h3.9l8.2-8.2A4 4 0 0 0 21 7l-3 3-2-2Z" />
    </svg>
  );
}

function FallbackIcon(): ReactNode {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

const ICONS_BY_LABEL: Record<string, () => ReactNode> = {
  'platform overview': PlatformOverviewIcon,
  // Bare "Overview" (wso2-connectors' flat top-level doc, not a category)
  // reuses the same icon as "Platform Overview" -- same concept, just a
  // shorter label on that branch's simpler sidebar.
  overview: PlatformOverviewIcon,
  'get started': GetStartedIcon,
  editor: EditorIcon,
  // saas's actual current category labels (see docs/editor/_category_.json,
  // develop-and-test/_category_.json, deploy-and-run/_category_.json) --
  // kept alongside the shorter 'editor'/'develop'/'deploy' keys above/below
  // since other branches may still use those.
  'editor tour': EditorIcon,
  develop: DevelopIcon,
  'develop and test': DevelopIcon,
  'ai integrations': AIIntegrationsIcon,
  test: TestIcon,
  deploy: DeployIcon,
  'deploy and run': DeployIcon,
  observe: ObserveIcon,
  manage: ManageIcon,
  migrate: MigrateIcon,
  'integration control plane': IntegrationControlPlaneIcon,
  'integration control plane (icp)': IntegrationControlPlaneIcon,
  guides: GuidesIcon,
  reference: ReferenceIcon,
  'connector catalog': ConnectorCatalogIcon,
  'using connectors': UsingConnectorsIcon,
  // 'build your own' kept as an alias for older branches/checkouts that
  // still carry the pre-rename sidebar label.
  'build your own': BuildYourOwnIcon,
  'build a connector': BuildYourOwnIcon,
  'publish connector': PublishConnectorIcon,
  'setup guide': SetupGuideIcon,
  actions: ActionsIcon,
  triggers: TriggersIcon,
  example: ExampleIcon,
  faq: FaqIcon,
  // main's own placeholder-scaffold categories -- see docs/section-1/,
  // docs/section-2/, docs/icons/, docs/homepage/, docs/workflows/,
  // docs/tools/. Real product branches forking from main replace these
  // entries with their own real category labels (and delete these
  // once the placeholder docs are gone) -- see "How to add a sidebar
  // category icon" in docs/section-1/sub-section-1/sample-page.md for
  // the full mechanism.
  'section 1': SectionIcon,
  'section 2': Section2Icon,
  icons: IconsCategoryIcon,
  homepage: HomepageIcon,
  workflows: WorkflowsIcon,
  tools: ToolsIcon,
};

export function railIconFor(label: string): ReactNode {
  const Icon = ICONS_BY_LABEL[label.trim().toLowerCase()] ?? FallbackIcon;
  return <Icon />;
}
