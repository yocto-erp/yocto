import { ComponentStory, ComponentMeta } from '@storybook/react';
import { YoTable } from './yo-table';

export default {
  component: YoTable,
  title: 'YoTable',
} as ComponentMeta<typeof YoTable>;

const Template: ComponentStory<typeof YoTable> = (args) => (
  <YoTable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
