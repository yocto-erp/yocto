export interface SearchResponse<ROW> {
  count: number;
  rows: Array<ROW>;
}
