---
title: WSO2 Integrator on AWS
description: Everything WSO2 Integrator offers on Amazon Web Services, with links to the guides for AWS connectors, event triggers, IAM role-based authentication, deployment on Amazon ECS, Amazon EKS, Amazon EC2, and AWS Lambda, secrets, private networking, and observability.
keywords: [wso2 integrator, aws, amazon web services, aws connectors, sqs, sns, s3, dynamodb, iam role, amazon ecs, fargate, amazon eks, aws lambda, ec2, secrets manager, cloudwatch, x-ray]
slug: /aws
sidebar_position: 6.5
sidebar_label: AWS
hide_table_of_contents: true
wide_layout: true
---

# WSO2 Integrator on AWS

WSO2 Integrator has native support for AWS. Connect to AWS services with dedicated connectors, authenticate with IAM roles instead of access keys, and deploy to Amazon ECS, Amazon EKS, Amazon EC2, or AWS Lambda. Choose a topic below to get started.

## Build

<PaletteGrid>

<PaletteCard icon="connections" href="#aws-connectors">
  <h3 class="palette-card-title">Connect to AWS Services</h3>
  <ul class="palette-card-list">
    <li>Amazon SQS, SNS, S3, DynamoDB, SES, and more</li>
    <li>Amazon RDS and ElastiCache through general connectors</li>
  </ul>
</PaletteCard>

<PaletteCard icon="event">
  <h3 class="palette-card-title">React to AWS Events</h3>
  <p class="palette-card-desc">Run integrations when messages and events arrive.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/develop-and-test/integration-artifacts/event-driven-integration/aws-sqs">SQS listener</PaletteChip>
    <PaletteChip href="/deploy-and-run/self-hosted/serverless-deployment#aws-lambda">Lambda event handlers</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="api" href="/deploy-and-run/secure/aws-access#call-aws-apis-without-a-connector">
  <h3 class="palette-card-title">Call Any AWS API</h3>
  <ul class="palette-card-list">
    <li>SigV4 request signing</li>
    <li>Region and FIPS endpoint resolution</li>
  </ul>
</PaletteCard>

</PaletteGrid>

## AI

<PaletteGrid>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/agents/memory#creating-an-amazon-dynamodb-short-term-memory-store">
  <h3 class="palette-card-title">Agent Memory in DynamoDB</h3>
  <ul class="palette-card-list">
    <li>Persist AI agent conversation history in Amazon DynamoDB</li>
    <li>Suits serverless, AWS-native deployments</li>
  </ul>
</PaletteCard>

<PaletteCard icon="ai">
  <h3 class="palette-card-title">Copilot with Amazon Bedrock</h3>
  <p class="palette-card-desc">Run WSO2 Integrator Copilot on Claude models in your own Amazon Bedrock account.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/editor/copilot/getting-started#sign-in-from-the-copilot-welcome-screen">Sign in with Bedrock</PaletteChip>
    <PaletteChip href="/editor/copilot/copilot-architecture#amazon-bedrock">How Copilot uses Bedrock</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="migrate">
  <h3 class="palette-card-title">AI-Assisted Migration</h3>
  <p class="palette-card-desc">Use Amazon Bedrock for the AI enhancement step of the migration tools.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/migrate/from-mulesoft#step-5-ai-enhancement">From MuleSoft</PaletteChip>
    <PaletteChip href="/migrate/from-tibco#step-5-ai-enhancement">From TIBCO</PaletteChip>
  </div>
</PaletteCard>

</PaletteGrid>

## Deploy

<PaletteGrid cols={4}>

<PaletteCard icon="cloud" href="/deploy-and-run/self-hosted/containerized-deployment#amazon-ecs-deployment">
  <h3 class="palette-card-title">Amazon ECS on Fargate</h3>
  <ul class="palette-card-list">
    <li>Serverless containers</li>
    <li>Images in Amazon ECR</li>
  </ul>
</PaletteCard>

<PaletteCard icon="deploy-run" href="/deploy-and-run/self-hosted/containerized-deployment#amazon-eks-deployment">
  <h3 class="palette-card-title">Amazon EKS</h3>
  <ul class="palette-card-list">
    <li>Kubernetes manifests from Code to Cloud</li>
    <li>Network Load Balancer access</li>
  </ul>
</PaletteCard>

<PaletteCard icon="server" href="/deploy-and-run/self-hosted/vm-deployment#run-on-amazon-ec2">
  <h3 class="palette-card-title">Amazon EC2</h3>
  <ul class="palette-card-list">
    <li>Executable JAR on a VM</li>
    <li>Instance profile credentials</li>
  </ul>
</PaletteCard>

<PaletteCard icon="automation" href="/deploy-and-run/self-hosted/serverless-deployment#aws-lambda">
  <h3 class="palette-card-title">AWS Lambda</h3>
  <ul class="palette-card-list">
    <li>Event-driven functions</li>
    <li>S3, SQS, DynamoDB, SES, and API Gateway events</li>
  </ul>
</PaletteCard>

</PaletteGrid>

## Secure and run

<PaletteGrid cols={4}>

