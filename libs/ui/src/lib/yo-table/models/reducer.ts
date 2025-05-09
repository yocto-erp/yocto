import { createContext, useContext } from "react";
import { SearchRequest } from "./SearchRequest";
import { SORT_DIR, TableSortType } from "./Sort";
import { SearchResponse } from "./SearchResponse";
import { API_STATE, ApiError } from "../../api";
import { BaseRow, TableRowIdFn } from "./constants";

const ListActionContext = createContext({
  onSort: (name: string, sort: SORT_DIR | string) => console.log("onSort"),
  onChangePage: (page: number) => console.log("onChangePage", page),
  onChangeSize: (size: number) => console.log("onChangeSize", size),
  onSearch: (f: any) => console.log("onSearch", f),
  toggleAllItem: (index: number) => console.log("toggleAllItem", index),
  toggleItem: (index: number) => console.log("toggleAllItem", index),
  isItemSelect: (index: number): boolean => true,
  onRefresh: () => console.log("OnRefresh"),
  selectItems: [] as any[],
  removeItems: (items: any[]) => console.log("OnRemoveItems"),
  loadData: (s: SearchRequest<any>) =>
    new Promise((res) => {
      console.log("loadData", s);
      res(1);
    }),
  dispatch: (action: REDUCE_ACTION<any, any>) => console.log("dispatch"),
});
const ListStateContext = createContext({} as TableState<any, any>);

export function useListActionContext() {
  return useContext(ListActionContext);
}

export function useListStateContext<F, R>() {
  return useContext<TableState<F, R>>(ListStateContext);
}

export const ListActionProvider = ListActionContext.Provider;
export const ListStateProvider = ListStateContext.Provider;

export enum ACTION {
  SEARCH = "SEARCH",
  REFRESH = "REFRESH",
  CHANGE_PAGE_SIZE = "CHANGE_PAGE_SIZE",
  CHANGE_PAGE = "CHANGE_PAGE",
  SORT = "SORT",
  LOAD_START = "LOAD_START",
  LOAD_SUCCESS = "LOAD_SUCCESS",
  LOAD_FAIL = "LOAD_FAIL",
  SELECT_ITEM = "SELECT_ITEM",
  SELECT_ALL_NONE = "SELECT_ALL_NONE",
  REMOVE_ITEMS = "REMOVE_ITEMS",
  SET_SEARCH_REQUEST = "SET_SEARCH_REQUEST",
}

export enum TABLE_SELECT_TYPE {
  ALL = 1,
  NONE = 2,
}

export interface REDUCE_ACTION<F, ROW extends BaseRow> {
  type: ACTION;
  data?: {
    resp?: SearchResponse<ROW>;
    searchRequest?: SearchRequest<F>;
    filter?: F;
    errors?: Array<ApiError>;
    page?: number;
    size?: number;
    name?: string;
    dir?: SORT_DIR | string;
    index?: number;
    rowId?: TableRowIdFn<ROW>;
    selectType?: TABLE_SELECT_TYPE;
    removeItems?: Array<ROW> | null;
    onChangeItems?: (items: Array<ROW>) => void;
    isMultiSort?: boolean
  };
}

export const LIST_PAGE_SIZE = [10, 20, 50, 100, 500];

export enum PAGING_TYPE {
  PAGING = 1,
  LOAD_MORE = 2,
}

export interface TableState<F, R> {
  pagingType: PAGING_TYPE;
  state: API_STATE;
  selects?: Record<string, any>;
  errors?: Array<ApiError>;
  search: SearchRequest<F>;
  data?: SearchResponse<R> | null;
}

export interface InitTableStateProps<F> {
  filter?: F;
  sorts?: TableSortType;
  pagingType?: PAGING_TYPE
}

export function initialTableState<F, R>({
  filter,
  sorts,
  pagingType = PAGING_TYPE.PAGING
}: InitTableStateProps<F>): TableState<F, R> {
  return {
    pagingType,
    errors: [],
    state: API_STATE.PENDING,
    search: {
      page: 1,
      size: 10,
      filter,
      sorts: sorts || {},
    },
    data: {
      rows: [],
      count: 0,
    },
  };
}

