---
title: Deploy to AWS / Azure / GCP
---

# Deploy to AWS / Azure / GCP

Deploy your WSO2 Integrator projects to major cloud providers using container services, Kubernetes, or serverless platforms.

## General approach

Regardless of the cloud provider, the deployment process follows a common pattern:

1. **Build** the Ballerina project with `bal build` to produce an executable JAR and Docker artifacts
2. **Build a Docker image** from the generated Dockerfile
3. **Push the image** to a container registry
4. **Deploy** to the target compute service

Ensure your project has a `Cloud.toml` for Docker artifact generation:

```toml
# Cloud.toml
[container.image]
repository = "my-registry"
name = "wso2-integrator-app"
tag = "latest"
```

## AWS

### ECS deployment

Amazon Elastic Container Service (ECS) runs your integration as a containerized task. Use Fargate for serverless container execution.

Push the image to Amazon ECR:

```bash
# Authenticate to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag wso2-integrator-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/wso2-integrator-app:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/wso2-integrator-app:latest
```

Create an ECS task definition:

```json
{
  "family": "wso2-integrator-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "app",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/wso2-integrator-app:latest",
      "portMappings": [
        {
          "containerPort": 9090,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "BAL_CONFIG_FILES",
          "value": "/config/Config.toml"
        }
      ],
      "secrets": [
        {
          "name": "BAL_CONFIG_VAR_MY_MODULE_DB_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:db-password"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/wso2-integrator-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

Deploy the service:

```bash
aws ecs create-service \
  --cluster integrations \
  --service-name wso2-integrator-app \
  --task-definition wso2-integrator-app:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-abc123],securityGroups=[sg-abc123],assignPublicIp=ENABLED}"
```

### EKS deployment

Amazon Elastic Kubernetes Service (EKS) provides a managed Kubernetes environment. After pushing your image to ECR, apply standard Kubernetes manifests:

```bash
# Configure kubectl for EKS
aws eks update-kubeconfig --name my-cluster --region us-east-1

# Deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### Lambda considerations

AWS Lambda can run Ballerina integrations for event-driven workloads with low traffic. Package the JAR as a Lambda function using a custom Java 17 runtime. Note that Lambda has a cold start penalty and a 15-minute execution timeout, making it best suited for short-lived, event-triggered integrations rather than long-running HTTP services.

## Azure

### AKS deployment

Azure Kubernetes Service (AKS) provides managed Kubernetes. Push your image to Azure Container Registry (ACR) and deploy:

```bash
# Authenticate to ACR
az acr login --name myregistry

# Tag and push
docker tag wso2-integrator-app:latest myregistry.azurecr.io/wso2-integrator-app:latest
docker push myregistry.azurecr.io/wso2-integrator-app:latest

# Configure kubectl for AKS
az aks get-credentials --resource-group my-rg --name my-cluster

# Deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### Container apps

Azure Container Apps provides a serverless container platform with built-in scaling and ingress:

```bash
# Create a Container App
az containerapp create \
  --name wso2-integrator-app \
  --resource-group my-rg \
  --environment my-env \
  --image myregistry.azurecr.io/wso2-integrator-app:latest \
  --target-port 9090 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 5 \
  --cpu 0.5 \
  --memory 1.0Gi \
  --env-vars "BAL_CONFIG_FILES=/config/Config.toml"

# Set secrets
az containerapp secret set \
  --name wso2-integrator-app \
  --resource-group my-rg \
  --secrets db-password=s3cret

# Reference secrets as environment variables
az containerapp update \
  --name wso2-integrator-app \
  --resource-group my-rg \
  --set-env-vars "BAL_CONFIG_VAR_MY_MODULE_DB_PASSWORD=secretref:db-password"
```

## GCP

### GKE deployment

Google Kubernetes Engine (GKE) provides managed Kubernetes. Push to Google Artifact Registry and deploy:

```bash
# Authenticate to Artifact Registry
gcloud auth configure-docker us-central1-docker.pkg.dev

# Tag and push
docker tag wso2-integrator-app:latest us-central1-docker.pkg.dev/my-project/my-repo/wso2-integrator-app:latest
docker push us-central1-docker.pkg.dev/my-project/my-repo/wso2-integrator-app:latest

# Configure kubectl for GKE
gcloud container clusters get-credentials my-cluster --zone us-central1-a

# Deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### Cloud run

Google Cloud Run provides a fully managed serverless container platform:

```bash
# Deploy to Cloud Run
gcloud run deploy wso2-integrator-app \
  --image us-central1-docker.pkg.dev/my-project/my-repo/wso2-integrator-app:latest \
  --platform managed \
  --region us-central1 \
  --port 9090 \
  --min-instances 1 \
  --max-instances 10 \
  --memory 512Mi \
  --cpu 1 \
  --set-env-vars "BAL_CONFIG_FILES=/config/Config.toml" \
  --set-secrets "BAL_CONFIG_VAR_MY_MODULE_DB_PASSWORD=db-password:latest"
```

Cloud Run scales to zero when there is no traffic and scales up automatically based on request concurrency.

## Cloud-Specific configuration

Customize `Cloud.toml` for each provider:

```toml
# Cloud.toml for AWS EKS
[container.image]
repository = "123456789012.dkr.ecr.us-east-1.amazonaws.com"
name = "wso2-integrator-app"
tag = "v1.0.0"

[cloud.deployment]
min_memory = "256Mi"
max_memory = "512Mi"
min_cpu = "250m"
max_cpu = "500m"

[[cloud.config.envs]]
key_ref = "BAL_CONFIG_FILES"
config_name = "integrator-config"

[[cloud.config.secrets]]
key_ref = "DB_PASSWORD"
secret_name = "integrator-secrets"
```

## Networking and service discovery

### Service mesh (Istio)

In Kubernetes environments, use Istio for traffic management, mutual TLS, and observability:

```yaml
# istio-virtual-service.yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: wso2-integrator-app
spec:
  hosts:
    - wso2-integrator-service
  http:
    - route:
        - destination:
            host: wso2-integrator-service
            port:
              number: 80
      timeout: 30s
      retries:
        attempts: 3
        perTryTimeout: 10s
```

### DNS-Based service discovery

For non-Kubernetes environments (ECS, VM-based), use cloud-native service discovery:

- **AWS**: Use AWS Cloud Map or Route 53 service discovery
- **Azure**: Use Azure DNS or Traffic Manager
- **GCP**: Use Cloud DNS or Traffic Director

## What's next

- [Run Locally](../../deploy/self-hosted/run-locally.md) -- Develop and test before deploying
- [Deploy to Devant](devant-ipaas.md) -- Deploy to the WSO2 managed cloud
- [Scaling & High Availability](scaling-high-availability.md) -- Configure scaling and resilience
