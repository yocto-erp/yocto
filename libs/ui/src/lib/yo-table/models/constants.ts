import { ReactNode } from 'react';
import { SORT_DIR } from './Sort';
import { SearchRequest } from './SearchRequest';
import { SearchResponse } from './SearchResponse';

export interface BaseRow {
  id: string | number;
  [key: string]: any
}

interface TableRowRenderFn<Type> {
  (arg: Type): ReactNode;
}

export interface TableFetchDataFn<ROW> {
  (arg: SearchRequest): Promise<SearchResponse<ROW>>;
}

export interface TableColumnOnSortFn {
  (name: string, sort: SORT_DIR | null): void;
}

export interface TableColumnIsShowFn {
  (): boolean;
}

export interface TableRowIdFn<ROW extends BaseRow> {
  (row: ROW): string;
}

export interface TableHeaderOnSelectAllFn {
  (isSelect: boolean): void;
}

export interface TableBodyOnSelectItemFn<ROW> {
  (row: ROW): void;
}

export interface TableColumn<ROW> {
  header: React.ReactNode;
  data: string;
  sort?: boolean | string;
  class?: string;
  width?: number;
  isShow?: TableColumnIsShowFn;
  render?: TableRowRenderFn<ROW>;
}