export function onChangeSort<F, ROW extends BaseRow>(
  name: string,
  value: SORT_DIR | string,
  resp: SearchResponse<ROW>,
  isMultiSort: boolean
): REDUCE_ACTION<F, ROW> {
  return {
    type: ACTION.SORT,
    data: {
      name,
      dir: value,
      resp,
      isMultiSort
    },
  };
}

export function actionToggleItem<F, ROW extends BaseRow>(
  itemIndex: number,
  rowId?: TableRowIdFn<ROW>,
  onChangeItems?: (items: Array<ROW>) => void
): REDUCE_ACTION<F, ROW> {
  return {
    type: ACTION.SELECT_ITEM,
    data: {
      index: itemIndex,
      rowId,
      onChangeItems,
    },
  };
}

export function actionToggleAll<F, ROW extends BaseRow>(
  type: TABLE_SELECT_TYPE,
  rowId?: TableRowIdFn<ROW>,
  onChangeItems?: (items: Array<ROW>) => void
): REDUCE_ACTION<F, ROW> {
  return {
    type: ACTION.SELECT_ALL_NONE,
    data: {
      selectType: type,
      rowId,
      onChangeItems
    },
  };
}

export function loadStart<F, ROW extends BaseRow>(): REDUCE_ACTION<F, ROW> {
  return {
    type: ACTION.LOAD_START,
  };
}

export function loadSuccess<F, R extends BaseRow>(
  data: SearchResponse<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.LOAD_SUCCESS,
    data: {
      resp: data,
    },
  };
}

export function loadFail<F, R extends BaseRow>(
  data: Array<ApiError>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.LOAD_FAIL,
    data: {
      errors: data,
    },
  };
}

export function changePage<F, R extends BaseRow>(
  page: number,
  data: SearchResponse<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.CHANGE_PAGE,
    data: {
      page,
      resp: data,
    },
  };
}

export function changePageSize<F, R extends BaseRow>(
  size: number,
  data: SearchResponse<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.CHANGE_PAGE_SIZE,
    data: {
      size,
      resp: data,
    },
  };
}

export function actionRefresh<F, R extends BaseRow>(
  data: SearchResponse<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.REFRESH,
    data: {
      resp: data,
    },
  };
}

export function actionOnSearch<F, R extends BaseRow>(
  filter: F,
  data: SearchResponse<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.SEARCH,
    data: {
      filter,
      resp: data,
    },
  };
}

export function actionSetSearchRequest<F, R extends BaseRow>(
  searchRequest: SearchRequest<F>,
  data?: SearchResponse<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.SET_SEARCH_REQUEST,
    data: {
      searchRequest: searchRequest,
      resp: data,
    },
  };
}

export function actionRemoveItems<F, R extends BaseRow>(
  data: Array<R>,
  rowId?: TableRowIdFn<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.REMOVE_ITEMS,
    data: {
      removeItems: data,
      rowId,
    },
  };
}

function reducerRemoveItems<F, R extends BaseRow>(
  state: TableState<F, R>,
  action: REDUCE_ACTION<F, R>
): TableState<F, R> {
  const removeItems = action.data?.removeItems ?? [];
  const rowId = action.data?.rowId;
  if (removeItems.length) {
    const newState = { ...state };
    removeItems.forEach((item) => {
      let _rowId;
      if (rowId) {
        _rowId = rowId(item);
      } else {
        _rowId = item.id;
      }
      newState.selects?.[_rowId] && delete newState.selects[_rowId];
    });
    return newState;
  }

  return state;
}

const getItemsSelected = <F, R>(state: TableState<F, R>) => {
  const rs: R[] = [];
  if (state.selects) {
    const keys = Object.keys(state.selects);
    for (let i = 0; i < keys.length; i += 1) {
      if (state.selects[keys[i]]) {
        rs.push(state.selects[keys[i]]);
      }
    }
  }
  return rs;
};

