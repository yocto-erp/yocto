import styles from './yo-table.module.scss';
import { Table } from 'react-bootstrap';
import {BaseRow, TableColumn, TableFetchDataFn, TableRowIdFn} from './models/constants';
import YoTableHeader from './yo-table-header';
import { FilterType } from './models/SearchRequest';
import { TableSortType } from './models/Sort';
import YoTableBody from './yo-table-body';
import { useEffect, useState } from 'react';

export interface YoTableProps<ROW extends BaseRow> {
  columns: Array<TableColumn<ROW>>;
  fetchData: TableFetchDataFn<ROW>;
  initFilter?: FilterType;
  initSort?: TableSortType;
  rowId?: TableRowIdFn<ROW>;
}

export function YoTable<ROW extends BaseRow>(props: YoTableProps<ROW>) {
  const [data, setData] = useState<{
    count: number;
    rows: Array<ROW>;
  }>({
    count: 0,
    rows: [],
  });

  useEffect(() => {
    props
      .fetchData({
        page: 1,
        size: 10,
      })
      .then((t) =>
        setData({
          count: t.count,
          rows: t.rows,
        })
      );
  }, [props.fetchData]);

  return (
    <div className={['table-responsive', styles['my-table']].join(' ')}>
      <Table bordered size="lg">
        <thead>
          <YoTableHeader columns={props.columns} />
        </thead>
        <tbody>
          <YoTableBody columns={props.columns} rows={data.rows} rowId={props.rowId}/>
        </tbody>
      </Table>
    </div>
  );
}

export default YoTable;
