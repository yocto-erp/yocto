export enum SORT_DIR {
  DESC = 'desc',
  ASC = 'asc',
}

export type TableSortType = Record<string, SORT_DIR>;
