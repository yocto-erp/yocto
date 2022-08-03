import { TableSortType } from './Sort';

export type FilterType = Record<string, any>;

export interface SearchRequest<T> {
  page: number;
  size: number;
  filter?: T;
  sorts?: TableSortType;
}
