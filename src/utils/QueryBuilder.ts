import { Knex } from 'knex';
import { QueryBuilderParams } from '../interfaces/common';

export class QueryBuilder<T> {
  public queryBuilder: Knex.QueryBuilder;
  private countQueryBuilder: Knex.QueryBuilder;
  private queryParams: QueryBuilderParams;
  private searchableFields: string[] = [];

  constructor(
    queryBuilder: Knex.QueryBuilder,
    queryParams: QueryBuilderParams,
    searchableFields: string[] = []
  ) {
    this.queryBuilder = queryBuilder;
    this.countQueryBuilder = queryBuilder.clone().clearSelect().count('* as total');
    this.queryParams = queryParams;
    this.searchableFields = searchableFields;
  }

  search(): this {
    const searchTerm = this.queryParams.search;
    if (searchTerm && this.searchableFields.length > 0) {
      this.queryBuilder.where((builder) => {
        this.searchableFields.forEach((field, index) => {
          if (index === 0) {
            builder.where(field, 'ILIKE', `%${searchTerm}%`);
          } else {
            builder.orWhere(field, 'ILIKE', `%${searchTerm}%`);
          }
        });
      });

      this.countQueryBuilder.where((builder) => {
        this.searchableFields.forEach((field, index) => {
          if (index === 0) {
            builder.where(field, 'ILIKE', `%${searchTerm}%`);
          } else {
            builder.orWhere(field, 'ILIKE', `%${searchTerm}%`);
          }
        });
      });
    }
    return this;
  }

  filter(): this {
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
        } else {
          this.queryBuilder.where(key, value);
          this.countQueryBuilder.where(key, value);
        }
      }
    });

    return this;
  }

  sort(): this {
    const sort = this.queryParams.sort;
    if (sort) {
      const [field, order] = sort.startsWith('-')
        ? [sort.substring(1), 'desc']
        : [sort, 'asc'];
      this.queryBuilder.orderBy(field, order as 'asc' | 'desc');
    } else {
      this.queryBuilder.orderBy('id', 'desc');
    }
    return this;
  }

  paginate(): this {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;
    const offset = (page - 1) * limit;

    this.queryBuilder.limit(limit).offset(offset);
    return this;
  }

  async execute(): Promise<{ data: T[]; meta: any }> {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;

    // Get total count - SEPARATE QUERY
    const countResult = await this.countQueryBuilder.first();
    const total = Number(countResult?.total) || 0;
    const totalPages = Math.ceil(total / limit);

    // Get paginated data
    const data = await this.queryBuilder;

    return {
      data: data as T[],
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}

export default QueryBuilder;