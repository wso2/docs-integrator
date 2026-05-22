---
title: Serverless Deployment
---

# Serverless Deployment

WSO2 Integrator projects can be deployed as serverless functions, enabling event-driven scaling with zero infrastructure management. Ballerina supports AWS Lambda and Azure Functions as first-class deployment targets via compiler extensions that generate deployment artifacts automatically at build time.

## Overview

| Feature | AWS Lambda | Azure Functions |
|---------|-----------|-----------------|
| Trigger Types | HTTP (API Gateway), S3, SQS, DynamoDB Streams, SES | HTTP, Timer, Blob Storage, Queue, CosmosDB |
| Max Execution | 15 minutes | 10 minutes (Consumption plan) |
| Runtime | Custom runtime (provided) | Java 21, Windows hosting |

## Azure Functions

### Prerequisites

Create an Azure Function App with the following settings before deploying:

- **Runtime stack**: Java 21
- **Hosting OS**: Windows (Linux is not supported for Ballerina custom handlers)

Install the [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local) (`func` CLI) for local development and deployment.

### Step 1: Write the Azure function

Ballerina uses a service-based model for Azure Functions. Attach a listener to a service to define the trigger type. The resource function behaves like a standard `ballerina/http` resource and supports `http:Payload` and `http:Header` annotations.

```ballerina
import ballerinax/azure.functions as af;

service / on new af:HttpListener() {
    resource function get hello(string name) returns string {
        return "Hello, " + name + "!";
    }
}
```

Other trigger types use their corresponding listeners:

```ballerina
import ballerinax/azure.functions as af;

// Queue trigger
service "myqueue" on new af:QueueListener({queueName: "myqueue"}) {
    remote function onMessage(string message) returns error? {
        // process queue message
    }
}

// Timer trigger (runs every minute)
service "timer" on new af:TimerListener({schedule: "0 */1 * * * *"}) {
    remote function onTrigger() returns error? {
        // scheduled work
    }
}

// Blob trigger
service "mycontainer/{name}" on new af:BlobListener({path: "mycontainer/{name}"}) {
    remote function onUpdated(byte[] content) returns error? {
        // process blob
    }
}
```

### Step 2: Build

```bash
bal build
```

The compiler extension generates the function artifacts automatically:

```
target/
  azure_functions/
    <function-name>/
      function.json
    host.json
```

The build output lists the functions and prints the commands to run locally and deploy:

```text
@azure.functions:Function: get-hello

    Execute the command below to deploy the function locally:
    $ func start --script-root target/azure_functions --java

    Execute the command below to deploy Ballerina Azure Functions:
    $ func azure functionapp publish <function_app_name> --script-root target/azure_functions
```

### Step 3: Run locally

```bash
func start --script-root target/azure_functions --java
```

### Step 4: Deploy to Azure

First create the required Azure resources:

```bash
az group create --name integration-rg --location eastus

az storage account create \
  --name integrationstorage \
  --location eastus \
  --resource-group integration-rg \
  --sku Standard_LRS

az functionapp create \
  --resource-group integration-rg \
  --consumption-plan-location eastus \
  --runtime java \
  --runtime-version 21 \
  --functions-version 4 \
  --name my-integration-func \
  --storage-account integrationstorage \
  --os-type Windows
```

Then deploy using the Azure Functions Core Tools:

```bash
func azure functionapp publish my-integration-func \
  --script-root target/azure_functions
```

### Azure configuration

Set application settings for environment-specific configuration:

```bash
az functionapp config appsettings set \
  --name my-integration-func \
  --resource-group integration-rg \
  --settings "DB_HOST=db.internal.example.com" "DB_PORT=5432"
```

## AWS Lambda

### Step 1: Write the Lambda function

Write a Ballerina function annotated with `@lambda:Function`. The function receives a `lambda:Context` and a `json` (or typed event) input and returns `json|error`.

```ballerina
import ballerinax/aws.lambda;
import ballerina/uuid;

@lambda:Function
public function echo(lambda:Context ctx, json input) returns json {
    return input;
}

@lambda:Function
public function generateId(lambda:Context ctx, json input) returns json {
    return uuid:createType1AsString();
}
```

To handle typed event sources, use the corresponding event types:

