import { ReactNode } from "react";
import { SearchRequest } from "./SearchRequest";
import { SearchResponse } from "./SearchResponse";

export interface BaseRow {
  id: string | number;

  [key: string]: string | number | never;
}

interface TableRowRenderFn<Type> {
  (arg: Type): ReactNode;
}

export interface TableFetchDataFn<F, R> {
  (arg: SearchRequest<F>): Promise<SearchResponse<R>>;
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
  isShow?: () => boolean;
  render?: TableRowRenderFn<ROW>;
}
