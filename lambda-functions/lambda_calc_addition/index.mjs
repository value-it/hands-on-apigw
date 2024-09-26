import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

// DynamoDB クライアントを初期化
const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const CALCULATION_TABLE = "CalculationTable";

export const handler = async (event) => {
    try {
        // クエリパラメータから数値を取得
        const num1 = parseFloat(event.queryStringParameters?.num1);
        const num2 = parseFloat(event.queryStringParameters?.num2);

        // 入力の検証
        if (isNaN(num1) || isNaN(num2)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Invalid input. Please provide two valid numbers."
                }),
            };
        }

        // 足し算を実行
        const result = num1 + num2;

        // ランダムなID（UUID）を生成
        const id = uuidv4();

        // 実行日時を取得
        const executionDate = new Date().toISOString();

        // DynamoDBに結果を保存
        const saveParams = {
            TableName: CALCULATION_TABLE,
            Item: {
                ID: { S: id },
                Num1: { N: num1.toString() },
                Num2: { N: num2.toString() },
                Result: { N: result.toString() },
                ExecutionDate: { S: executionDate }
            }
        };

        const command = new PutItemCommand(saveParams);
        await dynamoDBClient.send(command);

        // 成功したレスポンスを返す
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `The result of ${num1} + ${num2} is ${result}`,
                id: id,
                executionDate: executionDate
            }),
        };

    } catch (error) {
        console.error('Error occurred:', error);

        // エラーハンドリング
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "An error occurred while processing your request.",
                error: error.message
            }),
        };
    }
};
