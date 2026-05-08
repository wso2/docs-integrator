---
title: Library view
---

# Library view

The Library view is a dedicated view in WSO2 Integrator for creating utilities and shared resources that you can use across multiple integrations. Rather than building executable integrations, you use the Library view to bundle shared type definitions, utility functions, custom connections, and data mapper configurations into a centralized module that other integrations can depend on.

![Library view overview](/img/develop/understand-ide/views/library-view/overview.png)

The activity bar, project explorer, editor toolbar, and deployment options panel work the same as in the [Project view](project-view.md). See that page for details. This page covers what's specific to a single library: the library overview canvas and toolbar.

## Library overview canvas

The library overview canvas is the central area of the Library view. It provides a dashboard for the library, showing the library name as a heading and an **Artifacts summary** with cards for the total number of defined types, functions, data mappers, and connections.

![Library overview canvas](/img/develop/understand-ide/views/library-view/library-overview-canvas.png)

## Add reusable artifacts

Click the **+ Add Artifacts** button at the top right of the canvas to add a new component to your library. This opens a menu with all available artifact types that can be created in a library:

- **Function**
- **Data Mapper**
- **Type**
- **Connection**
- **Configuration**

![Add artifacts menu](/img/develop/understand-ide/views/library-view/add-artifacts.png)

For detailed information on configuring each specific artifact type, see the [Integration artifacts](/docs/develop/integration-artifacts) documentation.

## Artifact management

Clicking any of the artifact category cards on the main canvas (such as **Functions** or **Types**) navigates to a specific list view for those artifacts.

![Artifact list view](/img/develop/understand-ide/views/library-view/artifact-list.png)

From this view, you can:

- View all defined artifacts of that specific type.
- Search for a specific artifact using the search bar.
- Click the **+ Add [Artifact]** button (e.g., **+ Add Function**) to create a new artifact of that type directly.

## Toolbar

The toolbar sits at the top of the Library view and provides quick access to actions for configuring and publishing your library.

![Toolbar](/img/develop/understand-ide/views/library-view/toolbar.png)

| Action | Description |
|---|---|
| **Undo** / **Redo** | Reverses or reapplies recent changes to your library artifacts. |
| **Configure** | Opens the configuration panel, equivalent to adding a configuration from the project explorer. |
| **Publish** | Builds the library and pushes it to a central repository (such as Ballerina Central), making the module available for other integrations to import. Libraries are not executable, so they are published rather than run. |

## README section

The README section at the bottom of the Library view displays the contents of your library's `README.md` file. Use it to document the library's purpose, setup instructions, and usage notes so other developers know how to consume it. Click **Edit** to modify the README directly.

![README](/img/develop/understand-ide/views/library-view/readme.png)

## What's next

- [Integration artifacts](/docs/develop/integration-artifacts): learn about the artifact types you can define in a library.
- [Packages & Modules](/docs/develop/organize-code/packages-modules): understand package structure.
- [Publish to Ballerina Central](/docs/connectors/build-your-own/custom-development): share your libraries.
