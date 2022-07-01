import React, { useMemo } from "react";
import {
  changePage,
  useListActionContext,
  useListStateContext,
} from "./models/reducer";
import { API_STATE } from "../api/Api";
import clsx from "clsx";

const MAX = 5;

export function YoTablePaging() {
  const tableState = useListStateContext();
  const { onChangePage } = useListActionContext();

  const rs = useMemo(() => {
    let pages: Array<{ page: number; type: number }> = [];
    if (tableState.state === API_STATE.SUCCESS) {
      const total = tableState.data?.count || 0;
      const totalPages = Math.ceil(total / tableState.search.size);
      const currentPage = tableState.search.page;

      let start = 0;
      let end = totalPages;

      pages.length = 0;
      for (let i = 1; i <= end; i += 1) {
        pages.push({ page: i, type: 0 });
      }

      if (totalPages > MAX) {
        const leftOffset = Math.floor(MAX / 2);
        const rightOffset = MAX % 2 === 0 ? leftOffset - 1 : leftOffset;

        if (tableState.search.page <= leftOffset) {
          // very beginning, no rotation -> [0..maxSize]
          end = MAX;
        } else if (totalPages - currentPage < leftOffset) {
          // very end, no rotation -> [len-maxSize..len]
          start = totalPages - MAX;
        } else {
          // rotate
          start = currentPage - leftOffset - 1;
          end = currentPage + rightOffset;
        }

        pages = pages.slice(start, end);

        if (start > 0) {
          // The first page will always be included. If the displayed range
          // starts after the third page, then add ellipsis. But if the range
          // starts on the third page, then add the second page instead of
          // an ellipsis, because the ellipsis would only hide a single page.
          if (start > 2) {
            pages.unshift({ type: -1, page: start - 1 });
          } else if (start === 2) {
            pages.unshift({ page: 2, type: 0 });
          }
          pages.unshift({ page: 1, type: 0 });
        }

        if (end < totalPages) {
          // The last page will always be included. If the displayed range
          // ends before the third-last page, then add ellipsis. But if the range
          // ends on third-last page, then add the second-last page instead of
          // an ellipsis, because the ellipsis would only hide a single page.
          if (end < totalPages - 2) {
            pages.push({ type: -1, page: totalPages - 2 });
          } else if (end === totalPages - 2) {
            pages.push({ page: totalPages - 1, type: 0 });
          }
          pages.push({ page: totalPages, type: 0 });
        }
      }
    }
    console.log(pages);
    return pages;
  }, [tableState]);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination mb-0">
        {rs.map((item) => (
          <li
            className={clsx("page-item", {
              active: item.page === tableState.search.page,
            })}
            key={item.page}
          >
            {item.type === -1 ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <button className="page-link btn-link">...</button>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <button
                className="page-link btn-link"
                onClick={() => onChangePage(item.page)}
              >
                {item.page}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default YoTablePaging;
