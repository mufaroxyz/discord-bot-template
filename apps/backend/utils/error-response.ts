export function createErrorResponse<T>({
    statusCode,
    code,
    message,
    details,
    path
}: {
    statusCode: number;
    code: string | number;
    message: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    details: any;
    path: string;
}): ErrorResponse {
    return {
        status: 'error',
        statusCode,
        error: {
            code,
            message,
            details,
            timestamp: new Date().toISOString(),
            path,
        },
    };
}
