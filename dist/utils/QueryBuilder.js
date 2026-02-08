"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor(queryBuilder, queryParams, searchableFields = []) {
        this.searchableFields = [];
        this.queryBuilder = queryBuilder;
        this.countQueryBuilder = queryBuilder.clone().clearSelect().count('* as total');
        this.queryParams = queryParams;
        this.searchableFields = searchableFields;
    }
    where(callback) {
        callback(this.queryBuilder);
        callback(this.countQueryBuilder);
        return this;
    }
    search() {
        const searchTerm = this.queryParams.search;
        if (searchTerm && this.searchableFields.length > 0) {
            this.queryBuilder.where((builder) => {
                this.searchableFields.forEach((field, index) => {
                    if (index === 0) {
                        builder.where(field, 'ILIKE', `%${searchTerm}%`);
                    }
                    else {
                        builder.orWhere(field, 'ILIKE', `%${searchTerm}%`);
                    }
                });
            });
            this.countQueryBuilder.where((builder) => {
                this.searchableFields.forEach((field, index) => {
                    if (index === 0) {
                        builder.where(field, 'ILIKE', `%${searchTerm}%`);
                    }
                    else {
                        builder.orWhere(field, 'ILIKE', `%${searchTerm}%`);
                    }
                });
            });
        }
        return this;
    }
    filter() {
        const filterableFields = { ...this.queryParams };
        delete filterableFields.search;
        delete filterableFields.page;
        delete filterableFields.limit;
        delete filterableFields.sort;
        Object.keys(filterableFields).forEach((key) => {
            const value = filterableFields[key];
            if (value !== undefined && value !== null && value !== '') {
                if (Array.isArray(value)) {
                    this.queryBuilder.whereIn(key, value);
                    this.countQueryBuilder.whereIn(key, value);
                }
                else {
                    this.queryBuilder.where(key, value);
                    this.countQueryBuilder.where(key, value);
                }
            }
        });
        return this;
    }
    sort() {
        const sort = this.queryParams.sort;
        if (sort) {
            const [field, order] = sort.startsWith('-')
                ? [sort.substring(1), 'desc']
                : [sort, 'asc'];
            this.queryBuilder.orderBy(field, order);
        }
        else {
            this.queryBuilder.orderBy('id', 'desc');
        }
        return this;
    }
    paginate() {
        const page = Number(this.queryParams.page) || 1;
        const limit = Number(this.queryParams.limit) || 10;
        const offset = (page - 1) * limit;
        this.queryBuilder.limit(limit).offset(offset);
        return this;
    }
    async execute() {
        const page = Number(this.queryParams.page) || 1;
        const limit = Number(this.queryParams.limit) || 10;
        const countResult = await this.countQueryBuilder.first();
        const total = Number(countResult?.total) || 0;
        const totalPages = Math.ceil(total / limit);
        const data = await this.queryBuilder;
        return {
            data: data,
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }
}
exports.QueryBuilder = QueryBuilder;
exports.default = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map