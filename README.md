# hands-on-apigw

## 準備
```shell
# AWSプロファイルでAWSアカウントの向き先切り替え（各自の環境に合わせて変更）
export AWS_PROFILE=value-labo
# 向き先確認
aws sts get-caller-identity
````

## CloudFormationスタック作成
### S3バケット作成
```shell
# ユニークなS3バケット名を定義
BucketName=hands-on-apigw-s3-$(date +%Y%m%d%H%M)
echo "BucketName=$BucketName"

# S3バケット作成
aws cloudformation deploy \
--stack-name hands-on-apigw-s3-rev3 \
--template-file ./cloudformation/01.s3.yml \
--parameter-overrides BucketName=$BucketName
```

### S3バケットにHTMLアップロード
```shell
aws s3 cp ./contents s3://$BucketName/ --recursive
```

### Lambda関数雛形作成
```shell
aws cloudformation deploy \
--stack-name hands-on-apigw-lambda-rev3 \
--template-file ./cloudformation/02.lambda.function.yml \
--capabilities CAPABILITY_NAMED_IAM
```

### API Gateway作成
```shell
aws cloudformation deploy \
--stack-name hands-on-apigw-gw-rev3 \
--template-file ./cloudformation/03.apigw.yml \
--parameter-overrides BucketName=$BucketName
```

### Lambda関数デプロイ
```shell
# ZIPでパッケージング
cd ./lambda-functions/lambda_calc_addition
zip -r lambda_calc_addition.zip * -x localtest.mjs *.md

# デプロイ
aws lambda update-function-code \
--function-name hands-on-apigw-calc-addition \
--zip-file fileb://lambda_calc_addition.zip > /dev/null 2>&1

cd ../../
```

### DynamoDB 計算結果格納用テーブル作成
```shell
aws cloudformation deploy \
--stack-name hands-on-apigw-dynamodb-rev3 \
--template-file ./cloudformation/04.dynamodb.yml
```


## API Gatewayエンドポイント取得
```shell
API_ENDPOINT=$(aws cloudformation list-exports --query "Exports[?Name=='ApiEndpoint-hands-on-apigw'].Value" --output text)
echo $API_ENDPOINT
````

## テスト呼び出し
```shell
# index.html
curl "$API_ENDPOINT/index.html"
# 計算API
curl "$API_ENDPOINT/calc/add?num1=5&num2=10"
```