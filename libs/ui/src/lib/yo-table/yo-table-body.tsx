import {
  BaseRow,
  TableBodyOnSelectItemFn,
  TableColumn,
  TableColumnOnSortFn,
  TableRowIdFn,
} from "./models/constants";
import React, { useCallback } from "react";
import { isFunction } from "lodash";
import clsx from "clsx";
import { useListStateContext } from "./models/reducer";
import {SORT_DIR} from "./models/Sort";

export interface YoTableBodyProps<ROW extends BaseRow> {
  rowId?: TableRowIdFn<ROW>;
  onSort?: (name: string, sort: SORT_DIR | null) => void;
  columns: Array<TableColumn<ROW>>;
  enableSelectColumn?: boolean;
  selectedList?: Record<string, never>;
  onItemSelect?: TableBodyOnSelectItemFn<ROW>;
}

/**
 *
 * @param sorts: Current Sorts List
 * @param onSort: On Sort Colum
 * @param columns: List of define columns
 * @param enableSelectColumn: Enable Column for select item
 * @constructor
 */
export function YoTableBody<ROW extends BaseRow>({
  rowId,
  onSort,
  columns,
  onItemSelect,
  selectedList,
  enableSelectColumn,
}: YoTableBodyProps<ROW>) {
  const _rowId = useCallback(
    (row: ROW) => {
      if (isFunction(rowId)) {
        return rowId(row);
      }
      return String(row["id"]);
    },
    [rowId]
  );
  const { data } = useListStateContext();
  return (
    <>
      {(data?.rows || []).map((row) => (
        <tr key={_rowId(row)} id={`ROW_${_rowId(row)}`}>
          {enableSelectColumn ? (
            <td className="min text-center">
              <div className="form-check">
                <input
                  className="form-check-input position-static"
                  type="checkbox"
                  id={_rowId(row)}
                  value="1"
                  aria-label="..."
                  defaultChecked={
                    selectedList && selectedList[`item${String(_rowId(row))}`]
                  }
                  checked={
                    !!(selectedList && selectedList[`item${_rowId(row)}`])
                  }
                  onChange={() => isFunction(onItemSelect) && onItemSelect(row)}
                />
              </div>
            </td>
          ) : null}
          {columns.map((item) => {
            if (!item.isShow || item.isShow()) {
              return (
                <td
                  key={item.data}
                  style={
                    item.width
                      ? { width: item.width ? `${item.width}` : "inherit" }
                      : {}
                  }
                  className={clsx(item.class)}
                >
                  {item.render ? item.render(row) : row[`${item.data}`]}
                </td>
              );
            }
            return null;
          })}
        </tr>
      ))}
    </>
  );
}

export default YoTableBody;
