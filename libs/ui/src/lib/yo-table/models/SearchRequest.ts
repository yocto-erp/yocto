import { TableSortType } from './Sort';

export type FilterType = Record<string, never>;

export interface SearchRequest {
  page: number;
  size: number;
  filter?: FilterType;
  sorts?: TableSortType;
}
