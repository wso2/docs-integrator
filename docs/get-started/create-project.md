---
title: Create Your First Project
---

# Create Your First Project

Create a new WSO2 Integrator project and understand what gets generated.

## Create a project

1. Open WSO2 Integrator.
2. Select **Create**.
3. Set **Integration Name** to `MyNewProject`.
4. Set **Project Name** to `FirstProject`.
5. Select **Browse**.
6. Select the project location and select **Open**.
7. Select **Create Integration**.

<ThemedImage
    alt="Create the Project"
    sources={{
        light: useBaseUrl('/img/get-started/first-project/create-the-project-light.gif'),
        dark: useBaseUrl('/img/get-started/first-project/create-the-project-dark.gif'),
    }}
/>

## Project structure

WSO2 Integrator generates a structured project that organizes your integration logic, configurations, and resources.

```
FirstProject/
├── .choreo/
│   └── context.yaml
├── .vscode/
│   └── settings.json
├── MyNewProject/
│   ├── .vscode/
│   │   ├── launch.json
│   │   └── settings.json
│   ├── .gitignore
│   ├── agents.bal              # AI agent definitions
│   ├── automation.bal          # Scheduled and manual automations
│   ├── Ballerina.toml          # Integration metadata and dependencies
│   ├── config.bal              # Configuration variables
│   ├── connections.bal          # Connection configurations
│   ├── data_mappings.bal       # Data transformation mappings
│   ├── functions.bal           # Reusable functions
│   ├── main.bal                # Entry point / service definition
│   └── types.bal               # Shared type definitions
└── Ballerina.toml              # Project-level metadata
```

## Run the project

1. Select the **Run** button in the IDE toolbar.
2. The project will compile and start running locally.
3. Use the **Try-It** tool or a terminal to verify the service.

## What's next

- [Build an API integration](build-api-integration.md) — Your first real integration
