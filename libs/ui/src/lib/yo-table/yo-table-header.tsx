import {
  TableColumn,
  TableHeaderOnSelectAllFn,
} from "./models/constants";
import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { isString } from "lodash";
import { SORT_DIR } from "./models/Sort";
import {useListStateContext} from "./models/reducer";

export interface YoTableHeaderProps<ROW> {
  onSort?: (name: string, sort: SORT_DIR | string) => void;
  columns: Array<TableColumn<ROW>>;
  enableSelectColumn?: boolean;
  onSelectAll?: TableHeaderOnSelectAllFn;
}

const SORT_ORDER = [SORT_DIR.ASC, SORT_DIR.DESC, ""];

/**
 *
 * @param sorts: Current Sorts List
 * @param onSort: On Sort Colum
 * @param columns: List of define columns
 * @param onSelectAll: On Select All
 * @param enableSelectColumn: Enable Column for select item
 * @constructor
 */
export function YoTableHeader<ROW>({
  onSort,
  columns,
  onSelectAll,
  enableSelectColumn,
}: YoTableHeaderProps<ROW>) {
  const tableState = useListStateContext()
  const onSortClick = React.useCallback(
    (name: string) => {
      console.log(name)
      const sorts = tableState.search.sorts
      if (onSort && sorts) {
        const currentDir = sorts && sorts[name];
        let dirIndex = SORT_ORDER.indexOf(currentDir);
        if (dirIndex < 2) {
          dirIndex += 1;
        } else {
          dirIndex = 0;
        }

        onSort(name, SORT_ORDER[dirIndex]);
      }
    },
    [onSort, tableState]
  );

  const getSortProps = React.useCallback(
    (col: TableColumn<ROW>) => {
      const sorts = tableState.search.sorts
      const rs = {
        onClick: () => {
          console.log("Implement");
        },
        className: "",
      };
      const className = [];
      if (col.class) {
        className.push(col.class);
      }
      if (col.sort) {
        const colDir = isString(col.sort) ? col.sort : col.data;
        const colSortDir =
          sorts && sorts[colDir] && sorts[colDir] !== null
            ? `${sorts[colDir]}`
            : "";
        if (colSortDir) {
          className.push(colSortDir);
        }
        className.push(`sorting`);
        rs.onClick = () => onSortClick(colDir);
      }
      rs.className = className.join(" ");

      return rs;
    },
    [onSortClick, tableState]
  );

  const _onSelectAll = useCallback(
    (isSelected: boolean) => {
      if (onSelectAll) {
        onSelectAll(isSelected);
      }
    },
    [onSelectAll]
  );

  return (
    <tr>
      {enableSelectColumn ? (
        <th className="min text-center">
          Select
          <br />
          <Button
            type="button"
            color="link"
            size="sm"
            className="text-success"
            style={{ padding: "2px" }}
            onClick={() => _onSelectAll(true)}
          >
            ALL
          </Button>
          |
          <Button
            type="button"
            color="link"
            size="sm"
            className="text-danger"
            style={{ padding: "2px" }}
            onClick={() => _onSelectAll(false)}
          >
            None
          </Button>
        </th>
      ) : null}
      {columns.map((item) => {
        if (!item.isShow || item.isShow()) {
          return (
            <th
              key={item.data}
              {...getSortProps(item)}
              style={item.width ? { width: item.width } : {}}
            >
              {item.header}
            </th>
          );
        }
        return null;
      })}
    </tr>
  );
}

export default YoTableHeader;
