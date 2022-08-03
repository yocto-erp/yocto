import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyElement from "./form-control-select";
import { RawSelect } from "../constants";

export default {
  component: MyElement,
  title: "Form/FormControlSelect",
} as ComponentMeta<typeof MyElement>;

const options: Array<RawSelect> = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
];
const Template: ComponentStory<typeof MyElement> = (args) => {
  return <MyElement {...args} />;
};

export const FormControlSelect = Template.bind({});

FormControlSelect.args = {
  label: "Select",
  required: true,
  type: "text",
  error: "testing error",
  options,
  inputClass: "form-select-lg",
  value: options[0].value,
};
