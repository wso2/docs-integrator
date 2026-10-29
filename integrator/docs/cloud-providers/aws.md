---
title: WSO2 Integrator on AWS
---

# WSO2 Integrator on AWS

WSO2 Integrator provides support for building, deploying, securing, and observing integrations on Amazon Web Services ([AWS](https://aws.amazon.com/)). You can connect to AWS services, use Amazon Bedrock for AI capabilities, deploy integrations on AWS compute services, securely access AWS resources using IAM roles, and monitor integrations using AWS observability services.
This page provides an overview of the capabilities and resources available for using WSO2 Integrator with AWS.

<ThemedImage
    alt="Architecture diagram: an event in AWS (SQS or Lambda) triggers WSO2 Integrator, which runs on ECS, EKS, EC2 or Lambda, optionally calls Amazon Bedrock for AI, and talks to AWS services like S3, DynamoDB, SNS, SES and Redshift -- secured by IAM roles and watched with CloudWatch, X-Ray and Prometheus."
    sources={{
        light: useBaseUrl('/img/aws/architecture-light-v5.1.png'),
        dark: useBaseUrl('/img/aws/architecture-dark-v5.1.png'),
    }}
/>

## [New to AWS?](https://docs.aws.amazon.com/)

Here are four AWS concepts you'll see throughout this guide

<PaletteGrid cols={2}>
  <PaletteCard icon="deploy-run" href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html">
    <h3 class="palette-card-title">ECS</h3>
    <p class="palette-card-desc">A fully managed container orchestration service for running your integration, used by the recommended deployment below.</p>

  <PaletteCard icon="security" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html">
    <h3 class="palette-card-title">IAM role</h3>
    <p class="palette-card-desc">An identity AWS gives your integration, so it can use AWS without access keys in your code.</p>

  <PaletteCard icon="connections" href="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html">
    <h3 class="palette-card-title">VPC</h3>
    <p class="palette-card-desc">An isolated virtual network within AWS where you run and connect your resources.</p>

  <PaletteCard icon="ai" href="https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-service.html">
    <h3 class="palette-card-title">Amazon Bedrock</h3>
    <p class="palette-card-desc">The AWS service for using AI models from several providers through one API.</p>


<div
  className="palette-group"
  style={{
    background: 'var(--wso2-accent-light)',
    borderStyle: 'solid',
    borderColor: 'var(--wso2-accent)',
  }}>

<p className="palette-group-label" style={{color: 'var(--wso2-accent-text)'}}>Start here</p>

## Four steps to unlock AWS Services with WSO2 Integrator

You need an [AWS account](https://portal.aws.amazon.com/billing/signup) and
[WSO2 Integrator installed](https://wso2.com/products/downloads/?product=wso2integrator).

<div className="step-cols">
  <div className="step-col">
    <div className="step-head">
      <span className="step-num">1</span>
      <span className="step-line" />

    <h3 className="step-title">Build</h3>
    <p className="step-desc">Connect to AWS services and add AI with Amazon Bedrock.</p>
  </div>

    <div className="step-head">
      <span className="step-num">2</span>
      <span className="step-line" />

    <h3 className="step-title"><a href="#deploy">Deploy</a></h3>
    <p className="step-desc">Run it on Amazon ECS with Fargate, with no servers to manage.</p>
  </div>

    <div className="step-head">
      <span className="step-num">3</span>
      <span className="step-line" />

    <h3 className="step-title"><a href="#secure">Secure</a></h3>
    <p className="step-desc">Use IAM roles, not keys, and keep secrets out of code.</p>
  </div>

    <div className="step-head">
      <span className="step-num">4</span>
      <span className="step-line" />

    <h3 className="step-title"><a href="#observe">Observe</a></h3>
    <p className="step-desc">Send logs, traces and metrics to the AWS tools you already use.</p>
  </div>
</div>

</div>

<span className="part-icon-badge">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4.5 19 9l-9.5 9.5H5V14z" /></svg>
</span>

## Build for AWS {#build}

Decide how your integration interacts with AWS, add AI with Amazon Bedrock, and
use Bedrock for AI assisted development.

<div className="sub-head">

### Connect with AWS

Most teams start with a connector.

<PaletteGrid cols={3}>
  <PaletteCard icon="connections">
    <h3 class="palette-card-title">Connect to AWS services</h3>
    <p class="palette-card-desc">Add a connector from the palette and sign in with the IAM role of wherever it runs.</p>

      <PaletteChip href="product://connectors/catalog">Browse AWS connectors


  <PaletteCard icon="event">
    <h3 class="palette-card-title">React to AWS events</h3>
    <p class="palette-card-desc">Start an integration when a message lands in an SQS queue, or when an event invokes an AWS Lambda function.</p>

      <PaletteChip href="/develop-and-test/integration-artifacts/event-driven-integration/aws-sqs">SQS listener
      <PaletteChip href="/deploy-and-run/self-hosted/serverless-deployment#aws-lambda">Lambda event handlers


  <PaletteCard icon="api">
    <h3 class="palette-card-title">Call any AWS API</h3>
    <p class="palette-card-desc">No connector for a service? Call its API directly - request signing (SigV4), Region and FIPS endpoints are handled for you.</p>

      <PaletteChip href="/deploy-and-run/secure/aws-access#call-aws-apis-without-a-connector">Call AWS APIs



###  Build AI applications with Amazon Bedrock {#ai}

Use AI models hosted on AWS, so your data stays in your AWS account.

<PaletteGrid cols={2}>
  <PaletteCard icon="model-providers">
    <h3 class="palette-card-title">Use Bedrock models</h3>
    <p class="palette-card-desc">Call chat models and create embeddings through Amazon Bedrock, configured as a model or embedding provider.</p>

      <PaletteChip href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers#aws-bedrock">Model providers
      <PaletteChip href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/embedding-providers#aws-bedrock">Embedding providers
      <PaletteChip href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers#aws-credential-options">Authentication


  <PaletteCard icon="rag">
    <h3 class="palette-card-title">Answer from your own data (RAG)</h3>
    <p class="palette-card-desc">Let AI answer from your documents using retrieval-augmented generation, with your source documents in S3.</p>

      <PaletteChip href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/knowledge-bases#aws-bedrock">Bedrock knowledge bases
      <PaletteChip href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/vector-stores#amazon-s3-vectors">S3 Vectors
      <PaletteChip href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/data-loaders#aws-s3-text-data-loader">S3 data loader


  <PaletteCard icon="agents">
    <h3 class="palette-card-title">Run agents on Bedrock AgentCore</h3>
    <p class="palette-card-desc">Deploy AI agents to AgentCore and give them tools through AgentCore Gateway.</p>

      <PaletteChip href="/deploy-and-run/self-hosted/containerized-deployment#amazon-bedrock-agentcore-runtime-deployment">Deploy
      <PaletteChip href="/deploy-and-run/secure/authentication#agents-on-amazon-bedrock-agentcore-runtime">Authentication
      <PaletteChip href="/observe/tracing#on-amazon-bedrock-agentcore-runtime">Tracing


  <PaletteCard icon="ai-building-blocks">
    <h3 class="palette-card-title">Give agents a memory</h3>
    <p class="palette-card-desc">Store conversation memory in DynamoDB so agents remember earlier messages.</p>

      <PaletteChip href="/develop-and-test/integration-artifacts/ai-integrations/agents/memory#creating-an-amazon-dynamodb-short-term-memory-store">DynamoDB



### Use Amazon Bedrock for AI-assisted development

Bedrock also powers AI features built into WSO2 Integrator itself.

<PaletteGrid cols={2}>
  <PaletteCard icon="ai" highlight>
    <h3 class="palette-card-title">Copilot with Amazon Bedrock</h3>
    <p class="palette-card-desc">Sign in to WSO2 Integrator Copilot with your own Amazon Bedrock credentials.</p>

      <PaletteChip href="/editor/copilot#sign-in-from-the-copilot-welcome-screen">Sign in with Bedrock
      <PaletteChip href="/editor/copilot/copilot-architecture#amazon-bedrock">How Copilot uses Bedrock


  <PaletteCard icon="migrate">
    <h3 class="palette-card-title">AI-assisted migration</h3>
    <p class="palette-card-desc">Use Bedrock models to help migrate existing integrations onto WSO2 Integrator.</p>

      <PaletteChip href="/migrate/from-mulesoft#step-5-ai-enhancement">From MuleSoft
      <PaletteChip href="/migrate/from-tibco#step-5-ai-enhancement">From TIBCO



</div>

<span className="part-icon-badge">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" /></svg>
</span>

## Deploy to AWS {#deploy}

Choose where your integration runs. Not sure? Start with ECS on Fargate.

<PaletteGrid cols={2}>

    <PaletteCard icon="cloud" highlight href="/deploy-and-run/self-hosted/containerized-deployment#amazon-ecs-deployment">
      <h3 class="palette-card-title">Amazon ECS on Fargate <span class="badge badge--success">Recommended</span></h3>
      <p class="palette-card-desc">Run containers without managing any servers - the easiest place to start.</p>


  <PaletteCard icon="deploy-run" href="/deploy-and-run/self-hosted/containerized-deployment#amazon-eks-deployment">
    <h3 class="palette-card-title">Amazon EKS</h3>
    <p class="palette-card-desc">Choose this if your team already runs Kubernetes.</p>

  <PaletteCard icon="server" href="/deploy-and-run/self-hosted/vm-deployment#run-on-amazon-ec2">
    <h3 class="palette-card-title">Amazon EC2</h3>
    <p class="palette-card-desc">Choose this if you want a virtual machine you fully control.</p>

  <PaletteCard icon="event" href="/deploy-and-run/self-hosted/serverless-deployment#aws-lambda">
    <h3 class="palette-card-title">AWS Lambda</h3>
    <p class="palette-card-desc">Choose this for short, event-driven jobs that run only when needed.</p>


<span className="part-icon-badge">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" /></svg>
</span>

## Secure on AWS {#secure}

Follow these three practices from day one.

<PaletteGrid cols={3}>
  <PaletteCard icon="security">
    <h3 class="palette-card-title">Use IAM roles, not keys</h3>
    <p class="palette-card-desc">Your integration picks up the role of wherever it runs - nothing secret lives in code.</p>

      <PaletteChip href="/deploy-and-run/secure/aws-access#use-the-default-credential-chain">Default credential chain
      <PaletteChip href="/deploy-and-run/secure/aws-access#attach-an-iam-role">Attach an IAM role
      <PaletteChip href="/deploy-and-run/secure/aws-access#access-resources-in-another-aws-account">Cross-account access


  <PaletteCard icon="audit" href="/deploy-and-run/secure/secrets-encryption#aws-secrets-manager">
    <h3 class="palette-card-title">Keep secrets out of code</h3>
    <p class="palette-card-desc">Load passwords and settings from AWS Secrets Manager or SSM Parameter Store.</p>

  <PaletteCard icon="connections" href="/deploy-and-run/secure/aws-access#keep-aws-traffic-inside-your-vpc">
    <h3 class="palette-card-title">Keep traffic private</h3>
    <p class="palette-card-desc">Reach AWS services through VPC endpoints, with FIPS and dual-stack options.</p>


<span className="part-icon-badge">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-7 4 14 3-7h4" /></svg>
</span>

## Observe in AWS {#observe}

Send logs, traces and metrics to the AWS tools you already use.

<PaletteGrid cols={3}>
  <PaletteCard icon="logging">
    <h3 class="palette-card-title">Logs</h3>
    <p class="palette-card-desc">Collect logs in Amazon CloudWatch Logs.</p>

      <PaletteChip href="/observe/logging#send-logs-to-amazon-cloudwatch-logs">CloudWatch Logs


  <PaletteCard icon="scan">
    <h3 class="palette-card-title">Traces</h3>
    <p class="palette-card-desc">Follow each request end to end with AWS X-Ray.</p>

      <PaletteChip href="/observe/tracing#choose-a-tracing-backend">AWS X-Ray


  <PaletteCard icon="metrics">
    <h3 class="palette-card-title">Metrics</h3>
    <p class="palette-card-desc">Track performance in Amazon Managed Service for Prometheus.</p>

      <PaletteChip href="/observe/metrics#send-metrics-to-amazon-managed-service-for-prometheus">Managed Prometheus



## AWS connectors

Each AWS service has its own connector in the palette. On AWS, set `auth:
DEFAULT_CREDENTIALS` on a connector so it uses the IAM role of wherever it
runs. See [Access AWS services securely](/deploy-and-run/secure/aws-access).

<table className="aws-connectors-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Connector</th>
      <th>Use it for</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan={3}>Messaging</td>
      <td>[Amazon SQS](product://connectors/catalog/messaging/aws.sqs/overview)</td>
      <td>Queue messages</td>
    </tr>
    <tr>
      <td>[Amazon SNS](product://connectors/catalog/communication/aws.sns/aws-sns-connector-overview)</td>
      <td>Publish to topics</td>
    </tr>
    <tr>
      <td>[Amazon SES](product://connectors/catalog/marketing-social/aws.ses/connector-overview)</td>
      <td>Send email</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td>[Amazon S3](product://connectors/catalog/storage-file/aws.s3/overview)</td>
      <td>Bucket and object management</td>
    </tr>
    <tr>
      <td rowSpan={5}>Database</td>
      <td>[Amazon DynamoDB](product://connectors/catalog/database/aws.dynamodb/connector-overview)</td>
      <td>Read and write NoSQL data</td>
    </tr>
    <tr>
      <td>[DynamoDB Streams](product://connectors/catalog/database/aws.dynamodbstreams/connector-overview)</td>
      <td>Follow table changes</td>
    </tr>
    <tr>
      <td>[Amazon Redshift](product://connectors/catalog/database/aws.redshift/aws-redshift-connector-overview)</td>
      <td>Query data warehouses</td>
    </tr>
    <tr>
      <td>[Redshift Data API](product://connectors/catalog/database/aws.redshiftdata/connector-overview)</td>
      <td>Query data warehouses over an API</td>
    </tr>
    <tr>
      <td>[Amazon SimpleDB](product://connectors/catalog/database/aws.simpledb/connector-overview)</td>
      <td>Legacy key-value data</td>
    </tr>
    <tr>
      <td>Security</td>
      <td>[AWS Secrets Manager](product://connectors/catalog/security-identity/aws.secretmanager/aws-secrets-manager-connector-overview)</td>
      <td>Read secrets at runtime</td>
    </tr>
    <tr>
      <td rowSpan={2}>Marketplace</td>
      <td>[Metering](product://connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/aws-marketplace-mpm-connector-overview)</td>
      <td>Meter usage for Marketplace products</td>
    </tr>
    <tr>
      <td>[Entitlement](product://connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/aws-marketplace-mpe-connector-overview)</td>
      <td>Check entitlements for Marketplace products</td>
    </tr>
    <tr>
      <td rowSpan={3}>General-purpose</td>
      <td>[MySQL](product://connectors/catalog/database/mysql/connector-overview)</td>
      <td>For Amazon RDS and Aurora (MySQL-compatible)</td>
    </tr>
    <tr>
      <td>[PostgreSQL](product://connectors/catalog/database/postgresql/connector-overview)</td>
      <td>For Amazon RDS and Aurora (PostgreSQL-compatible)</td>
    </tr>
    <tr>
      <td>[Redis](product://connectors/catalog/database/redis/connector-overview)</td>
      <td>For ElastiCache and MemoryDB</td>
    </tr>
    <tr>
      <td>Change data capture</td>
      <td>[CDC](product://connectors/catalog/database/cdc/connector-overview)</td>
      <td>Stream database changes, with schema history kept in S3</td>
    </tr>
  </tbody>
</table>

## What's next?

  {/* TODO: uncomment once a "Build your first AWS integration" guide exists
  <PaletteCard icon="book" href="/guides/business-use-cases" highlight standalone>
    <h3 class="palette-card-title">Build your first AWS integration</h3>
    <p class="palette-card-desc">A complete, end-to-end guide to building your first integration with AWS services.</p>

  */}
  <PaletteCard icon="connections" href="product://connectors/catalog?vendor=Amazon" highlight standalone>
    <h3 class="palette-card-title">Browse AWS connectors &rarr;</h3>
    <p class="palette-card-desc">See every AWS connector available in WSO2 Integrator, from S3 and DynamoDB to SNS and SES.</p>


</div>
