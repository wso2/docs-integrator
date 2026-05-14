---
title: Deploy to Devant (WSO2 IPaaS)
---

# Deploy to Devant (WSO2 IPaaS)

WSO2 Devant is a fully managed integration platform as a service (iPaaS) that hosts and runs your WSO2 Integrator projects in the cloud without requiring you to manage infrastructure.

## What is Devant

Devant provides a managed runtime for Ballerina-based integrations. It handles provisioning, scaling, monitoring, and lifecycle management so you can focus on building integrations rather than operating infrastructure.

Key capabilities of Devant include:

- **Push-to-deploy workflow** -- Deploy directly from your local project or CI/CD pipeline
- **Environment management** -- Separate development, staging, and production environments
- **Built-in observability** -- Logs, metrics, and traces available through the Devant console
- **Auto-scaling** -- Automatic horizontal scaling based on request load
- **Managed secrets** -- Secure storage for API keys, credentials, and certificates

## Prerequisites

Before deploying to Devant, ensure you have:

- A WSO2 Devant account (sign up at [devant.wso2.com](https://devant.wso2.com))
- The Devant CLI installed
- A WSO2 Integrator project ready for deployment

Install the Devant CLI:

```bash
# macOS / Linux
curl -fsSL https://cli.devant.wso2.com/install.sh | bash

# Verify installation
devant version
```

## Connecting your project to Devant

Log in to Devant and link your project:

```bash
# Authenticate with your Devant account
devant login

# Initialize Devant configuration in your project
devant init
```

The `devant init` command creates a `Devant.toml` configuration file in your project root:

```toml
# Devant.toml
[project]
orgHandle = "my-org"
projectName = "order-service"

[build]
balVersion = "2201.10.0"

[environment]
default = "development"
```

Link the project to an existing Devant component, or create a new one:

```bash
# Create a new component in Devant
devant component create order-service --type service

# Or link to an existing component
devant component link order-service
```

## Push-to-Deploy workflow

Deploy your integration with a single command:

```bash
# Build and deploy to the default environment
devant push

# Deploy to a specific environment
devant push --env staging

# Deploy a specific version tag
devant push --tag v1.2.0
```

The `devant push` command performs the following steps:

1. Builds the Ballerina project locally
2. Packages the build artifacts
3. Uploads the package to Devant
4. Triggers a deployment in the target environment
5. Waits for the deployment to become healthy

Monitor the deployment status:

```bash
# Check deployment status
devant status

# View deployment logs in real time
devant logs --follow

# List all deployments
devant deployments list
```

## Managing deployments

The Devant console and CLI provide tools for managing running deployments.

### Scaling

```bash
# Set the number of replicas
devant scale --replicas 3

# Enable auto-scaling
devant scale --min 1 --max 5
```

### Rolling back

```bash
# List deployment history
devant deployments list

# Roll back to a previous deployment
devant rollback --deployment dep-abc123
```

### Stopping and restarting

```bash
# Stop the running deployment
devant stop

# Restart with the current configuration
devant start
```

### Viewing logs and metrics

The Devant console provides a web-based dashboard for viewing logs, metrics, and traces. You can also access these from the CLI:

```bash
# View recent logs
devant logs --lines 100

# View metrics summary
devant metrics

# Open the Devant console in your browser
devant console
```

## Devant-Specific configuration

### Cloud.toml for Devant

The `Cloud.toml` file in your project controls container and deployment settings when deploying to Devant:

```toml
# Cloud.toml
[container.image]
repository = "devant.wso2.com/my-org"
name = "order-service"
tag = "latest"

[cloud.deployment]
min_memory = "256Mi"
max_memory = "512Mi"
min_cpu = "200m"
max_cpu = "500m"

[cloud.deployment.autoscaling]
min_replicas = 1
max_replicas = 5
cpu_threshold = 60

[[cloud.config.envs]]
key_ref = "DB_HOST"
config_name = "app-config"

[[cloud.config.secrets]]
key_ref = "DB_PASSWORD"
secret_name = "app-secrets"
```

### Environment-Specific overrides

Store environment-specific `Config.toml` files and upload them to Devant:

```bash
# Upload a Config.toml for the staging environment
devant config set --env staging --file config/staging-Config.toml

# Set individual configuration values
devant config set --env staging --key myModule.apiUrl --value "https://staging-api.example.com"

# Set a secret value
devant secret set --env production --key dbPassword --value "s3cret"
```

## Git-Based deployment

Connect your GitHub or GitLab repository to Devant for automatic deployments on push:

1. Navigate to your component in the Devant console
2. Go to **Settings > Build & Deploy**
3. Connect your Git repository and select the branch
4. Configure automatic deployments for the selected branch

Devant triggers a build and deployment whenever a push is detected on the configured branch.

## What's next

- [Run Locally](run-locally.md) -- Develop and test before deploying
- [Environments](environments.md) -- Manage Dev, Test, and Prod configurations
- [Deploy to AWS / Azure / GCP](aws-azure-gcp.md) -- Self-managed cloud deployments
