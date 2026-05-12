---
title: Docker
---

# Docker

WSO2 Integrator uses the Ballerina Code to Cloud feature to generate a Docker image directly from your source code. You do not need to write a Dockerfile by hand. The compiler derives the image from your code and the optional `Cloud.toml` configuration file.

:::info Prerequisites
- [Docker](https://www.docker.com/) installed and running on your build machine
- A WSO2 Integrator project based on Ballerina

macOS users on Apple Silicon must set the following environment variable before building, because the Ballerina base Docker image does not yet support ARM:

```bash
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

This setting applies only to the current terminal session.

## How Code to Cloud works

When you build a Ballerina project with a cloud target, the compiler extension generates deployment artifacts alongside the executable JAR. The artifacts land in the `target/` directory:

```
├── Cloud.toml
├── Ballerina.toml
├── Config.toml
└── target/
    ├── bin/
    │   └── <module>.jar
    └── docker/
        └── Dockerfile
```

**`Cloud.toml`** overrides defaults that the compiler infers from your code. Every field is optional. The compiler provides sensible defaults when the file is absent or when a field is omitted.

**`Config.toml`** is intentionally excluded from the container image because it can contain sensitive values. You must supply it at runtime via a volume mount.

## Step 1: Set the cloud target

Open `Ballerina.toml` and add the cloud build option:

```toml
[build-options]
cloud = "docker"
```

Alternatively, pass the flag inline at build time without modifying `Ballerina.toml`:

```bash
bal build --cloud=docker
```

## Step 2: Configure the image

Create a `Cloud.toml` file in the project root. The `[container.image]` section controls the generated image name and tag:

```toml
[container.image]
repository = "myorg"
name = "my-integration"
tag = "v1.0.0"

[settings]
buildImage = true
```

Set `buildImage = false` if you only need the generated Dockerfile without building the image locally.

`Cloud.toml` is optional. If you skip it, the compiler falls back to the package metadata in `Ballerina.toml` (the `org`, `name`, and `version` fields) to name the image and set the tag.

## Step 3: Create a Config.toml

Create a `Config.toml` with values for any `configurable` variables in your code:

```toml
# Config.toml - provided at runtime, not packed into the image
greeting = "Hello"
```

## Step 4: Build

```bash
bal build
```

The output confirms the image was built and shows the `docker run` command:

```
Compiling source
        myorg/my-integration:1.0.0

Generating executable

Generating artifacts...

        @kubernetes:Docker                       - complete 2/2

        Execute the below command to run the generated Docker image:
        docker run -d -p 9090:9090 myorg/my-integration:v1.0.0

        target/bin/my-integration.jar
```

## Step 5: Run the container

Mount your `Config.toml` into the container at runtime to supply the configurable values:

```bash
docker run -d \
  -v /absolute/path/to/Config.toml:/home/ballerina/Config.toml \
  -p 9090:9090 \
  myorg/my-integration:v1.0.0
```

Verify the integration is running:

```bash
curl http://localhost:9090/helloWorld/sayHello
```

## What's next

- [Kubernetes](./kubernetes.md) — Generate Kubernetes manifests and deploy to a cluster using Code to Cloud
- [Red Hat OpenShift](./openshift.md) — Generate OpenShift manifests and deploy using the `oc` CLI
