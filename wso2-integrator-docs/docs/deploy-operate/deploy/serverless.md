---
sidebar_position: 8
title: Serverless Deployment
description: Deploy integrations as serverless functions on AWS Lambda and Azure Functions.
---

# Serverless Deployment

WSO2 Integrator projects can be deployed as serverless functions, enabling event-driven scaling with zero infrastructure management. Ballerina supports AWS Lambda and Azure Functions as first-class deployment targets.

## Overview

| Feature | AWS Lambda | Azure Functions |
|---------|-----------|-----------------|
| Trigger Types | HTTP (API Gateway), S3, SQS, DynamoDB Streams | HTTP, Timer, Blob Storage, Queue, Event Hub |
| Cold Start | ~2-5s (JVM), under 100ms (GraalVM) | ~2-5s (JVM), under 100ms (GraalVM) |
| Max Execution | 15 minutes | 10 minutes (Consumption plan) |
| Memory | 128 MB - 10 GB | 128 MB - 14 GB |
| Language Runtime | Java 17+ | Java 17+ |

## AWS Lambda

### Step 1 -- Create the Lambda Function

Write a Ballerina function annotated with `@awslambda:Function`:

```ballerina
import ballerinax/awslambda;

@awslambda:Function
public function orderProcessor(awslambda:Context ctx,
                                json payload) returns json|error {
    // Extract order details
    string orderId = check payload.orderId;

    // Process the order (call downstream services, transform data, etc.)
    json result = check processOrder(orderId);

    return {
        statusCode: 200,
        body: result
    };
}
```

### Step 2 -- Build for Lambda

```bash
bal build --cloud=aws_lambda
```

This generates the deployment artifacts:

```
target/
  aws/
    my_integration.zip       # Lambda deployment package
    aws-ballerina-lambda.yaml  # SAM template
```

### Step 3 -- Deploy with AWS SAM

```bash
sam deploy \
  --template-file target/aws/aws-ballerina-lambda.yaml \
  --stack-name my-integration-stack \
  --capabilities CAPABILITY_IAM \
  --region us-east-1
```

Alternatively, deploy with the AWS CLI:

```bash
aws lambda create-function \
  --function-name orderProcessor \
  --runtime java17 \
  --handler my_integration.orderProcessor \
  --zip-file fileb://target/aws/my_integration.zip \
  --role arn:aws:iam::123456789:role/lambda-execution-role \
  --memory-size 512 \
  --timeout 30
```

### Step 4 -- Add an API Gateway Trigger

```bash
aws apigatewayv2 create-api \
  --name order-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:123456789:function:orderProcessor
```

### Lambda Configuration

Configure via environment variables in the Lambda console or template:

```yaml
Environment:
  Variables:
    DB_HOST: "db.internal.example.com"
    DB_PORT: "5432"
    API_KEY: "{{resolve:secretsmanager:my-api-key}}"
```

## Azure Functions

### Step 1 -- Create the Azure Function

```ballerina
import ballerinax/azure.functions;

@functions:Function
public function httpTrigger(@functions:HTTPTrigger {}
                            functions:HTTPRequest request)
                            returns @functions:HTTPOutput functions:HTTPResponse {
    json payload = check request.getJsonPayload();
    string name = check payload.name;

    return {
        statusCode: 200,
        body: "Hello, " + name
    };
}
```

### Step 2 -- Build for Azure Functions

```bash
bal build --cloud=azure_functions
```

Generated artifacts:

```
target/
  azure_functions/
    my_integration/
      function.json
      handler.jar
    host.json
```

### Step 3 -- Deploy to Azure

```bash
# Create resources
az group create --name integration-rg --location eastus
az storage account create --name integrationstorage --location eastus \
  --resource-group integration-rg --sku Standard_LRS
az functionapp create --resource-group integration-rg \
  --consumption-plan-location eastus \
  --runtime java --runtime-version 17 \
  --functions-version 4 \
  --name my-integration-func \
  --storage-account integrationstorage

# Deploy
az functionapp deployment source config-zip \
  --resource-group integration-rg \
  --name my-integration-func \
  --src target/azure_functions/my_integration.zip
```

### Azure Configuration

Set application settings for environment-specific configuration:

```bash
az functionapp config appsettings set \
  --name my-integration-func \
  --resource-group integration-rg \
  --settings "DB_HOST=db.internal.example.com" "DB_PORT=5432"
```

## Reducing Cold Start Times

### Use GraalVM Native Images

Compile to a native binary to dramatically reduce cold start times:

```bash
bal build --graalvm --cloud=aws_lambda
```

This produces a native executable that starts in under 100ms compared to 2-5 seconds for JVM-based deployments.

### Provisioned Concurrency (AWS)

Keep warm instances ready to handle requests:

```bash
aws lambda put-provisioned-concurrency-config \
  --function-name orderProcessor \
  --qualifier production \
  --provisioned-concurrent-executions 5
```

### Premium Plan (Azure)

Use the Premium plan for pre-warmed instances:

```bash
az functionapp plan create --name premium-plan \
  --resource-group integration-rg \
  --location eastus \
  --sku EP1 --min-instances 1
```

## Best Practices

| Practice | Recommendation |
|----------|---------------|
| Function Size | Keep functions focused on a single operation |
| Dependencies | Minimize package dependencies to reduce deployment size |
| Timeouts | Set appropriate timeouts (default is often too high) |
| Secrets | Use cloud-native secret managers (Secrets Manager, Key Vault) |
| Observability | Enable X-Ray (AWS) or Application Insights (Azure) |
| VPC Access | Configure VPC/VNet only when accessing private resources |

## What's Next

- [GraalVM Native Images](graalvm.md) -- Compile to native binaries for minimal cold start
- [Managing Configurations](managing-configurations.md) -- Environment-specific configuration strategies
- [Deploy to AWS / Azure / GCP](cloud-providers.md) -- Container-based cloud deployments
