import { Knex } from 'knex';
import { QueryBuilderParams } from '../interfaces/common';
export declare class QueryBuilder<T> {
    queryBuilder: Knex.QueryBuilder;
    private countQueryBuilder;
    private queryParams;
    private searchableFields;
    constructor(queryBuilder: Knex.QueryBuilder, queryParams: QueryBuilderParams, searchableFields?: string[]);
    where(callback: (qb: Knex.QueryBuilder) => void): this;
    search(): this;
    filter(): this;
    sort(): this;
    paginate(): this;
    execute(): Promise<{
        data: T[];
        meta: any;
    }>;
}
export default QueryBuilder;
//# sourceMappingURL=QueryBuilder.d.ts.map