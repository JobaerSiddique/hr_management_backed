import { Response } from 'express';
interface SendResponseOptions<T> {
    success: boolean;
    message: string;
    statusCode?: number;
    data?: T | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
declare const sendResponse: <T>(res: Response, options: SendResponseOptions<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map