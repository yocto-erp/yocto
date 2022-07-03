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
  actionOnSearch, actionRefresh,
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
}

export function YoTable<F, ROW extends BaseRow>({
  className = "table w-100 table-sm",
  color,
  enableSelectColumn = false,
  ...props
}: YoTableProps<F, ROW>) {
  const [tableState, dispatch] = useReducer<
    (
      prevState: TableState<F, ROW>,
      action: REDUCE_ACTION<F, ROW>
    ) => TableState<F, ROW>,
    any
  >(tableReducer, null, initialTableState);

  const loadData = useCallback(
    (search: SearchRequest<F>) => {
      props.fetchData(search).then(
        (t) => dispatch(loadSuccess(t)),
        (err) => {
          console.error(err);
          dispatch(loadFail(err.errors));
        }
      );
    },
    [dispatch, props.fetchData]
  );

  useEffect(() => {
    dispatch(loadStart());
    loadData(tableState.search);
  }, []);

  const onSort = useCallback(
    (name: string, sort: SORT_DIR | string) => {
      const newSearch = {
        ...tableState.search,
        sorts: {
          ...tableState.search.sorts,
          [name]: sort,
        },
      };
      dispatch(loadStart());
      props.fetchData(newSearch).then(
        (t) => {
          dispatch(onChangeSort(name, sort, t));
        },
        (err) => {
          dispatch(loadFail(err.errors));
        }
      );
    },
    [tableState, dispatch, props.fetchData]
  );

  const onChangePage = useCallback(
    (page: number) => {
      const newSearch = { ...tableState.search, page };
      dispatch(loadStart());
      props.fetchData(newSearch).then(
        (t) => {
          dispatch(changePage(page, t));
        },
        (err) => {
          dispatch(loadFail(err.errors));
        }
      );
    },
    [tableState, dispatch, props.fetchData]
  );

  const onChangeSize = useCallback(
    (size: number) => {
      const newSearch = { ...tableState.search, size, page: 1 };
      dispatch(loadStart());
      props.fetchData(newSearch).then(
        (t) => {
          dispatch(changePageSize(size, t));
        },
        (err: any) => {
          dispatch(loadFail(err.errors));
        }
      );
    },
    [tableState, dispatch, props.fetchData]
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
    [props.rowId, tableState]
  );

  const toggleItem = useCallback(
    (index: number) => {
      dispatch(actionToggleItem(index, props.rowId));
    },
    [props.rowId, dispatch]
  );

  const toggleAllItem = useCallback(
    (type: TABLE_SELECT_TYPE) => {
      dispatch(actionToggleAll(type, props.rowId));
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
      dispatch(loadStart());
      props.fetchData(newSearch).then(
        (t) => {
          dispatch(actionOnSearch(filter, t));
        },
        (err: any) => {
          dispatch(loadFail(err.errors));
        }
      );
    },
    [tableState, dispatch, props.fetchData]
  );

  const onRefresh = useCallback(
    () => {
      const newSearch = {
        ...tableState.search,
        page: 1,
        size: tableState.data?.count || tableState.search.size,
      };
      dispatch(loadStart());
      props.fetchData(newSearch).then(
        (t) => {
          dispatch(actionRefresh(t));
        },
        (err: any) => {
          dispatch(loadFail(err.errors));
        }
      );
    },
    [tableState, dispatch, props.fetchData]
  );

  const actionContext = useMemo(
    () => ({
      onSort,
      onChangePage,
      onChangeSize,
      isItemSelect,
      toggleItem,
      toggleAllItem, onSearch, onRefresh
    }),
    [
      onSort,
      onChangePage,
      onChangeSize,
      isItemSelect,
      toggleItem,
      toggleAllItem, onSearch, onRefresh
    ]
  );

  return (
    <ListActionProvider
      value={actionContext}
    >
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
        <div className={["table-responsive", styles["my-table"]].join(" ")}>
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
        <div className="w-100">
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
      </ListStateProvider>
    </ListActionProvider>
  );
}

export default YoTable;
