---
title: Migrate Third-Party Integrations
---

# Migrate third-party integrations

WSO2 Integrator includes built-in migration tools that convert existing integration projects from other platforms into Ballerina code. The migration wizard analyzes your source project, generates equivalent Ballerina code, and provides a detailed report of the migration coverage.

Currently supported platforms:

- **TIBCO BusinessWorks** — Converts process definitions, activities, transitions, shared resources, and error handling configurations.
- **MuleSoft** — Converts Anypoint flows, HTTP connectors, DataWeave transformations, routers, and error handling patterns.

## Open the migration wizard

On the WSO2 Integrator home screen, click **Migrate Integrations from Other Vendors** to open the migration wizard.

## Migrate from MuleSoft

The migration wizard guides you through a 3-step process to convert your MuleSoft project into a WSO2 Integrator project.

### Step 1: Select source project

1. Select **MuleSoft** as the source platform.
2. Under **Select Your Project Folder**, click **Browse** and select your MuleSoft project's root folder or main configuration XML file.
3. Under **Configure MuleSoft Settings**, set the following:
   - **Force Version** — Select a specific Mule version or use **Auto Detect** to let the tool determine it from your project.
   - **Migrate Multiple Projects** — Enable this option to process all MuleSoft projects in the selected folder.
4. Click **Start Migration**.

   ![Select MuleSoft source project](/img/develop/tools/migration-tools/mule-select-source.png)

### Step 2: Review migration progress

After the migration completes, the wizard displays a summary of the migration coverage:

- **Migration Coverage** — Percentage of code lines that were automatically migrated.
- **Total code lines** — Total number of source code lines analyzed.
- **Migratable code lines** — Lines successfully converted to Ballerina.
- **Non-migratable code lines** — Lines that require manual attention.

   ![Migration progress showing coverage statistics](/img/develop/tools/migration-tools/mule-migration-progress.png)

Click **View Full Report** to see a detailed migration report. The report includes:

- **Migration Coverage Overview** — Overall coverage percentage with a breakdown of total, migratable, and non-migratable code lines.
- **Breakdown Components** — Separate coverage for Mule Elements and DataWeave expressions.
- **Manual Work Estimation** — Estimated effort (best, average, and worst case) for completing non-migratable items.
- **Currently Unsupported Elements** — List of elements that could not be automatically migrated.
- **Element Blocks that Require Manual Conversion** — Specific code blocks that need manual implementation.

   ![Full migration report](/img/develop/tools/migration-tools/mule-migration-report.png)

Click **Save Report** to download the report for future reference, then click **Next**.

### Step 3: Configure project

1. Enter an **Integration Name** for your migrated project.
2. Configure the project settings:
   - **Project Name** — Name of the project.
   - **Create within a project** — Enable project mode to manage multiple integrations and libraries within a single repository.
   - **Select Path** — Choose where to create the migrated project.
3. Under **AI Enhancement**, select one of the following:
   - **Enable AI Enhancement** — AI automatically resolves unmapped elements, fixes build errors, and improves the quality of the migration.
   - **Skip for Now – Enhance Later** — Open the project as-is. You can trigger AI enhancement later from the BI Copilot.
4. Click **Create and Start AI Enhancement** (or **Create** if you chose to skip AI enhancement).

   ![Configure migrated project](/img/develop/tools/migration-tools/mule-configure-project.png)

### MuleSoft component mapping

| MuleSoft component | Ballerina equivalent |
|---|---|
| HTTP Listener | `http:Listener` + service |
| HTTP Request | `http:Client` |
| Database Connector | `mysql:Client` / `postgresql:Client` |
| Transform (DataWeave) | Ballerina query expressions + data mapper |
| Flow Reference | Function call |
| Choice Router | `if/else` or `match` |
| For Each | `foreach` |
| Scatter-Gather | Workers (parallel execution) |
| Try | `do/on fail` |
| Object Store | Configurable state management |
| Scheduler | `task:Listener` |

## Migrate from TIBCO BusinessWorks

The migration wizard guides you through a 3-step process to convert your TIBCO BusinessWorks project into a WSO2 Integrator project.

### Step 1: Select source project

1. Select **TIBCO** as the source platform.
2. Under **Select Your Project Folder**, click **Browse** and select your TIBCO BusinessWorks project folder or main configuration file.
3. Under **Configure TIBCO Settings**, set the following:
   - **Migrate Multiple Projects** — Enable this option to process all TIBCO projects in the selected folder.
4. Click **Start Migration**.

   ![Select TIBCO source project](/img/develop/tools/migration-tools/tibco-select-source.png)

### Step 2: Review migration progress

After the migration completes, the wizard displays a summary of the migration coverage:

- **Migration Coverage** — Percentage of activities that were automatically migrated.
- **Total Projects** — Number of TIBCO projects analyzed.
- **Total activities** — Total number of TIBCO activities analyzed.
- **Migratable activities** — Activities successfully converted to Ballerina.
- **Non-migratable activities** — Activities that require manual attention.

   ![Migration progress showing coverage statistics](/img/develop/tools/migration-tools/tibco-migration-progress.png)

Click **View Aggregate Report** to see a detailed migration report. The report includes:

- **Overview** — Number of projects analyzed, total lines of code generated, and average automated migration coverage.
- **Manual Work Estimation** — Estimated effort for completing non-migratable items.
- **Per-project breakdown** — Individual coverage and manual work estimation for each migrated project.
- **Currently Unsupported Elements** — List of elements that could not be automatically migrated.

   ![Full migration report](/img/develop/tools/migration-tools/tibco-migration-report.png)

Click **Save Reports** to download the report for future reference, then click **Next**.

### Step 3: Configure project

1. Under **Select Path**, click **Browse** and choose where to save the migrated integrations.
2. Enable **Create a new folder for the packages** to organize migrated projects, and enter a **Folder Name**.
3. Under **AI Enhancement**, select one of the following:
   - **Enable AI Enhancement** — AI automatically resolves unmapped elements, fixes build errors, and improves the quality of the migration.
   - **Skip for Now – Enhance Later** — Open the project as-is. You can trigger AI enhancement later from the BI Copilot.
4. Click **Create and Start AI Enhancement** (or **Create** if you chose to skip AI enhancement).

   ![Configure migrated project](/img/develop/tools/migration-tools/tibco-configure-project.png)

### TIBCO component mapping

| TIBCO component | Ballerina equivalent |
|---|---|
| Process Definition | Ballerina service / function |
| HTTP Receiver | `http:Listener` + service |
| HTTP Request | `http:Client` |
| JDBC Connection | `mysql:Client` / `postgresql:Client` |
| JDBC Query / Update | Database query functions |
| XML Parse / Render | XML data binding / record types |
| Mapper Activity | Data transformation expressions |
| Choice (If/Else) | `if/else` |
| Iterate / Loop | `foreach` / `while` |
| Group (Transaction) | `transaction` block |
| Catch / Fault Handler | `do/on fail` error handler |
| Timer | `task:Listener` with scheduled job |
| JMS Receiver / Sender | JMS connector client |
| File Read / Write | File I/O functions |
| Log Activity | `log:printInfo()` / `log:printError()` |
| Sub-Process | Function call |
| Shared Variable | Module-level variable / `isolated` variable |

## What's next

- [Project View](../understand-ide/views/project-view.md) -- Run, edit, and debug your migrated project
- [Integration Artifacts](/docs/develop/integration-artifacts/overview) -- Understand the artifact types in your migrated project
