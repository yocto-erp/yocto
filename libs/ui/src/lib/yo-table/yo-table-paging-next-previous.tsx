import React from "react";
import { useListActionContext, useListStateContext } from "./models/reducer";
import { API_STATE } from "../api/Api";
import clsx from "clsx";

export function YoTablePagingNextPrevious() {
  const tableState = useListStateContext();
  const { onChangePage } = useListActionContext();

  const isLoading = tableState.state === API_STATE.LOADING;
  const isNextDisabled =
    (tableState.data?.rows?.length || 0) < tableState.search.size;

  return (
    <nav aria-label="Page navigation" className="mb-2 mb-md-0">
      <ul className="pagination mb-0 pagination-sm justify-content-center">
        <li
          className={clsx("page-item", {
            disabled: tableState.search.page === 1,
          })}
          key="previous"
        >
          <button
            className="page-link btn-link btm-sm"
            disabled={isLoading || tableState.search.page === 1}
            onClick={() => onChangePage(tableState.search.page - 1)}
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>
        <li
          className={clsx("page-item active", { disabled: isLoading })}
          key={tableState.search.page}
        >
          <button
            className="page-link btn-link btm-sm"
            style={{ minWidth: "2.2rem" }}
            disabled
          >
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}
            {!isLoading && tableState.search.page}
          </button>
        </li>
        <li
          className={clsx("page-item", {
            disabled: isNextDisabled,
          })}
          key="next"
        >
          <button
            className="page-link btn-link btm-sm"
            disabled={isLoading || isNextDisabled}
            onClick={() => onChangePage(tableState.search.page + 1)}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
