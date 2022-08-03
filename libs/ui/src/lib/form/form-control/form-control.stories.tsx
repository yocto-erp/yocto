import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyFormControl from "./form-control";

export default {
  component: MyFormControl,
  title: "Form/FormControl",
} as ComponentMeta<typeof MyFormControl>;

const Template: ComponentStory<typeof MyFormControl> = (args) => (
  <MyFormControl {...args}>
    <input className="form-control form-control-sm" type="text"/>
  </MyFormControl>
);

export const FormControl = Template.bind({});
FormControl.args = {
  label: "Test",
  required: false
};
