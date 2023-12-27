import { Request } from 'express';
import { Query, SortOrder } from 'mongoose';
import { TPractice } from '@src/model/user-schema.js';

export class FetcherApi {
  query!: Query<TPractice[], TPractice>;
  queryStr!: Request['query'];

  constructor(query: Query<TPractice[], TPractice>, queryStr: Request['query']) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const { keyword } = this.queryStr;
    const filter =
      keyword && typeof keyword === 'string'
        ? {
            $or: [
              { 'name.firstName': { $regex: keyword, $options: 'i' } },
              { role: { $regex: keyword, $options: 'i' } },
            ],
          }
        : {};

    this.query = this.query.find(filter);
    return this;
  }

  filter() {
    const { _id } = this.queryStr;
    const filter = _id && typeof _id === 'string' ? { _id } : {};
    this.query = this.query.find(filter);
    return this;
  }

  sort() {
    const { sort } = this.queryStr;
    let sortCriteria: { [key: string]: SortOrder } = { age: -1 };

    if (sort && typeof sort === 'string') {
      const validSortFields = ['age'];
      const validSortOrders = ['-1', '1'];
      const [sortField, sortOrder] = sort.split('|');
      if (validSortFields.includes(sortField) && validSortOrders.includes(sortOrder)) {
        sortCriteria = { [sortField]: sortOrder as SortOrder };
      }
    }

    this.query = this.query.sort(sortCriteria);
    return this;
  }

  paginate() {
    const { pageNo, pageLength } = this.queryStr;
    let limit = pageLength && !isNaN(+pageLength) && +pageLength < 100 ? +pageLength : 10;
    let skip = pageNo && !isNaN(+pageNo) && +pageNo > 0 ? (+pageNo - 1) * limit : 0;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
