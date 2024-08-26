#!/bin/bash

# Variables
FUNCTION_NAME="file-upload-lambda"
ZIP_FILE="file-upload-lambda.zip"
S3_BUCKET_NAME="khfd-wedding-uploads"
AWS_PROFILE="deirtech"

# Navigate to the Lambda function directory
cd functions/file-upload-lambda

# Install dependencies
npm install

# Zip the Lambda function code
zip -r $ZIP_FILE .

# Upload the zip file to S3 (optional, if you want to use S3 for deployment)
# aws s3 cp $ZIP_FILE s3://$S3_BUCKET_NAME/$ZIP_FILE --profile $AWS_PROFILE

# Update the Lambda function code
aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://$ZIP_FILE --profile $AWS_PROFILE

# Update environment variables (optional)
# aws lambda update-function-configuration --function-name $FUNCTION_NAME --environment "Variables={S3_BUCKET_NAME=$S3_BUCKET_NAME}" --profile $AWS_PROFILE

# Clean up
rm $ZIP_FILE