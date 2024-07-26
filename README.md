# hands-on-apigw

## 準備
```shell
# AWSプロファイルでAWSアカウントの向き先切り替え（各自の環境に合わせて変更）
export AWS_PROFILE=value-labo
# 向き先確認
aws sts get-caller-identity
````

## CloudFormationスタック作成
```shell
BucketName=hands-on-s3-$(date +%Y%m%d%H%M)

# S3
aws cloudformation deploy \
--stack-name hands-on-s3 \
--template-file ./01.s3.yml \
--parameter-overrides BucketName=$BucketName

# API Gateway
aws cloudformation deploy \
--stack-name hands-on-apigw \
--template-file ./02.apigw.yml \
--capabilities CAPABILITY_NAMED_IAM \
--parameter-overrides BucketName=$BucketName
```