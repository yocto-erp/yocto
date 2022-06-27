import styles from './yo-table.module.scss';
import { Table } from 'react-bootstrap';

/* eslint-disable-next-line */
export interface YoTableProps {}

export function YoTable(props: YoTableProps) {
  return (
    <div className={['table-responsive', styles['my-table']].join(' ')}>
      <Table bordered size="lg">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Le</td>
            <td>Canh</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default YoTable;
