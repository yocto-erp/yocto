import styles from "./yo-table.module.scss";
import { Table } from "react-bootstrap";
import {
  BaseRow,
  TableColumn,
  TableFetchDataFn,
  TableRowIdFn,
} from "./models/constants";
import YoTableHeader from "./yo-table-header";
import { FilterType, SearchRequest } from "./models/SearchRequest";
import { SORT_DIR, TableSortType } from "./models/Sort";
import YoTableBody from "./yo-table-body";
import { useCallback, useEffect, useReducer } from "react";
import {
  changePage,
  initialTableState,
  ListActionProvider,
  ListStateProvider,
  loadFail,
  loadStart,
  loadSuccess, onChangeSort,
  REDUCE_ACTION,
  tableReducer,
  TableState,
} from "./models/reducer";
import YoTablePaging from "./yo-table-paging";

export interface YoTableProps<F, ROW extends BaseRow> {
  columns: Array<TableColumn<ROW>>;
  fetchData: TableFetchDataFn<F, ROW>;
  initFilter?: FilterType;
  initSort?: TableSortType;
  rowId?: TableRowIdFn<ROW>;
}

export function YoTable<F, ROW extends BaseRow>(props: YoTableProps<F, ROW>) {
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

  return (
    <ListActionProvider value={{ onChangePage }}>
      <ListStateProvider value={tableState as never}>
        <div className={["table-responsive", styles["my-table"]].join(" ")}>
          <Table bordered size="lg">
            <thead>
              <YoTableHeader columns={props.columns} onSort={onSort} />
            </thead>
            <tbody>
              <YoTableBody columns={props.columns} rowId={props.rowId} />
            </tbody>
          </Table>
        </div>
        <YoTablePaging />
      </ListStateProvider>
    </ListActionProvider>
  );
}

export default YoTable;
