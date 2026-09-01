---
title: "WSO2 Integrator Releases"
description: "Learn how to get supported release binaries for the Ballerina, ICP, MI, and SI profiles."
keywords: [wso2 integrator, releases, update tool, ballerina, icp, mi, si]
---

# WSO2 Integrator Releases

Use the WSO2 Integrator update tool to get supported release binaries for the default profile, Micro Integrator (MI), Streaming Integrator (SI), and Integration Control Plane (ICP). The tool resolves the active Integration Profile by default, and you can also target a specific profile explicitly. For help on any command, run `wso2integratorupdate --help` or `wso2integratorupdate <profile> --help`.

WSO2 Integrator uses the WSO2 Update Tool for these release operations. For the full command reference and additional usage details, see the [WSO2 Update Tool documentation](https://updates.docs.wso2.com/en/latest/updates/update-tool/).

:::info Default profile behavior
If your active Integration Profile is **Default**, **MI**, or **SI**, you can run `wso2integratorupdate` without naming the profile. The tool uses the selected profile and then resolves the matching release for that profile.
:::

## Supported release commands

| Product | Command | What it gets |
|---|---|---|
| **Default profile** | `wso2integratorupdate ballerina` | Gets the supported release binary for the default profile. |
| **Micro Integrator (MI)** | `wso2integratorupdate mi` | Gets the supported release binary for the MI profile. |
| **Streaming Integrator (SI)** | `wso2integratorupdate si` | Gets the supported release binary for the SI profile. |
| **Integration Control Plane (ICP)** | `wso2integratorupdate icp` | Gets the supported release binary for ICP. |

If you only want the command syntax and supported flags, use `wso2integratorupdate --help`. If you want profile-specific details, use `wso2integratorupdate ballerina --help`, `wso2integratorupdate mi --help`, or `wso2integratorupdate si --help`.

## Release notes and version history

Use the release notes to see what changed in each product release and which versions ship with the installer.

- [Release notes](../reference/appendix/release-notes.md) - Latest release highlights and version history
- [FAQ](../reference/appendix/faq.md) - Answers to common questions about the shipped distribution
