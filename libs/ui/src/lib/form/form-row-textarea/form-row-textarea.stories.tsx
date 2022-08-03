import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyElement from "./form-row-textarea";
import { FORM_ROW_SIZE } from "../constants";

export default {
  component: MyElement,
  title: "Form/FormRowTextarea",
} as ComponentMeta<typeof MyElement>;

const Template: ComponentStory<typeof MyElement> = (args) => {
  return <MyElement {...args} />;
};

export const FormRowTextarea = Template.bind({});

FormRowTextarea.args = {
  label: "Textarea",
  required: true,
  error: "testing error",
  size: FORM_ROW_SIZE.SMALL,
  value: "testing area",
};
