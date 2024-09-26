// このスクリプトはローカルでの動作確認にのみ使用する
import {handler} from './index.mjs';

// 擬似的なLambdaイベントを作成
const testEvent = {
    queryStringParameters: {
        num1: "5",
        num2: "3"
    },
    httpMethod: "GET"
};

// テストの実行
const runTest = async () => {
    try {
        const response = await handler(testEvent);
        console.log('Lambda response:', response);
    } catch (error) {
        console.error('Lambda error:', error);
    }
};

void runTest();
