import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyElement from "./form-row";

export default {
  component: MyElement,
  title: "Form/FormRow",
} as ComponentMeta<typeof MyElement>;

const Template: ComponentStory<typeof MyElement> = (args) => (
  <MyElement {...args}>
    <input className="form-control" type="text" />
  </MyElement>
);

export const FormRow = Template.bind({});
FormRow.args = {
  label: "Test",
  labelCol: 2,
  valueCol: 8,
};
