import { TableColumn, TableHeaderOnSelectAllFn } from "./models/constants";
import React  from "react";
import { isString } from "lodash";
import { SORT_DIR } from "./models/Sort";
import {
  TABLE_SELECT_TYPE,
  useListActionContext,
  useListStateContext,
} from "./models/reducer";
import { API_STATE } from "../api";

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
 * @param enableSelectColumn: Enable Column for select item
 * @constructor
 */
export function YoTableHeader<ROW>({
  columns,
  enableSelectColumn,
}: YoTableHeaderProps<ROW>) {
  const tableState = useListStateContext();
  const { onSort } = useListActionContext();

  const onSortClick = React.useCallback(
    (name: string) => {
      console.log(name);
      if (tableState.state === API_STATE.LOADING) return;
      const sorts = tableState.search.sorts;
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
      const sorts = tableState.search.sorts;
      const rs = {
        onClick: () => {
          console.log("Implement");
        },
        className: "",
        isSort: !!col.sort,
        dir: "",
      };
      const className = [""];
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
        rs.dir = colSortDir;
        className.push(`sorting`);
        rs.onClick = () => onSortClick(colDir);
      }
      rs.className = className.join(" ");

      return rs;
    },
    [onSortClick, tableState]
  );

  const { toggleAllItem } = useListActionContext();

  return (
    <tr>
      {enableSelectColumn ? (
        <th className="min text-center">
          Select
          <br />
          <button
            type="button"
            className="btn btn-link text-success btn-sm"
            style={{ padding: "2px" }}
            onClick={() => toggleAllItem(TABLE_SELECT_TYPE.ALL)}
          >
            ALL
          </button>
          |
          <button
            type="button"
            color="link"
            className="btn text-danger btn-link btn-sm"
            style={{ padding: "2px" }}
            onClick={() => toggleAllItem(TABLE_SELECT_TYPE.NONE)}
          >
            NONE
          </button>
        </th>
      ) : null}
      {columns.map((item) => {
        if (!item.isShow || item.isShow()) {
          const sortProps = getSortProps(item);
          return (
            <th
              key={item.data}
              onClick={sortProps.onClick}
              className={sortProps.className}
              style={item.width ? { width: item.width } : {}}
            >
              {item.header}
              {sortProps.isSort && (
                <>
                  {sortProps.dir === SORT_DIR.DESC && (
                    <i className="bi bi-arrow-down" />
                  )}
                  {sortProps.dir === SORT_DIR.ASC && (
                    <i className="bi bi-arrow-up" />
                  )}
                  {sortProps.dir === "" && (
                    <i className="bi bi-arrow-down-up" />
                  )}
                </>
              )}
            </th>
          );
        }
        return null;
      })}
    </tr>
  );
}

export default YoTableHeader;
