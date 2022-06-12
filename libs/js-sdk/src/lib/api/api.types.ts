export interface SearchResponse<T> {
  count: number;
  rows: Array<T>;
}

export type SortDirection = "asc" | "desc" | "";

export interface Sort {
  [column: string]: SortDirection
}

export interface SearchRequest<T> {
  page: number;
  size: number;
  filter?: T;
  sorts?: Sort;
}
