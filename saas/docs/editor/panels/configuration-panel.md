---
title: Configuration Panel
---

# Configuration Panel

The Configuration Panel is the side panel you open whenever you select **Configure** in the editor. It groups the settings that apply to the current artifact (an integration, a service, or a function) into a single form, so you can review and update them without editing source code. The panel adapts its content to the level you opened it from.

<ThemedImage
    alt="Service configuration in the Configuration Panel"
    sources={{
        light: useBaseUrl('/img/editor/panels/configuration-panel/service-configuration.png'),
        dark: useBaseUrl('/img/editor/panels/configuration-panel/service-configuration.png'),
    }}
/>

## Where to open it

The Configuration Panel can be reached from many places in the editor. The level you open it from determines which configuration the panel loads:

- **Integration level**: open from the Integration view toolbar, the project explorer, or any artifact that does not have its own configuration scope. This level is reachable from anywhere in the integration.
- **Service level**: open from the **Configure** action in the [Service Designer](../designers/service-designer.md) header, or from the service's three-dot menu in the project explorer.
- **Function level**: open from the **Configure** action on a function.
- **Data mapper level**: open from the **Configure** action on a data mapper. Data mappers use the same form as functions.

## Configuration levels

The panel exposes configuration at four levels. Each level scopes the settings to the artifact you opened it from.

### Integration-level configurations

Apply to the entire integration and are available from every place in the editor that can open the Configuration Panel. Use this level for values that should be shared across all services, automations, and functions in the integration, such as configurable variables sourced from `Config.toml`, runtime defaults, and integration-wide environment settings.

### Service-level configurations

Apply only to the selected service and override or extend the integration-level settings for that service. The form is split into the service's own settings and the configuration of every listener attached to it. For an HTTP service, this includes:

- **Base Path**: the path the service is exposed on.
- **Service Configuration**: advanced service-level options such as service-level security.
- **Configuration for `<listener>`**: the listener's own settings (for example, **Name**, **Port**, **Host**, **HTTP1 Settings**, **Secure Socket**, and **HTTP Version** for an HTTP listener), one block per attached listener.

The left pane of the panel lists the service and its **Attached Listeners** so you can jump straight to the block you want to edit.

### Function-level configurations

Use the same form you saw when you created the function. The form exposes:

- **Name** of the function.
- **Description** of the function.
- **Public** toggle, to make the function visible across the project.
- **Parameters**, with **+ Add Parameter** to add new ones.
- **Return Type** and a **Description** for the return value.

### Data mapper configurations

Use the same form as the function-level configuration, which is also identical to the form you saw when you created the data mapper. The fields map one-to-one (**Name**, **Public**, **Inputs** instead of **Parameters**, and **Output** instead of **Return Type**), so any change you make here updates the same metadata that you set during creation.

## Saving changes

The panel stages your edits until you select **Save Changes** at the top right. **Save Changes** stays disabled until at least one field has been modified, so you can open the panel to inspect a configuration without risk of changing it.

## What's next

- [Service Designer](../designers/service-designer.md): return to the service designer to manage resources and handlers.
- [Expression Panel](expression-panel.md): use configurable variables in expressions.
