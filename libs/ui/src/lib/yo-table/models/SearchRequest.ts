import { TableSortType } from './Sort';

export type FilterType = Record<string, unknown>;

export interface SearchRequest<T> {
  page: number;
  size: number;
  filter?: T;
  sorts?: TableSortType;
}
