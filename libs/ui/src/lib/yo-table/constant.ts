import {
  BaseRow,
  SearchRequest,
  SearchResponse,
  SORT_DIR,
  YoTableProps,
} from "./models";
import { useCallback, useMemo, useReducer } from "react";
import {
  actionOnSearch,
  actionRefresh,
  actionRemoveItems,
  actionToggleAll,
  actionToggleItem,
  changePage,
  changePageSize,
  initialTableState,
  loadFail,
  loadStart,
  loadSuccess,
  onChangeSort,
  PAGING_TYPE,
  REDUCE_ACTION,
  TABLE_SELECT_TYPE,
  tableReducer,
  TableState,
} from "./models/reducer";

export function useTable<F, ROW extends BaseRow>(props: YoTableProps<F, ROW>) {
  const { onBeforeSearch, isMultiSort = false, fetchData } = props;
  const [tableState, dispatch] = useReducer<
    (
      prevState: TableState<F, ROW>,
      action: REDUCE_ACTION<F, ROW>
    ) => TableState<F, ROW>,
    any
  >(
    tableReducer,
    {
      filter: props.initFilter,
      sorts: props.initSort,
    },
    initialTableState
  );

  const loadData = useCallback(
    (
      search: SearchRequest<F>,
      successAction?: (resp: SearchResponse<ROW>) => void,
      isTriggerOnBefore = true
    ) => {
      if (onBeforeSearch && isTriggerOnBefore) {
        onBeforeSearch(search);
      }
      dispatch(loadStart());
      return fetchData(search).then(
        (t) => {
          if (successAction) {
            successAction(t);
          }
          dispatch(loadSuccess(t));
          return t;
        },
        (err) => {
          // console.error("YoTable Load Fail: ", err);
          dispatch(loadFail(err.errors || err));
        }
      );
    },
    [onBeforeSearch, fetchData]
  );

  const onSort = useCallback(
    (name: string, sort: SORT_DIR | string) => {
      const newSort = isMultiSort ? { ...tableState.search.sorts } : {};
      newSort[name] = sort;
      const newSearch = {
        ...tableState.search,
        sorts: newSort,
      };
      loadData(newSearch, (t) => {
        dispatch(onChangeSort(name, sort, t, isMultiSort));
      }).then();
    },
    [isMultiSort, tableState.search, loadData]
  );

  const onChangePage = useCallback(
    (page: number) => {
      const newSearch = { ...tableState.search, page };
      loadData(newSearch, (t) => {
        dispatch(changePage(page, t));
      }).then();
    },
    [tableState, dispatch, loadData]
  );

  const onChangeSize = useCallback(
    (size: number) => {
      const newSearch = { ...tableState.search, size, page: 1 };
      loadData(newSearch, (t) => {
        dispatch(changePageSize(size, t));
      }).then();
    },
    [tableState, dispatch, loadData]
  );

  const isItemSelect = useCallback(
    (index: number) => {
      let rs = false;

      const item = tableState.data?.rows[index];
      if (item && tableState.selects) {
        let _rowId = item.id;
        if (props.rowId) {
          _rowId = props.rowId(item);
        }
        rs = !!tableState?.selects[_rowId];
      }
      return rs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.rowId, tableState]
  );

  const toggleItem = useCallback(
    (index: number) => {
      dispatch(actionToggleItem(index, props.rowId, props.onSelectChange));
    },
    [props.rowId, dispatch, props.onSelectChange]
  );

  const toggleAllItem = useCallback(
    (type: TABLE_SELECT_TYPE) => {
      dispatch(actionToggleAll(type, props.rowId, props.onSelectChange));
    },
    [props.onSelectChange, props.rowId, dispatch]
  );

  const removeItems = useCallback(
    (items: Array<ROW>) => {
      dispatch(actionRemoveItems(items, props.rowId));
    },
    [props.rowId, dispatch]
  );

  const onSearch = useCallback(
    (filter: F) => {
      const newSearch = {
        ...tableState.search,
        page: 1,
        filter,
      };
      loadData(newSearch, (t) => {
        dispatch(actionOnSearch(filter, t));
      }).then();
    },
    [tableState, dispatch, loadData]
  );

  const onRefresh = useCallback(() => {
    // This newSearch using in case Load More
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const size =
      tableState.pagingType === PAGING_TYPE.LOAD_MORE
        ? tableState.search.size * tableState.search.page
        : tableState.search.size;
    const page =
      tableState.pagingType === PAGING_TYPE.LOAD_MORE
        ? 1
        : tableState.search.page;
    const newSearch = {
      ...tableState.search,
      page,
      size,
    };
    loadData(
      newSearch,
      (t) => {
        dispatch(actionRefresh(t));
      },
      false
    ).then();
  }, [tableState, dispatch, loadData]);

  const selectItems = useMemo(() => {
    const rs: any[] = [];
    if (tableState.selects) {
      const keys = Object.keys(tableState.selects);
      for (let i = 0; i < keys.length; i += 1) {
        if (tableState.selects[keys[i]]) {
          rs.push(tableState.selects[keys[i]]);
        }
      }
    }
    return rs;
  }, [tableState]);

  return {
    tableState,
    selectItems,
    onRefresh,
    onSearch,
    removeItems,
    toggleAllItem,
    toggleItem,
    isItemSelect,
    onChangeSize,
    onChangePage,
    onSort,
    dispatch,
    loadData,
  };
}
