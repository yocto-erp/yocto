import {ComponentStory, ComponentMeta} from '@storybook/react';
import {BaseRow, PagingMode, SORT_DIR, YoTableCardProps} from "./models";
import {YoTableBody} from "./yo-table-body"
import {YoTableHeader} from "./yo-table-header"
import {YoTablePageSize} from "./yo-table-page-size"
import {YoTablePaging} from "./yo-table-paging"
import YoTableCard from "./yo-table-card";

export default {
  component: YoTableCard,
  title: 'Table/YoTableCard',
  subcomponents: {
    YoTableBody, YoTableHeader, YoTablePageSize, YoTablePaging
  }
} as ComponentMeta<typeof YoTableCard>;

interface ROW extends BaseRow {
  name: string;
  phone: string;
}

interface FILTER {
  name: string
}

const totalRow = 10000
const props: YoTableCardProps<FILTER, ROW> = {
  columns: [
    {header: 'ID', data: 'id', sort: true, render: (row, i, globalIndex) => (globalIndex || 0) + 1},
    {header: 'Name', data: 'name', sort: true},
    {header: 'Age', data: 'age', sort: true, group: "info"},
    {header: 'Birthday', data: 'birthday', sort: true, group: "info"},
    {header: 'Phone', data: 'phone', sort: true, group: "info"},
  ],
  card: {
    title: "Testing card"
  },
  fetchData: (req) => new Promise((res, rej) => {
    console.log('fetchData', req)
    const data: ROW[] = [];
    for (let i = 0; i < req.size; i += 1) {
      const index = (req.page - 1) * req.size;
      if (index + i < totalRow) {
        data.push({
          id: index + (req?.sorts?.['id'] === SORT_DIR.DESC ? (req.size - i) : i),
          name: "Le Phuoc Canh " + index,
          phone: `8493813068${i}`,
          age: i,
          birthday: `birthday${i}`
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
      count: totalRow,
      rows: data
    }), 1000)

  })
};

const Template: ComponentStory<typeof YoTableCard<FILTER, ROW>> = (args) => (
  <YoTableCard {...args}/>
);

export const Primary = Template.bind({});
Primary.args = {
  columns: props.columns,
  fetchData: props.fetchData,
  enableSelectColumn: true,
  isMultiSort: true,
  card: props.card,
  rowId: (row) => `abc${row.id}`,
  isShowPaging: true,
  pagingMode: PagingMode.PAGING,
  initSort: {"id": SORT_DIR.DESC}
};
