import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormRow } from "./form-row";

export default {
  component: FormRow,
  title: "Form/FormRow",
} as ComponentMeta<typeof FormRow>;

const Template: ComponentStory<typeof FormRow> = (args) => (
  <FormRow {...args}>
    <input className="form-control" type="text"/>
  </FormRow>
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Test",
  labelCol: 2,
  valueCol: 8
};
