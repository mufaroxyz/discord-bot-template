interface ErrorDetails {
    code: number | string;
    message: string;
    details?: string;
    timestamp: string;
    path: string;
}

interface ErrorResponse {
    status: 'error';
    statusCode: number;
    error: ErrorDetails;
}

interface SuccessResponse<T> {
    status: 'success';
    statusCode: number;
    data: T;
    timestamp: string;
    path: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

type ErrorCode = {
    code: number;
    message: string;
}