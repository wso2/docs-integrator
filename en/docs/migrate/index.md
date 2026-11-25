---
sidebar_position: 0
sidebar_label: Overview
title: Migrate to Choreo Integrator
description: Move existing MuleSoft, TIBCO BusinessWorks, and Azure Logic Apps integrations to Choreo Integrator with automated migration tooling.
keywords: [choreo integrator, migrate, migration, mulesoft, tibco, businessworks, azure logic apps]
slug: /migrate
hide_table_of_contents: true
wide_layout: true
---

# Migrate to Choreo Integrator

Choreo Integrator provides migration tools to help you move existing integrations from other platforms to Choreo Integrator. The tools analyze your integration artifacts, generate equivalent Ballerina code, and produce a migration report highlighting items that require manual attention.

If you're moving an existing integration platform to Choreo Integrator, start with the page for your current platform. Each page covers running the migration tool (every wizard screen and CLI flag), handling items that need manual attention, how platform concepts map to their Choreo Integrator equivalents, and worked examples.

## Choose your platform

<PaletteGrid>

<PaletteCard icon="migrate" href="/migrate/from-mulesoft">
  <h3 class="palette-card-title">Migrate from MuleSoft</h3>
  <ul class="palette-card-list">
    <li>Wizard or CLI, rule-based or AI-powered</li>
    <li>Concept mapping and worked examples</li>
  </ul>
</PaletteCard>

<PaletteCard icon="migrate" href="/migrate/from-tibco">
  <h3 class="palette-card-title">Migrate from TIBCO BusinessWorks</h3>
  <ul class="palette-card-list">
    <li>Wizard or CLI, rule-based or AI-powered</li>
    <li>Concept mapping and worked examples</li>
  </ul>
</PaletteCard>

<PaletteCard icon="migrate" href="/migrate/from-azure-logic-apps">
  <h3 class="palette-card-title">Migrate from Azure Logic Apps</h3>
  <ul class="palette-card-list">
    <li>CLI-only, AI-powered</li>
    <li>Concept mapping and worked examples</li>
  </ul>
</PaletteCard>

</PaletteGrid>

## Supported platforms and features

| Source platform | Choreo Integrator wizard | CLI | Rule-based | AI-powered |
|---|:---:|:---:|:---:|:---:|
| MuleSoft | ✓ | ✓ | ✓ | ✓ (optional, currently not available in CLI) |
| TIBCO BusinessWorks | ✓ | ✓ | ✓ | ✓ (optional, currently not available in CLI) |
| Azure Logic Apps | ✗ | ✓ | ✗ | ✓ (mandatory) |

**Legend:**
- **Choreo Integrator wizard:** Migration supported via the Choreo Integrator migration wizard UI.
- **CLI:** Migration supported via the Ballerina CLI tool.
- **Rule-based:** Deterministic, rules-driven migration (non-AI). Available for MuleSoft and TIBCO only.
- **AI-powered:** Migration uses AI. For MuleSoft and TIBCO, this is an optional enhancement (currently only available in the Choreo Integrator wizard, not the CLI). For Logic Apps, migration is performed entirely by AI and is mandatory.

## Migration workflow

Migration can be initiated using either the Choreo Integrator migration wizard (UI, where available) or the CLI tool. The table above shows the capabilities supported for each platform.

After migration, complete the following post-migration steps:

1. **Review:** Check the migration report to understand what was done during migration and identify any items that need manual attention.
2. **Implement:** Complete any manually flagged items (custom logic, complex transformations, or unsupported elements).
3. **Configure:** Set up `Config.toml` with connection details and environment-specific values.
4. **Test:** Review any auto-migrated tests, and add or update tests as needed to ensure the migrated integration behaves as expected compared to the source system.
5. **Deploy:** Deploy to Choreo Integrator.

## Command reference

| Command | Description |
|---|---|
| `bal migrate-mule <source-project-directory-or-file>` | Migrate from MuleSoft |
| `bal migrate-tibco <source-project-directory-or-file>` | Migrate from TIBCO BusinessWorks |
| `bal migrate-logicapps <source-project-directory-or-file>` | Migrate from Azure Logic Apps |
| `-o, --out <output-directory>` | Output directory of the migration |
| `-v, --verbose` | Enable verbose output |
| `-m, --multi-root` | (MuleSoft/TIBCO) Treat each child directory as a separate project and convert each.<br/>(Logic Apps) Treat each JSON file in the directory as a separate project and convert each. |
| `-d, --dry-run` | (MuleSoft/TIBCO) Analyze and generate a migration report without generating Ballerina code |
| `-k, --keep-structure` | (MuleSoft/TIBCO) Preserve original project structure |

Don't see your platform listed? The same underlying concepts — services, connectors, data
transformation, error handling — carry over regardless of where you're migrating from. [Get
started](/get-started/setup) with Choreo Integrator directly, or reach out on
[Discord](https://discord.com/invite/wso2) for migration guidance specific to your platform.
