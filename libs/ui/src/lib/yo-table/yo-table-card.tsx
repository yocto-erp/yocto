import styles from "./yo-table.module.scss";
import { Spinner } from "react-bootstrap";
import {
  BaseRow,
  TABLE_COLOR_CLASS,
  PagingMode,
  YoTableCardProps,
} from "./models";
import YoTableHeader from "./yo-table-header";
import YoTableBody from "./yo-table-body";
import { useEffect } from "react";
import { ListActionProvider, ListStateProvider } from "./models/reducer";
import YoTablePaging from "./yo-table-paging";
import YoTablePageSize from "./yo-table-page-size";
import { API_STATE } from "../api";
import clsx from "clsx";
import { YoTablePagingNextPrevious } from "./yo-table-paging-next-previous";
import { Card } from "../card/Card";
import { useTable } from "./constant";

export function YoTableCard<F, ROW extends BaseRow>({
  className = "table w-100 table-sm",
  color,
  enableSelectColumn = false,
  isShowPaging = true,
  onBeforeSearch,
  isFirstLoad = true,
  isMultiSort = false,
  pagingMode = PagingMode.PAGING,
  card,
  ...props
}: YoTableCardProps<F, ROW>) {
  const { tableState, ...actionContext } = useTable(props);

  useEffect(() => {
    if (isFirstLoad) {
      actionContext.loadData(tableState.search).then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListActionProvider value={actionContext}>
      <ListStateProvider value={tableState as never}>
        <Card {...(card || {})}>
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
                  onSort={actionContext.onSort}
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
              {pagingMode === PagingMode.PAGING && (
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
              )}
              {pagingMode === PagingMode.PREVIOUS_NEXT && (
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <YoTablePagingNextPrevious />
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </ListStateProvider>
    </ListActionProvider>
  );
}

export default YoTableCard;
