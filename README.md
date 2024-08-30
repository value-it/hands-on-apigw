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
# ユニークなS3バケット名を定義
BucketName=hands-on-apigw-s3-$(date +%Y%m%d%H%M)
echo "BucketName=$BucketName"

# S3バケット作成
aws cloudformation deploy \
--stack-name hands-on-apigw-s3 \
--template-file ./cloudformation/01.s3.yml \
--parameter-overrides BucketName=$BucketName

# API Gateway作成
aws cloudformation deploy \
--stack-name hands-on-apigw \
--template-file ./cloudformation/02.apigw.yml \
--parameter-overrides BucketName=$BucketName
```

## HTMLアップロード
```shell
aws s3 cp ./contents s3://$BucketName/ --recursive
```

