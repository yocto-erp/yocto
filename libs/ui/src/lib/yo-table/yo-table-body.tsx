import {
  BaseRow,
  TableColumn,
  TableRowIdFn,
} from "./models/constants";
import React, { useCallback } from "react";
import { isFunction } from "lodash";
import clsx from "clsx";
import {useListActionContext, useListStateContext} from "./models/reducer";

export interface YoTableBodyProps<ROW extends BaseRow> {
  rowId?: TableRowIdFn<ROW>;
  columns: Array<TableColumn<ROW>>;
  enableSelectColumn?: boolean;
}

/**
 *
 * @param rowId: function for generateID base on ROW
 * @param columns: List of define columns
 * @param enableSelectColumn: Enable Column for select item
 * @constructor
 */
export function YoTableBody<ROW extends BaseRow>({
  rowId,
  columns,
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
  const { isItemSelect, toggleItem } = useListActionContext();
  return (
    <>
      {(data?.rows || []).map((row, index) => (
        <tr key={_rowId(row)} id={`ROW_${_rowId(row)}`}>
          {enableSelectColumn ? (
            <td className="min text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={_rowId(row)}
                  value="1"
                  aria-label="..."
                  defaultChecked={
                    isItemSelect(index)
                  }
                  checked={
                    isItemSelect(index)
                  }
                  onChange={() => toggleItem(index)}
                />
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
