---
title: Containerized Deployment
---

# Containerized Deployment

WSO2 Integrator leverages the Ballerina Code to Cloud feature to generate containerized deployment artifacts directly from your source code. You can target Docker, Kubernetes, or Red Hat OpenShift without writing deployment descriptors by hand. The compiler derives images and manifests from your code and the optional `Cloud.toml` configuration file.

## Supported platforms

The Code to Cloud feature supports the following containerized deployment platforms:

- **[Docker](#docker-deployment)** — Build and run containerized applications locally or on any Docker-compatible runtime
- **[Kubernetes](#kubernetes-deployment)** — Deploy to any Kubernetes cluster with auto-generated manifests, services, and autoscaling configurations
- **[Red Hat OpenShift](#red-hat-openshift-deployment)** — Deploy to OpenShift using the `oc` CLI with platform-specific manifests
- **[Amazon EKS](#amazon-eks-deployment)** — Deploy to AWS Elastic Kubernetes Service using ECR for image hosting and an internal NLB for service access

:::info Prerequisites
- [Docker](https://www.docker.com/) installed and running on your build machine
- A WSO2 Integrator project based on Ballerina
- For Kubernetes: [kubectl](https://kubernetes.io/docs/tasks/tools/) installed and configured against a Kubernetes cluster
- For OpenShift: [OpenShift CLI (`oc`)](https://docs.openshift.com/container-platform/latest/cli_reference/openshift_cli/getting-started-cli.html) installed and logged in to your cluster

:::note Package naming constraint
The `name` field in `Ballerina.toml` must contain only alphanumerics, underscores, and periods — hyphens are not allowed. Use `my_integration` rather than `my-integration`. Image names in `Cloud.toml` under `[container.image]` can include hyphens.

## How Code to Cloud works

When you build a Ballerina project with a cloud target, the compiler extension generates deployment artifacts alongside the executable JAR. The artifacts land in the `target/` directory:

```
├── Cloud.toml
├── Ballerina.toml
├── Config.toml
└── target/
    ├── bin/
    │   └── <module>.jar
    ├── docker/
    │   └── Dockerfile
    ├── kubernetes/              # when cloud = "k8s"
    │   └── <module>-0.0.1.yaml
    └── openshift/               # when cloud = "openshift"
        └── <module>-0.0.1.yaml
```

**`Cloud.toml`** overrides defaults that the compiler infers from your code. Every field is optional. The compiler provides sensible defaults when the file is absent or when a field is omitted. See the [Cloud.toml reference](../../reference/project/cloudtoml-reference.md) for the full field list.

**`Config.toml`** is intentionally excluded from the container image because it can contain sensitive values. For Docker, you supply it at runtime via a volume mount. For Kubernetes and OpenShift, use the `[[cloud.config.files]]` entry in `Cloud.toml` to mount it as a ConfigMap.

## Docker deployment

The Docker deployment path generates a Dockerfile and optionally builds the Docker image locally. This is the simplest containerized deployment option and serves as the foundation for Kubernetes and OpenShift deployments.

### Step 1: Set the cloud target

Open `Ballerina.toml` and add the cloud build option:

```toml
[build-options]
cloud = "docker"
```

Alternatively, pass the flag inline at build time without modifying `Ballerina.toml`:

```bash
bal build --cloud=docker
```

### Step 2: Configure the image

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

### Step 3: Create a Config.toml

Create a `Config.toml` with values for any `configurable` variables in your code:

```toml
# Config.toml - provided at runtime, not packed into the image
greeting = "Hello"
```

### Step 4: Build

```bash
bal build
```

The output confirms the image was built and shows the `docker run` command:

```
Compiling source
        myorg/my_integration:1.0.0

Generating executable

Generating artifacts

Building the docker image

        ... (Docker BuildKit output) ...

        Execute the below command to run the generated Docker image:
        docker run -d -p 9090:9090 myorg/my-integration:v1.0.0

        target/bin/my_integration.jar
```

### Step 5: Run the container

Mount your `Config.toml` into the container at runtime to supply the configurable values:

```bash
docker run -d \
  -v /absolute/path/to/Config.toml:/home/ballerina/Config.toml \
  -p 9090:9090 \
  myorg/my-integration:v1.0.0
```

If you encounter a "Is a directory" error when mounting Config.toml, mount the parent directory instead:

```bash
docker run -d \
  -v /absolute/path/to/project:/home/ballerina/config \
  -p 9090:9090 \
  --env BAL_CONFIG_FILES=/home/ballerina/config/Config.toml \
  myorg/my-integration:v1.0.0
```

Verify the integration is running by calling your service endpoint:

```bash
curl http://localhost:9090/<your-service-path>
```

## Kubernetes deployment

The Kubernetes deployment path generates a complete set of Kubernetes manifests (Deployment, Service, ConfigMap, HorizontalPodAutoscaler) alongside the Docker image. This enables you to deploy your integration to any Kubernetes cluster with a single `kubectl apply` command.

### Step 1: Set the cloud target

Open `Ballerina.toml` and add the cloud build option:

```toml
[build-options]
cloud = "k8s"
```

Alternatively, pass the flag inline at build time:

```bash
bal build --cloud=k8s
```

### Step 2: Configure the deployment

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

The `[[cloud.config.files]]` entry mounts your `Config.toml` as a Kubernetes ConfigMap, which is the recommended way to supply configuration to Kubernetes workloads.

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

### Step 3: Build

```bash
bal build
```

The compiler generates all Kubernetes manifests and prints the `kubectl apply` command:

```
Compiling source
        myorg/my_integration:1.0.0

Generating executable

Generating artifacts

        @kubernetes:Service
        @kubernetes:ConfigMap
        @kubernetes:Deployment
        @kubernetes:HPA

Building the docker image

        ... (Docker BuildKit output) ...

        Execute the below command to deploy the Kubernetes artifacts:
        kubectl apply -f /path/to/project/target/kubernetes/my_integration

        Execute the below command to access service via NodePort:
        kubectl expose deployment my-integration-deployment --type=NodePort --name=my-integration-svc-local

        target/bin/my_integration.jar
```

For a service-type workload, the generated manifest includes a `Deployment`, `Service`, `ConfigMap`, and `HorizontalPodAutoscaler`. The `HorizontalPodAutoscaler` is only generated when `[cloud.deployment.autoscaling]` is configured.

For Automations, the compiler generates a `Job` or `CronJob` resource instead of a `Deployment`, with no `Service` or `HorizontalPodAutoscaler`.

### Step 4: Push the image

Push the built image to your container registry before applying the manifests:

```bash
docker push myorg/my-integration:v1.0.0
```

If you are using Minikube, run `eval $(minikube docker-env)` before `bal build` to build the image directly into the Minikube Docker daemon. You can then skip the push step.

### Step 5: Deploy

```bash
kubectl apply -f target/kubernetes/my_integration/
```

Expected output for a service-type workload:

```
service/my-integration created
configmap/config-config-map created
deployment.apps/my-integration-deployment created
horizontalpodautoscaler.autoscaling/my-integration created
```

Automations generate `Job` or `CronJob` resources instead of a `Deployment`, and do not produce a `Service` or `HorizontalPodAutoscaler`.

### Step 6: Verify

```bash
kubectl get pods
kubectl get services
kubectl logs -f deployment/my-integration-deployment
```

### Step 7: Expose and test

This step applies to service-type workloads that expose an HTTP endpoint. If your integration is an Automation or Event Listener, skip this step.

Expose the deployment via NodePort to access it in a development cluster:

```bash
kubectl expose deployment my-integration-deployment \
  --type=NodePort \
  --name=my-integration-svc-local
```

Get the assigned port:

```bash
kubectl get svc my-integration-svc-local
```

If you are using Minikube, get the cluster IP:

```bash
minikube ip
```

Then call the service:

```bash
curl http://<cluster-ip>:<node-port>/<your-service-path>
```

Code to Cloud does not expose every Kubernetes configuration option. For changes beyond what `Cloud.toml` supports, use [Kustomize](https://kustomize.io/) to patch the generated YAML without modifying it directly. This keeps generated files untouched and makes upgrades easier when you rebuild.

## Red Hat OpenShift deployment

The OpenShift deployment path generates manifests that are structurally identical to the Kubernetes output but land in `target/openshift/` and are applied using the `oc` CLI. This makes deploying to Red Hat OpenShift as straightforward as deploying to any Kubernetes cluster.

### Step 1: Set the cloud target

Open `Ballerina.toml` and add the cloud build option:

```toml
[build-options]
cloud = "openshift"
```

Alternatively, pass the flag inline at build time:

```bash
bal build --cloud=openshift
```

### Step 2: Configure the deployment

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

### Step 3: Build

```bash
bal build
```

The compiler generates all OpenShift manifests and prints the `oc apply` command:

```
Compiling source
        myorg/my_integration:1.0.0

Generating executable

Generating artifacts

        @kubernetes:Service
        @kubernetes:ConfigMap
        @kubernetes:Deployment
        @kubernetes:HPA

Building the docker image

        ... (Docker BuildKit output) ...

        Execute the below command to deploy the OpenShift artifacts:
        oc apply -f /path/to/project/target/openshift/my_integration

        target/bin/my_integration.jar
```

For a service-type workload, the generated manifest includes a `Deployment`, `Service`, `ConfigMap`, and `HorizontalPodAutoscaler`. The `HorizontalPodAutoscaler` is only generated when `[cloud.deployment.autoscaling]` is configured.

For Automations, the compiler generates a `Job` or `CronJob` resource instead of a `Deployment`, with no `Service` or `HorizontalPodAutoscaler`.

### Step 4: Push the image

Push the built image to your container registry before applying the manifests:

```bash
docker push myorg/my-integration:v1.0.0
```

### Step 5: Deploy

```bash
oc apply -f target/openshift/my_integration/
```

Expected output:

```
service/my-integration created
configmap/config-config-map created
deployment.apps/my-integration-deployment created
horizontalpodautoscaler.autoscaling/my-integration created
```

Automations generate `Job` or `CronJob` resources instead of a `Deployment`, and do not produce a `Service` or `HorizontalPodAutoscaler`.

### Step 6: Verify

```bash
oc get pods
oc get services
oc logs -f deployment/my-integration-deployment
```

### Step 7: Expose and test

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
curl http://<cluster-ip>:<node-port>/<your-service-path>
```

Code to Cloud does not expose every OpenShift configuration option. For changes beyond what `Cloud.toml` supports, use [Kustomize](https://kustomize.io/) to patch the generated YAML without modifying it directly. This keeps generated files untouched and makes upgrades easier when you rebuild.

## Amazon EKS deployment

Amazon Elastic Kubernetes Service (EKS) follows the same Kubernetes deployment path described above, with a few AWS-specific steps: pushing the image to Amazon ECR, configuring VPC endpoints for private clusters, and exposing the service via an AWS Network Load Balancer.

### Prerequisites

In addition to the [general prerequisites](#prerequisites), you need:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and configured (`aws configure` or `aws sso login`)
- An EKS cluster with `kubectl` configured: `aws eks update-kubeconfig --region <region> --name <cluster-name>`
- An [Amazon ECR](https://aws.amazon.com/ecr/) repository created for your image:

```bash
aws ecr create-repository --region <region> --repository-name my-integration
```

### Step 1: Set the cloud target

Open `Ballerina.toml` and set the cloud target:

```toml
[build-options]
cloud = "k8s"
```

### Step 2: Configure the deployment

Create a `Cloud.toml` with your ECR repository as the image repository so the generated Kubernetes manifests reference the correct image URI:

```toml
[container.image]
repository = "<account-id>.dkr.ecr.<region>.amazonaws.com"
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

### Step 3: Build

```bash
bal build
```

This generates the Kubernetes manifests under `target/kubernetes/my_integration/` and the Docker build context under `target/docker/my_integration/`.

### Step 4: Build and push the image

For **x86_64 node groups**: if you are building on Apple Silicon or another ARM machine, use `docker buildx` to produce a `linux/amd64` image and push it directly to ECR:

```bash
aws ecr get-login-password --region <region> | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com

docker buildx build \
  --platform linux/amd64 \
  --tag <account-id>.dkr.ecr.<region>.amazonaws.com/my-integration:v1.0.0 \
  --push \
  target/docker/my_integration/
```

If your build machine is already `x86_64`, you can skip `docker buildx` and use `docker push` on the image built by `bal build` instead. For **Arm64 node groups**, omit the `--platform` flag or set it to `linux/arm64`.

### Step 5: Configure VPC endpoints for private clusters

EKS nodes in private subnets cannot reach ECR's public endpoints without a NAT gateway. Create three VPC endpoints to allow image pulls over private networking:

```bash
# ECR API endpoint (authentication and manifest requests)
aws ec2 create-vpc-endpoint --region <region> \
  --vpc-id <vpc-id> \
  --service-name com.amazonaws.<region>.ecr.api \
  --vpc-endpoint-type Interface \
  --subnet-ids <subnet-id-1> <subnet-id-2> \
  --security-group-ids <security-group-id> \
  --private-dns-enabled

# ECR DKR endpoint (image layer pulls)
aws ec2 create-vpc-endpoint --region <region> \
  --vpc-id <vpc-id> \
  --service-name com.amazonaws.<region>.ecr.dkr \
  --vpc-endpoint-type Interface \
  --subnet-ids <subnet-id-1> <subnet-id-2> \
  --security-group-ids <security-group-id> \
  --private-dns-enabled

# S3 gateway endpoint (ECR stores image layers in S3)
aws ec2 create-vpc-endpoint --region <region> \
  --vpc-id <vpc-id> \
  --service-name com.amazonaws.<region>.s3 \
  --vpc-endpoint-type Gateway \
  --route-table-ids <route-table-id>
```

Skip this step if your nodes have internet access via a NAT gateway or if you are using a public EKS cluster.

### Step 6: Deploy

```bash
kubectl apply -f target/kubernetes/my_integration/
```

Expected output:

```bash
service/my-integration created
configmap/config-config-map created
deployment.apps/my-integration-deployment created
horizontalpodautoscaler.autoscaling/my-integration created
```

Verify the pods come up:

```bash
kubectl get pods
kubectl get services
kubectl logs -f deployment/my-integration-deployment
```

### Step 7: Expose and test

Tag the cluster subnets so the EKS load balancer controller can discover them:

```bash
aws ec2 create-tags --region <region> \
  --resources <subnet-id-1> <subnet-id-2> \
  --tags Key=kubernetes.io/role/internal-elb,Value=1 \
         Key=kubernetes.io/cluster/<cluster-name>,Value=shared
```

If a service named `my-integration-lb` already exists, delete it first:

```bash
kubectl delete svc my-integration-lb 2>/dev/null || true
```

Create an internal NLB with all annotations set at creation time:

```bash
kubectl apply -f - <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: my-integration-lb
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-scheme: "internal"
    service.beta.kubernetes.io/aws-load-balancer-type: "external"
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "ip"
spec:
  selector:
    app: my_integration
  type: LoadBalancer
  ports:
    - port: 9090
      targetPort: 9090
      protocol: TCP
EOF
```

Wait for the NLB hostname to be assigned:

```bash
kubectl get svc my-integration-lb
```

```bash
NAME                TYPE           CLUSTER-IP      EXTERNAL-IP                                      PORT(S)          AGE
my-integration-lb   LoadBalancer   10.100.160.80   <nlb-hostname>.elb.<region>.amazonaws.com        9090:31659/TCP   30s
```

Call the service from within the VPC:

```bash
curl http://<nlb-hostname>.elb.<region>.amazonaws.com:9090/<your-service-path>
```

An internal NLB is only reachable from within the same VPC. For internet-facing access, replace `internal-elb` with `elb` in the subnet tag and set `aws-load-balancer-scheme` to `internet-facing` in the Service manifest. Ensure the subnets have a route to an internet gateway.
