# hands-on-apigw

## 準備
```shell
# AWSプロファイルでAWSアカウントの向き先切り替え
export AWS_PROFILE=value-labo
# 向き先確認
aws sts get-caller-identity
````

## CloudFormationスタック作成
```shell
# S3
aws cloudformation deploy \
--stack-name hands-on-s3 \
--template-file ./01.s3.yml

# API Gateway
aws cloudformation deploy \
--stack-name hands-on-apigw \
--template-file ./02.apigw.yml \
--capabilities CAPABILITY_NAMED_IAM
```