```ballerina
import ballerinax/aws.lambda;

@lambda:Function
public function processOrder(lambda:Context ctx,
                             lambda:APIGatewayProxyRequest request) returns json|error {
    string orderId = check request.queryStringParameters["orderId"];
    return { statusCode: 200, body: "Order " + orderId + " received" };
}

@lambda:Function
public function processSQS(lambda:Context ctx, lambda:SQSEvent event) returns json {
    return event.Records[0].body;
}

@lambda:Function
public function processS3(lambda:Context ctx, lambda:S3Event event) returns json {
    return event.Records[0].s3.'object.key;
}

@lambda:Function
public function processDynamoDB(lambda:Context ctx,
                                lambda:DynamoDBEvent event) returns json {
    return event.Records[0].dynamodb.Keys.toString();
}
```

### Step 2: Build

```bash
bal build
```

The compiler extension runs automatically and generates the deployment package:

```
target/
  aws_lambda/
    aws-ballerina-lambda-functions.zip
```

The build output lists the functions and prints the exact deploy commands to use:

```
@aws.lambda:Function: echo, generateId, processOrder, processSQS, processS3, processDynamoDB

    Run the following command to deploy each Ballerina AWS Lambda function:
    aws lambda create-function --function-name <FUNCTION_NAME> \
      --zip-file fileb://aws-ballerina-lambda-functions.zip \
      --handler <FILE_NAME>.<FUNCTION_NAME> \
      --runtime provided \
      --role <LAMBDA_ROLE_ARN> \
      --layers arn:aws:lambda:<REGION_ID>:367134611783:layer:ballerina-jre21: \
      --memory-size 512 --timeout 10

    Run the following command to re-deploy an updated Ballerina AWS Lambda function:
    aws lambda update-function-code --function-name <FUNCTION_NAME> \
      --zip-file fileb://aws-ballerina-lambda-functions.zip
```

### Step 3: Deploy with the AWS CLI

Use the commands printed by the build output, substituting your values. For example:

```bash
aws lambda create-function \
  --function-name echo \
  --zip-file fileb://target/aws_lambda/aws-ballerina-lambda-functions.zip \
  --handler functions.echo \
  --runtime provided \
  --role arn:aws:iam::123456789012:role/lambda-execution-role \
  --layers arn:aws:lambda:us-east-1:367134611783:layer:ballerina-jre21:1 \
  --memory-size 512 \
  --timeout 10
```

To update an already-deployed function:

```bash
aws lambda update-function-code \
  --function-name echo \
  --zip-file fileb://target/aws_lambda/aws-ballerina-lambda-functions.zip
```

### Step 4: Add an API Gateway trigger

```bash
aws apigatewayv2 create-api \
  --name order-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:123456789012:function:processOrder
```

### Lambda configuration

Configure via environment variables in the Lambda console or deployment script:

```bash
aws lambda update-function-configuration \
  --function-name processOrder \
  --environment "Variables={DB_HOST=db.internal.example.com,DB_PORT=5432}"
```

For secrets, reference AWS Secrets Manager from your application code rather than embedding values in environment variables.

## Reducing cold start times

### Use GraalVM native images

Compile to a native binary to reduce startup time.

For AWS Lambda:

```bash
bal build --graalvm
```

For Azure Functions:

```bash
bal build --graalvm --cloud="azure_functions"
```

### Provisioned concurrency (AWS)

Keep warm instances ready to handle requests:

```bash
aws lambda put-provisioned-concurrency-config \
  --function-name processOrder \
  --qualifier production \
  --provisioned-concurrent-executions 5
```

### Premium plan (Azure)

Use the Premium plan for pre-warmed instances:

```bash
az functionapp plan create \
  --name premium-plan \
  --resource-group integration-rg \
  --location eastus \
  --sku EP1 \
  --min-instances 1
```

## Best practices

| Practice | Recommendation |
|----------|---------------|
| Function Size | Keep functions focused on a single operation |
| Dependencies | Minimize package dependencies to reduce deployment size |
| Timeouts | Set appropriate timeouts based on expected execution time |
| Secrets | Use cloud-native secret managers (Secrets Manager, Key Vault) |
| Observability | Enable X-Ray (AWS) or Application Insights (Azure) |
| VPC Access | Configure VPC/VNet only when accessing private resources |

## What's next

- [GraalVM Native Images](graalvm-native-images.md) — Compile to native binaries for minimal cold start
- [Managing Configurations](managing-configurations.md) — Environment-specific configuration strategies
- [Deploy to AWS / Azure / GCP](aws-azure-gcp.md) — Container-based cloud deployments
