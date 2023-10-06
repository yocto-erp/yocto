import { BaseRow, TableColumn, TableRowIdFn, useListActionContext, useListStateContext } from "./models";
import React, { useCallback, useMemo } from "react";
import { isFunction } from "lodash";
import clsx from "clsx";
import { API_STATE } from "../api";

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
  const { data, state } = useListStateContext();
  const { isItemSelect, toggleItem } = useListActionContext();

  const totalColumn = useMemo(() => {
    let total = enableSelectColumn ? 1 : 0;
    for (let i = 0; i < columns.length; i += 1) {
      const { isShow } = columns[i];
      if (!isShow || isShow()) {
        total += 1;
      }
    }
    // console.log(rs);
    return total;
  }, [columns, enableSelectColumn]);

  if (!data) {
    return null;
  }

  if (data.rows.length === 0 && state === API_STATE.SUCCESS) {
    return (
      <tr>
        <td colSpan={totalColumn} className={"text-center"}>
          <span className={"text-danger"}>No records</span>
        </td>
      </tr>
    );
  }

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
                checked={isItemSelect(index)}
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
