export interface SearchResponse<ROW> {
  count: number;
  rows: Array<ROW | never>;

  [key: string]: unknown;
}
