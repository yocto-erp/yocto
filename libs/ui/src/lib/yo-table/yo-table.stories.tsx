import {ComponentStory, ComponentMeta} from '@storybook/react';
import {YoTable, YoTableProps} from './yo-table';

export default {
  component: YoTable,
  title: 'YoTable',
} as ComponentMeta<typeof YoTable>;

const props: YoTableProps<ROW> = {
  columns: [
    {header: 'ID', data: 'id', sort: true},
    {header: 'Name', data: 'name', sort: true},
  ],
  fetchData: (req) => new Promise(res => res({
    count: 3, rows: [
      {id: 1, name: "Le Phuoc Canh", phone: "84938130683"},
      {id: 2, name: "Le Phuoc Canh 1", phone: "84938130684"},
      {id: 3, name: "Le Phuoc Canh 2", phone: "84938130685"}
    ]
  }))
};

const Template: ComponentStory<typeof YoTable<ROW>> = (args) => (
  <YoTable {...args} />
);

interface ROW {
  id: number;
  name: string;
  phone: string;
}

export const Primary = Template.bind({});
Primary.args = {
  columns: props.columns,
  fetchData: props.fetchData,
  rowId: (row) => `abc${row.id}`
};
