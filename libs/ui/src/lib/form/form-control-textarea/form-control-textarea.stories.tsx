import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyElement from "./form-control-textarea";

export default {
  component: MyElement,
  title: "Form/FormControlTextarea",
} as ComponentMeta<typeof MyElement>;

const Template: ComponentStory<typeof MyElement> = (args) => {
  return <MyElement {...args} />;
};

export const FormControlTextarea = Template.bind({});

FormControlTextarea.args = {
  label: "Textarea",
  required: true,
  error: "testing error",
  inputClass: "form-select-lg",
  value: "testing area",
};
