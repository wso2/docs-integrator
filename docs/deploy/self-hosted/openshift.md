---
title: Red Hat OpenShift
---

# Red Hat OpenShift

WSO2 Integrator uses the Ballerina Code to Cloud feature to generate OpenShift manifests directly from your source code. The `cloud = "openshift"` build option produces a Docker image and a complete set of OpenShift YAML files in a single `bal build` invocation. The generated manifests are structurally identical to the Kubernetes output but land in `target/openshift/` and are applied using the `oc` CLI.

:::info Prerequisites
- [Docker](https://www.docker.com/) installed and running on your build machine
- [OpenShift CLI (`oc`)](https://docs.openshift.com/container-platform/latest/cli_reference/openshift_cli/getting-started-cli.html) installed and logged in to your cluster
- A WSO2 Integrator project based on Ballerina

macOS users on Apple Silicon must set the following environment variable before building, because the Ballerina base Docker image does not yet support ARM:

```bash
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

This setting applies only to the current terminal session.

## How Code to Cloud works

When you build with `cloud = "openshift"`, the compiler generates OpenShift manifests alongside the executable JAR:

```
├── Cloud.toml
├── Ballerina.toml
├── Config.toml
└── target/
    ├── bin/
    │   └── <module>.jar
    ├── docker/
    │   └── Dockerfile
    └── openshift/
        └── <module>-0.0.1.yaml
```

**`Cloud.toml`** overrides defaults that the compiler infers from your code. Every field is optional. The compiler provides sensible defaults when the file is absent or when a field is omitted.

**`Config.toml`** is intentionally excluded from the container image because it can contain sensitive values. Use the `[[cloud.config.files]]` entry in `Cloud.toml` to mount it as a ConfigMap at runtime.

## Step 1: Set the cloud target

Open `Ballerina.toml` and add the cloud build option:

```toml
[build-options]
cloud = "openshift"
```

Alternatively, pass the flag inline at build time without modifying `Ballerina.toml`:

```bash
bal build --cloud=openshift
```

## Step 2: Configure the deployment

Create a `Cloud.toml` with container, resource, autoscaling, ConfigMap, and probe settings:

```toml
[container.image]
repository = "myorg"
name = "my-integration"
tag = "v1.0.0"

[cloud.deployment]
min_memory = "100Mi"
max_memory = "256Mi"
min_cpu = "500m"
max_cpu = "500m"

[cloud.deployment.autoscaling]
min_replicas = 2
max_replicas = 5
cpu = 60

[[cloud.config.files]]
file = "./Config.toml"

[cloud.deployment.probes.liveness]
port = 9091
path = "/probes/healthz"

[cloud.deployment.probes.readiness]
port = 9091
path = "/probes/readyz"
```

The `[[cloud.config.files]]` entry mounts your `Config.toml` as a ConfigMap, which is the recommended way to supply configuration to OpenShift workloads.

The `[cloud.deployment.probes.liveness]` and `[cloud.deployment.probes.readiness]` sections only apply to long-running service workloads. Omit them if your integration is an Automation. For services, add a dedicated probe listener in your Ballerina code to back these endpoints:

```ballerina
import ballerina/http;

listener http:Listener probeEndpoint = new (9091);

service /probes on probeEndpoint {
    resource function get healthz() returns boolean {
        return true;
    }
    resource function get readyz() returns boolean {
        return true;
    }
}
```

## Step 3: Build

```bash
bal build
```

The compiler generates all OpenShift manifests and prints the `oc apply` command:

```
Generating artifacts...

        @kubernetes:Service                      - complete 1/2
        @kubernetes:Service                      - complete 2/2
        @kubernetes:ConfigMap                    - complete 1/1
        @kubernetes:Deployment                   - complete 1/1
        @kubernetes:HPA                          - complete 1/1
        @kubernetes:Docker                       - complete 2/2

        Execute the below command to deploy the Kubernetes artifacts:
        oc apply -f /path/to/project/target/openshift/my-integration

        target/bin/my-integration.jar
```

For a service-type workload, the generated manifest includes a `Deployment`, `Service`, `ConfigMap`, and `HorizontalPodAutoscaler`. The  `HorizontalPodAutoscaler` is only generated when `[cloud.deployment.autoscaling]` is configured.

For Automations, the compiler generates a `Job` or `CronJob` resource instead of a `Deployment`, with no `Service` or `HorizontalPodAutoscaler`.

## Step 4: Push the image

Push the built image to your container registry before applying the manifests:

```bash
docker push myorg/my-integration:v1.0.0
```

## Step 5: Deploy

```bash
oc apply -f target/openshift/my-integration/
```

Expected output:

```
service/my-integration-svc created
configmap/config-config-map created
deployment.apps/my-integration-deployment created
horizontalpodautoscaler.autoscaling/my-integration-hpa created
```

Automations generate `Job` or `CronJob` resources instead of a `Deployment`, and do not produce a `Service` or `HorizontalPodAutoscaler`.

## Step 6: Verify

```bash
oc get pods
oc get services
oc logs -f deployment/my-integration-deployment
```

## Step 7: Expose and test

This step applies to service-type workloads that expose an HTTP endpoint. If your integration is an Automation or Event Listener, skip this step.

Expose the deployment via NodePort to access it in a development cluster:

```bash
oc expose deployment my-integration-deployment \
  --type=NodePort \
  --name=my-integration-svc-local
```

Get the assigned port:

```bash
oc get svc my-integration-svc-local
```

Then call the service:

```bash
curl http://<cluster-ip>:<node-port>/helloWorld/sayHello
```

Code to Cloud does not expose every OpenShift configuration option. For changes beyond what `Cloud.toml` supports, use [Kustomize](https://kustomize.io/) to patch the generated YAML without modifying it directly. This keeps generated files untouched and makes upgrades easier when you rebuild.

## What's next

- [Docker](./docker.md) — Build a Docker image from your project using Code to Cloud
- [Kubernetes](./kubernetes.md) — Generate Kubernetes manifests and deploy to a cluster using Code to Cloud
