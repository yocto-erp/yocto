import {
  TableColumn,
  TableColumnOnSortFn,
  TableHeaderOnSelectAllFn,
} from './models/constants';
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { isString } from 'lodash';
import {SORT_DIR, TableSortType} from "./models/Sort";

export interface YoTableHeaderProps<ROW> {
  onSort?: TableColumnOnSortFn;
  columns: Array<TableColumn<ROW>>;
  sorts?: TableSortType;
  enableSelectColumn?: boolean;
  onSelectAll?: TableHeaderOnSelectAllFn;
}

const SORT_ORDER = [SORT_DIR.ASC, SORT_DIR.DESC, null];

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
  sorts,
  onSort,
  columns,
  onSelectAll,
  enableSelectColumn,
}: YoTableHeaderProps<ROW>) {
  const onSortClick = React.useCallback(
    (name: string) => {
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
    [onSort, sorts]
  );

  const getSortProps = React.useCallback(
    (col: TableColumn<ROW>) => {
      const rs = {
        onClick: () => {
          console.log('Implement');
        },
        className: '',
      };
      const className = [col.class];
      if (col.sort) {
        const colDir = isString(col.sort) ? col.sort : col.data;
        const colSortDir =
          sorts && sorts[colDir] && sorts[colDir] !== null
            ? `${sorts[colDir]}`
            : '';
        className.push(`sorting ${colSortDir}`);
        rs.onClick = () => onSortClick(colDir);
      }
      rs.className = className.join(' ');

      return rs;
    },
    [onSortClick, sorts]
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
            style={{ padding: '2px' }}
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
            style={{ padding: '2px' }}
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
