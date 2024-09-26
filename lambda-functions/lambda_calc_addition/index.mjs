
// Lambdaハンドラー
export const handler = async (event) => {
    // クエリパラメータから数値を取得
    const num1 = parseFloat(event.queryStringParameters.num1);
    const num2 = parseFloat(event.queryStringParameters.num2);

    // 数値のバリデーション
    if (isNaN(num1) || isNaN(num2)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Invalid input. Please provide two numbers."
            }),
        };
    }

    // 足し算を実行
    const result = num1 + num2;

    // 結果を返す
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `The result of ${num1} + ${num2} is ${result}`,
            result: result
        }),
    };
};