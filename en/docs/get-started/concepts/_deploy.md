import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

## Deploy and Run

The concepts that apply once an integration leaves the editor. Deployment targets, pipelines, and the managed cloud runtime are covered in [Deploy and Run](../../deploy-and-run/deploy-and-run.md).

### Deployment models

An integration can run in one of two models, which differ in who operates the control plane and where the data plane lives:

- **WSO2-managed**: provisioned and operated by WSO2, as part of WSO2 Integration Cloud
- **Self-hosted**: runs entirely on your own infrastructure, with no dependency on WSO2 Integration Cloud

The development experience does not change based on which model you choose. Most of the concepts below, resource hierarchy, environments, promotion, deployment tracks, describe how the WSO2-managed model works, since they're WSO2 Integration Cloud features. Self-hosted deployments use a simpler topology that maps to the same essential planes, managed through ICP or your own tooling and pipelines, rather than through these specific features.

### Deployment targets

Available deployment targets include:

- **WSO2 Integration Cloud**: push directly from the editor to the managed platform, with no infrastructure setup required
- **Virtual machines and bare metal**: deploy as a standalone JAR file
- **Containers**: package as a container image and deploy to Docker, Kubernetes, or Red Hat OpenShift
- **Serverless**: run integrations as serverless functions
- **GraalVM native images**: compile to a native binary for faster startup and lower memory usage

### Control plane and data plane

The **control plane** is the operations brain of the platform: the place where the deploy, manage, and observe actions happen. It doesn't run your integrations itself; it orchestrates the data plane and interprets the observability plane.

The **data plane** is the infrastructure your integrations actually run on. All runtime traffic is restricted to it, keeping user data contained within its boundary.

Which system plays the control plane role depends on the deployment model. For WSO2-managed deployments, it's the SaaS control plane provided by WSO2 Integration Cloud, which also manages the cloud data plane. For self-hosted deployments, it's the [Integration Control Plane (ICP)](#integration-control-plane-icp), or your own tooling and pipelines if you choose not to use ICP.

<ThemedImage
    alt="WSO2 Integration Cloud high-level view"
    sources={{
        light: useBaseUrl('/img/get-started/concepts/ipaas-concepts/high-level-view.png'),
        dark: useBaseUrl('/img/get-started/concepts/ipaas-concepts/high-level-view.png'),
    }}
/>

### Resource hierarchy

Organizations, data planes, projects, environments, and integrations relate to each other in a fixed hierarchy. Understanding it explains where each resource lives and what it can reach.

<ThemedImage
    alt="Resource hierarchy"
    sources={{
        light: useBaseUrl('/img/get-started/concepts/ipaas-concepts/resource-hierarchy.png'),
        dark: useBaseUrl('/img/get-started/concepts/ipaas-concepts/resource-hierarchy.png'),
    }}
/>

- **Organizations and data planes.** Data planes are connected to the organization and are available to every project within it. When you create an environment in a project, the data plane connected to the organization is linked with an automatically generated Kubernetes namespace.
- **Integrations and environments.** An integration belongs to a project, and environments are provisioned per project. When an integration is deployed, it is deployed as a container to the specified environment. From there, you can promote the container image across the other environments available in the project.

### Environment

An environment is an isolated deployment area with restricted network and resource access. Integrations deployed in one environment cannot communicate with those in another.

Environments are provisioned per project, and each project is associated with one or more of the environments available in the organization. Two projects in the same organization can use different sets: one might use development, staging, and production, while another uses only development and production. The cloud data plane provides development and production by default.

<ThemedImage
    alt="Environments"
    sources={{
        light: useBaseUrl('/img/get-started/concepts/ipaas-concepts/environments.png'),
        dark: useBaseUrl('/img/get-started/concepts/ipaas-concepts/environments.png'),
    }}
/>

### Environments and clusters

An environment can be associated with multiple Kubernetes clusters, which lets you build resilient, resource-efficient deployments. Integrations and workloads are synchronized between the clusters associated with an environment, so a multi-cluster deployment can be performed in a single action.

<ThemedImage
    alt="Environments and data planes"
    sources={{
        light: useBaseUrl('/img/get-started/concepts/ipaas-concepts/env-n-data-planes.png'),
        dark: useBaseUrl('/img/get-started/concepts/ipaas-concepts/env-n-data-planes.png'),
    }}
/>

:::info
A separate cluster per environment is not required. Multiple environments can run on the same cluster. The arrangement that suits your integration architecture may differ from the example shown above.
:::

### Promotion

Promotion is the act of moving a built integration from one environment to the next, for example from development to staging to production.

The platform follows a **build once, deploy many** model: an artifact is built once per commit and then promoted to higher environments unchanged. This allows changes to be tested in lower, non-production environments before reaching production. Because configuration is injected at runtime rather than baked in, configuration values can be overridden per environment while the build artifact itself stays identical.

### Configurations and secrets

Configurations and secrets are maintained at the environment level and injected into integrations at runtime, keeping environment-specific values strictly separate from source code. They include resource credentials for databases, caches, and other backing services, and credentials for external cloud services and APIs.

Two kinds exist:

- **Environment-independent configurations** apply across all environments.
- **Environment-specific configurations** apply to a single environment.

All configurations and secrets are encrypted at rest and in transit and stored in a secure vault. Once an integration is deployed with a given set of configurations, those values become immutable; changing them produces a new deployment.

### Deployment track

A deployment track is a structured pathway that links a Git branch to deployments across environments, functioning like a CI/CD pipeline. Merging a pull request automatically triggers a deployment to the development environment.

{/* TODO(v3): this diagram still shows SemVer API versioning, which is not in v3. Needs redrawing. */}

<ThemedImage
    alt="Deployment tracks"
    sources={{
        light: useBaseUrl('/img/get-started/concepts/ipaas-concepts/deployment-tracks-api-versioning.png'),
        dark: useBaseUrl('/img/get-started/concepts/ipaas-concepts/deployment-tracks-api-versioning.png'),
    }}
/>

### CI/CD

Continuous integration and continuous deployment automate building and shipping an integration across environments.

On WSO2 Integration Cloud, a build produces a container image from source, security and vulnerability scans run where applicable, and the image is pushed to a WSO2-managed container registry on the cloud data plane. Builds are reproducible, so multiple builds from the same Git commit produce images with the same behavior. Deployments use rolling updates with health checks, so a new build is verified before traffic switches to it, giving zero downtime between deployments and promotions.