function reducerToggleItem<F, R extends BaseRow>(
  state: TableState<F, R>,
  action: REDUCE_ACTION<F, R>
): TableState<F, R> {
  const index = action.data?.index;
  const rowId = action.data?.rowId;

  if (index !== undefined && state.data?.rows[index]) {
    const newState = { ...state };
    if (!newState.selects) {
      newState.selects = {};
    }
    const item = state.data?.rows[index];
    let _rowId;
    if (rowId) {
      _rowId = rowId(item);
    } else {
      _rowId = item.id;
    }
    newState.selects[_rowId] = newState.selects[_rowId] ? null : item;
    if (action.data?.onChangeItems) {
      action.data.onChangeItems(getItemsSelected(newState));
    }
    return newState;
  }
  return state;
}

function reducerToggleAllNone<F, R extends BaseRow>(
  state: TableState<F, R>,
  action: REDUCE_ACTION<F, R>
): TableState<F, R> {
  const type = action.data?.selectType;
  const rowId = action.data?.rowId;
  const newState = { ...state };

  const newSelect = newState.selects || {};
  (newState.data?.rows || []).forEach((t) => {
    let _rowId;
    if (rowId) {
      _rowId = rowId(t);
    } else {
      _rowId = t.id;
    }
    newSelect[_rowId] = type === TABLE_SELECT_TYPE.ALL ? t : null;
  });
  newState.selects = newSelect;
  if (action.data?.onChangeItems) {
    action.data.onChangeItems(getItemsSelected(newState));
  }
  return newState;
}

export const tableReducer = <F, R extends BaseRow>(
  state: TableState<F, R>,
  action: REDUCE_ACTION<F, R>
): TableState<F, R> => {
  switch (action.type) {
    case ACTION.LOAD_START:
      return {
        ...state,
        state: API_STATE.LOADING,
        errors: [],
      };
    case ACTION.LOAD_SUCCESS:
      return {
        ...state,
        state: API_STATE.SUCCESS,
        data: action.data?.resp || { rows: [], count: 0 },
      };
    case ACTION.LOAD_FAIL:
      return {
        ...state,
        state: API_STATE.FAIL,
        data: null,
        errors: action.data?.errors,
      };
    case ACTION.CHANGE_PAGE:
      return {
        ...state,
        state: API_STATE.SUCCESS,
        search: { ...state.search, page: action.data?.page || 1 },
        data: action.data?.resp,
      };
    case ACTION.CHANGE_PAGE_SIZE:
      return {
        ...state,
        state: API_STATE.SUCCESS,
        search: { ...state.search, size: action.data?.size || 10, page: 1 },
        data: action.data?.resp,
      };
    case ACTION.REFRESH:
      return {
        ...state,
        state: API_STATE.SUCCESS,
        data: action.data?.resp,
      };
    case ACTION.SEARCH:
      return {
        ...state,
        state: API_STATE.SUCCESS,
        search: {
          ...state.search,
          page: 1,
          filter: action.data?.filter,
        },
        data: action.data?.resp,
      };
    case ACTION.SORT: {
      const name = action.data?.name;
      const dir = action.data?.dir;
      const isMultiSort = action.data?.isMultiSort
      const newSort = isMultiSort ? (state.search.sorts || {}) : {};
      if (name) {
        newSort[name] = dir || "";
      }
      return {
        ...state,
        state: API_STATE.SUCCESS,
        search: {
          ...state.search,
          sorts: newSort,
        },
        data: action.data?.resp,
      };
    }
    case ACTION.SET_SEARCH_REQUEST: {
      const name = action.data?.name;
      const dir = action.data?.dir;
      const newSort = state.search.sorts || {};
      if (name) {
        newSort[name] = dir || "";
      }
      return {
        ...state,
        search: {
          page: action.data?.searchRequest?.page || 1,
          size: action.data?.searchRequest?.size || 10,
          filter: action.data?.searchRequest?.filter,
          sorts: newSort,
        },
      };
    }
    case ACTION.SELECT_ITEM:
      return reducerToggleItem(state, action);
    case ACTION.SELECT_ALL_NONE:
      return reducerToggleAllNone(state, action);
    case ACTION.REMOVE_ITEMS:
      return reducerRemoveItems(state, action);
    default:
      return state;
  }
};
