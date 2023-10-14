import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyElement from "./form-row-input";
import { FORM_ROW_SIZE } from "../constants";

export default {
  component: MyElement,
  title: "Form/FormRowInput",
} as ComponentMeta<typeof MyElement>;

const Template: ComponentStory<typeof MyElement> = (args) => {
  return <MyElement {...args} />;
};

export const FormRowInput = Template.bind({});

FormRowInput.args = {
  label: "Test",
  labelCol: 3,
  valueCol: 9,
  required: true,
  type: "text",
  error: "testing error",
  value: "124",
  size: FORM_ROW_SIZE.SMALL,
  leftAddOn: '',
  rightAddOn: ''
};