<PaletteCard icon="security">
  <h3 class="palette-card-title">IAM Credentials</h3>
  <p class="palette-card-desc">Use IAM roles instead of access keys.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/deploy-and-run/secure/aws-access#use-the-default-credential-chain">Default credential chain</PaletteChip>
    <PaletteChip href="/deploy-and-run/secure/aws-access#attach-an-iam-role">Attach an IAM role</PaletteChip>
    <PaletteChip href="/deploy-and-run/secure/aws-access#access-resources-in-another-aws-account">Cross-account access</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="tools" href="/deploy-and-run/secure/secrets-encryption#aws-secrets-manager">
  <h3 class="palette-card-title">Secrets and Configuration</h3>
  <ul class="palette-card-list">
    <li>AWS Secrets Manager and SSM Parameter Store</li>
    <li>Inject at startup or read at runtime</li>
  </ul>
</PaletteCard>

<PaletteCard icon="external" href="/deploy-and-run/secure/aws-access#keep-aws-traffic-inside-your-vpc">
  <h3 class="palette-card-title">Private Networking</h3>
  <ul class="palette-card-list">
    <li>VPC endpoints</li>
    <li>FIPS and dual-stack endpoints</li>
  </ul>
</PaletteCard>

<PaletteCard icon="manage-observe">
  <h3 class="palette-card-title">Observe</h3>
  <p class="palette-card-desc">Use AWS monitoring services.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/observe/logging#send-logs-to-amazon-cloudwatch-logs">CloudWatch Logs</PaletteChip>
    <PaletteChip href="/observe/tracing#choose-a-tracing-backend">AWS X-Ray</PaletteChip>
    <PaletteChip href="/observe/metrics#send-metrics-to-amazon-managed-service-for-prometheus">Managed Prometheus</PaletteChip>
  </div>
</PaletteCard>

</PaletteGrid>

## AWS connectors

Each AWS service has its own connector. Add a connector from the WSO2 Integrator connector palette, or import it in code. On AWS, configure connectors with `auth:DEFAULT_CREDENTIALS` so they use the IAM role of the compute environment. See [Access AWS Services Securely](deploy-and-run/secure/aws-access.md).

<PaletteGrid>

<PaletteCard icon="event">
  <h3 class="palette-card-title">Messaging and Notifications</h3>
  <p class="palette-card-desc">Queue messages, publish to topics, and send email.</p>
  <div class="palette-chip-row">
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/messaging/aws.sqs/overview">Amazon SQS</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/communication/aws.sns/aws-sns-connector-overview">Amazon SNS</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/marketing-social/aws.ses/connector-overview">Amazon SES</a>
  </div>
</PaletteCard>

<PaletteCard icon="file">
  <h3 class="palette-card-title">Storage</h3>
  <p class="palette-card-desc">Manage buckets and objects, including multipart uploads and presigned URLs.</p>
  <div class="palette-chip-row">
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/storage-file/aws.s3/overview">Amazon S3</a>
  </div>
</PaletteCard>

<PaletteCard icon="persist">
  <h3 class="palette-card-title">Databases and Analytics</h3>
  <p class="palette-card-desc">Read and write NoSQL data, follow table changes, and query data warehouses.</p>
  <div class="palette-chip-row">
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/aws.dynamodb/connector-overview">Amazon DynamoDB</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/aws.dynamodbstreams/connector-overview">DynamoDB Streams</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/aws.redshift/aws-redshift-connector-overview">Amazon Redshift</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/aws.redshiftdata/connector-overview">Redshift Data API</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/aws.simpledb/connector-overview">Amazon SimpleDB</a>
  </div>
</PaletteCard>

<PaletteCard icon="security">
  <h3 class="palette-card-title">Security</h3>
  <p class="palette-card-desc">Read secrets at runtime.</p>
  <div class="palette-chip-row">
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/security-identity/aws.secretmanager/aws-secrets-manager-connector-overview">AWS Secrets Manager</a>
  </div>
</PaletteCard>

<PaletteCard icon="billing">
  <h3 class="palette-card-title">AWS Marketplace</h3>
  <p class="palette-card-desc">Meter usage and check entitlements for Marketplace products.</p>
  <div class="palette-chip-row">
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/aws-marketplace-mpm-connector-overview">Metering</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/aws-marketplace-mpe-connector-overview">Entitlement</a>
  </div>
</PaletteCard>

<PaletteCard icon="connections">
  <h3 class="palette-card-title">General-Purpose Connectors</h3>
  <p class="palette-card-desc">Use the engine's database connector for Amazon RDS and Aurora, and the Redis connector for ElastiCache and MemoryDB.</p>
  <div class="palette-chip-row">
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/mysql/connector-overview">MySQL</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/postgresql/connector-overview">PostgreSQL</a>
    <a class="palette-chip" href="/integration-platform/docs/connectors/catalog/database/redis/connector-overview">Redis</a>
  </div>
</PaletteCard>

</PaletteGrid>

For change data capture, [`ballerinax/cdc.schema.aws.s3.driver`](https://central.ballerina.io/ballerinax/cdc.schema.aws.s3.driver/latest) keeps the <a href="/integration-platform/docs/connectors/catalog/database/cdc/connector-overview">CDC connector</a>'s schema history in S3. To browse every connector, see the <a href="/integration-platform/docs/connectors/catalog">connector catalog</a>.
