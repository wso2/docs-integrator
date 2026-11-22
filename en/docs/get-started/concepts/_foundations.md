## Foundations

These concepts apply at every phase of the lifecycle, independent of how or where an integration runs.

### Organization

An organization is the top-level boundary that owns all integration-related resources and the users who work with them. Every project, integration, and deployment belongs to exactly one organization.

In the Choreo Integrator editor, the organization is declared as the `org` field in your project's package descriptor (`Ballerina.toml`). It identifies who owns the source code and forms part of the fully qualified name of every artifact you build, for example `acme/payments:1.0.0`, where `acme` is the organization, `payments` is the package, and `1.0.0` is the version. The organization name acts as a namespace, disambiguating packages, libraries, and integrations across the wider ecosystem.

When you push code to Choreo Cloud, the organization name in your `Ballerina.toml` must correspond to an organization you are a member of in the cloud.

### Project

A project is a workspace that groups related integrations together. It is the unit of co-development: the integrations inside a project are versioned in Git and pushed to Choreo Cloud together, even though each one remains independently buildable and deployable.

A project is not itself a package. It is a container for packages: each integration inside a project has its own `Ballerina.toml`, its own version, and its own deployment lifecycle. The project provides the shared boundary; the integrations provide the deployable units.

A project typically contains:

- One or more integrations, each in its own directory with its own `Ballerina.toml`
- Shared configuration that applies across the integrations
- Any project-level metadata used by the editor and Choreo Cloud

Projects can be organized in two common ways. In a monorepo layout, a single Git repository holds one project with each integration under a different path. In a polyrepo layout, each integration lives in its own repository.

### Package

A package is the unit of distribution and versioning in the platform, identified by the combination of its organization name, package name, and version, for example `acme/payments:1.0.0`. The package name is declared in `Ballerina.toml` and must be unique within the organization.

### Library

A library is a reusable package consumed by other projects as a dependency. Connectors and shared utility functions are typically distributed as libraries. You add a library to your project by adding an import statement to the source code, after which its functions, types, and clients become available to your integration.
