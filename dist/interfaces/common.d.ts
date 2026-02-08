export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
}
export interface JwtPayload {
    id: number;
    email: string;
    name: string;
}
export interface QueryBuilderParams {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    [key: string]: any;
}
//# sourceMappingURL=common.d.ts.map