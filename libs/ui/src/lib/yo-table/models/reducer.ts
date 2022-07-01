import { createContext, useContext } from "react";
import { SearchRequest } from "./SearchRequest";
import { SORT_DIR, TableSortType } from "./Sort";
import { SearchResponse } from "./SearchResponse";
import { API_STATE, ApiError } from "../../api/Api";

const ListActionContext = createContext({
  onChangePage: (page: number) => console.log("onChangePage"),
});
const ListStateContext = createContext({} as TableState<never, never>);

export function useListActionContext() {
  return useContext(ListActionContext);
}

export function useListStateContext() {
  return useContext(ListStateContext);
}

export const ListActionProvider = ListActionContext.Provider;
export const ListStateProvider = ListStateContext.Provider;

enum ACTION {
  SEARCH = "SEARCH",
  REFRESH = "REFRESH",
  CHANGE_PAGE_SIZE = "CHANGE_PAGE_SIZE",
  CHANGE_PAGE = "CHANGE_PAGE",
  SORT = "SORT",
  LOAD_START = "LOAD_START",
  LOAD_SUCCESS = "LOAD_SUCCESS",
  LOAD_FAIL = "LOAD_FAIL",
}

export interface REDUCE_ACTION<F, ROW> {
  type: ACTION;
  data?: {
    resp?: SearchResponse<ROW>;
    filter?: F;
    errors?: Array<ApiError>;
    page?: number;
    size?: number;
    name?: string;
    dir?: SORT_DIR | string;
  };
}

const LIST_PAGE_SIZE = [10, 50, 100];

export interface TableState<F, R> {
  state: API_STATE;
  errors?: Array<ApiError>;
  search: SearchRequest<F>;
  data?: SearchResponse<R> | null;
}

export function initialTableState<F, R>(
  filter?: F,
  sorts?: TableSortType
): TableState<F, R> {
  return {
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

export function onChangeSort<F, ROW>(
  name: string,
  value: SORT_DIR | string,
  resp: SearchResponse<ROW>
): REDUCE_ACTION<F, ROW> {
  return {
    type: ACTION.SORT,
    data: {
      name,
      dir: value,
      resp,
    },
  };
}

export function loadStart<F, ROW>(): REDUCE_ACTION<F, ROW> {
  return {
    type: ACTION.LOAD_START,
  };
}

export function loadSuccess<F, R>(
  data: SearchResponse<R>
): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.LOAD_SUCCESS,
    data: {
      resp: data,
    },
  };
}

export function loadFail<F, R>(data: Array<ApiError>): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.LOAD_START,
    data: {
      errors: data,
    },
  };
}

export function changePage<F, R>(
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

export function changePageSize<F, R>(size: number): REDUCE_ACTION<F, R> {
  return {
    type: ACTION.CHANGE_PAGE_SIZE,
    data: {
      size,
    },
  };
}

export function refresh<R>(data: SearchResponse<R>) {
  return {
    action: ACTION.REFRESH,
    data,
  };
}

export const tableReducer = <F, R>(
  state: TableState<F, R>,
  action: REDUCE_ACTION<F, R>
): TableState<F, R> => {
  console.log(action);
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
        search: { ...state.search, size: action.data?.size || 10 },
      };
    case ACTION.REFRESH:
      return {
        ...state,
        data: action.data?.resp,
      };
    case ACTION.SEARCH:
      return {
        ...state,
        search: {
          ...state.search,
          filter: action.data?.filter,
        },
      };
    case ACTION.SORT:
      // eslint-disable-next-line no-case-declarations
      const name = action.data?.name;
      // eslint-disable-next-line no-case-declarations
      const dir = action.data?.dir;
      if (name) {
        return {
          ...state,
          search: {
            ...state.search,
            sorts: {
              ...state.search.sorts,
              [name]: dir || "",
            },
          },
          data: action.data?.resp,
        };
      }
      return state;
  }
};
