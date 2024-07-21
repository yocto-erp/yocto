import styles from "./yo-table.module.scss";
import { Spinner } from "react-bootstrap";
import {
  BaseRow,
  TABLE_COLOR,
  TABLE_COLOR_CLASS,
  TableColumn,
  TableFetchDataFn,
  TableRowIdFn,
  FilterType,
  SearchRequest,
  SORT_DIR,
  TableSortType,
  SearchResponse,
} from "./models";
import YoTableHeader from "./yo-table-header";
import YoTableBody from "./yo-table-body";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  changePage,
  changePageSize,
  initialTableState,
  ListActionProvider,
  ListStateProvider,
  loadFail,
  loadStart,
  loadSuccess,
  onChangeSort,
  REDUCE_ACTION,
  actionToggleAll,
  TABLE_SELECT_TYPE,
  tableReducer,
  TableState,
  actionToggleItem,
  actionOnSearch,
  actionRefresh,
  actionRemoveItems,
  PAGING_TYPE,
} from "./models/reducer";
import YoTablePaging from "./yo-table-paging";
import YoTablePageSize from "./yo-table-page-size";
import { API_STATE } from "../api";
import clsx from "clsx";

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
}

export function YoTable<F, ROW extends BaseRow>({
  className = "table w-100 table-sm",
  color,
  enableSelectColumn = false,
  isShowPaging = true,
  onBeforeSearch,
  isFirstLoad = true,
  ...props
}: YoTableProps<F, ROW>) {
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
      return props.fetchData(search).then(
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
    [onBeforeSearch, props]
  );

  const onSort = useCallback(
    (name: string, sort: SORT_DIR | string) => {
      const newSearch = {
        ...tableState.search,
        sorts: {
          ...tableState.search.sorts,
          [name]: sort,
        },
      };
      loadData(newSearch, (t) => {
        dispatch(onChangeSort(name, sort, t));
      });
    },
    [tableState, dispatch, loadData]
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
    const page = tableState.pagingType === PAGING_TYPE.LOAD_MORE
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

  const actionContext = useMemo(
    () => ({
      onSort,
      onChangePage,
      onChangeSize,
      isItemSelect,
      toggleItem,
      toggleAllItem,
      onSearch,
      onRefresh,
      selectItems,
      removeItems,
      loadData,
      dispatch,
    }),
    [
      onSort,
      onChangePage,
      onChangeSize,
      isItemSelect,
      toggleItem,
      toggleAllItem,
      onSearch,
      onRefresh,
      selectItems,
      removeItems,
      loadData,
      dispatch,
    ]
  );

  /*
  useEffect(() => {
    if (props.onSelectChange) {
      props.onSelectChange(selectItems);
    }
  }, [selectItems, props]); */

  useEffect(() => {
    if (isFirstLoad) {
      loadData(tableState.search).then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListActionProvider value={actionContext}>
      <ListStateProvider value={tableState as never}>
        {props.children}
        {tableState.state === API_STATE.FAIL && (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <ul className="mb-0">
              {(tableState.errors || []).map((t) => (
                <li key={`${t.code}-${t.message}`}>{t.message}</li>
              ))}
            </ul>
          </div>
        )}
        <div
          className={clsx(
            "table-responsive",
            styles["my-table"],
            props.wrapperClass
          )}
        >
          <table
            className={clsx(
              className,
              color ? TABLE_COLOR_CLASS[color].table : ""
            )}
          >
            <thead className={color ? TABLE_COLOR_CLASS[color].header : ""}>
              <YoTableHeader
                columns={props.columns}
                onSort={onSort}
                enableSelectColumn={enableSelectColumn}
              />
            </thead>
            <tbody>
              <YoTableBody
                columns={props.columns}
                rowId={props.rowId}
                enableSelectColumn={enableSelectColumn}
              />
            </tbody>
          </table>
        </div>
        {isShowPaging && (
          <div className="w-100 mt-2">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="mb-2 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
                  <YoTablePageSize />
                  Total: {tableState.data?.count || 0}
                  {tableState.state === API_STATE.LOADING ? (
                    <Spinner
                      size="sm"
                      variant={color}
                      className="ms-2 ml-auto"
                      animation={"grow"}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <YoTablePaging />
              </div>
            </div>
          </div>
        )}
      </ListStateProvider>
    </ListActionProvider>
  );
}

export default YoTable;
