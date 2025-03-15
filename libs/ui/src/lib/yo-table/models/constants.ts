import { ReactNode } from "react";
import { FilterType, SearchRequest } from "./SearchRequest";
import { SearchResponse } from "./SearchResponse";
import { TableSortType } from "./Sort";
import { Props as CardProps } from "../../card";

export interface BaseRow {
  id: string | number;

  [key: string]: string | number | any;
}

export interface TableRowRenderFn<Type> {
  (arg: Type, index?: number, globalIndex?: number): ReactNode;
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
  headerRowClass?: string;
  bodyRowClass?: string;
  width?: number;
  isShow?: () => boolean;
  render?: TableRowRenderFn<ROW>;
  group?: string;
}

export type TABLE_COLOR =
  | "danger"
  | "primary"
  | "info"
  | "success"
  | "secondary";

export const TABLE_COLOR_CLASS: Record<TABLE_COLOR, any> = {
  danger: {
    header: "bg-danger text-white",
    table: "border-danger",
  },
  primary: {
    header: "bg-primary text-white",
    table: "border-primary",
  },
  info: {
    header: "bg-info text-dark",
    table: "border-info",
  },
  success: {
    header: "bg-success text-white",
    table: "border-success",
  },
  secondary: {
    header: "bg-secondary text-white",
    table: "border-secondary",
  },
};

export enum PagingMode {
  PAGING = 0,
  PREVIOUS_NEXT = 1,
}

export interface YoTableProps<F, ROW extends BaseRow> {
  columns: Array<TableColumn<ROW>>;
  fetchData: TableFetchDataFn<F, ROW>;
  initFilter?: FilterType;
  initSort?: TableSortType;
  rowId?: TableRowIdFn<ROW>;
  className?: string;
  color?: TABLE_COLOR;
  children?: React.ReactNode;
  enableSelectColumn?: boolean;
  wrapperClass?: string;
  onBeforeSearch?: (searchRequest: SearchRequest<F>) => void;
  onSelectChange?: (rows: Array<ROW>) => void;
  isShowPaging?: boolean;
  isFirstLoad?: boolean;
  isMultiSort?: boolean;
  pagingMode?: PagingMode;
}

export interface YoTableCardProps<F, ROW extends BaseRow>
  extends YoTableProps<F, ROW> {
  card: CardProps;
}
