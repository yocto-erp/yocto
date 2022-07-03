import {ComponentStory, ComponentMeta} from '@storybook/react';
import {YoTable, YoTableProps} from './yo-table';
import {BaseRow, SORT_DIR} from "./models";
import {ApiError} from "../api";

export default {
  component: YoTable,
  title: 'YoTable',
} as ComponentMeta<typeof YoTable>;

interface ROW extends BaseRow {
  name: string;
  phone: string;
}

interface FILTER {
  name: string
}


const props: YoTableProps<FILTER, ROW> = {
  columns: [
    {header: 'ID', data: 'id', sort: true},
    {header: 'Name', data: 'name', sort: true},
  ],
  fetchData: (req) => new Promise((res, rej) => {
    console.log('fetchData', req)
    const data: ROW[] = [];
    for (let i = 0; i < req.size; i += 1) {
      const index = (req.page - 1) * req.size;
      if (index + i < 100) {
        data.push({
          id: index + (req?.sorts?.['id'] === SORT_DIR.DESC ? (req.size - i) : i),
          name: "Le Phuoc Canh " + index,
          phone: `8493813068${index}`
        })
      }
    }
    /*
    rej({
      errors: [
        {code: "test", message: "testing error message"},
        {code: "test", message: "testing error message1"}
      ] as ApiError[]
    })
     */
    setTimeout(() => res({
      count: 100,
      rows: data
    }), 1000)

  })
};

const Template: ComponentStory<typeof YoTable<FILTER, ROW>> = (args) => (
  <YoTable {...args}/>
);

export const Primary = Template.bind({});
Primary.args = {
  columns: props.columns,
  fetchData: props.fetchData,
  enableSelectColumn: true,
  rowId: (row) => `abc${row.id}`
};
