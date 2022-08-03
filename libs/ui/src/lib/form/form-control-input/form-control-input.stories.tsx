import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyElement from "./form-control-input";
import { useEffect, useState } from "react";

export default {
  component: MyElement,
  title: "Form/FormControlInput",
} as ComponentMeta<typeof MyElement>;

const Template: ComponentStory<typeof MyElement> = (args) => {
  const [value, setValue] = useState(args.value);
  useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  return (
    <MyElement
      {...args}
      value={value}
      onChange={(evt) => setValue((evt?.target as HTMLInputElement).value)}
    />
  );
};

export const FormControlInput = Template.bind({});

FormControlInput.args = {
  label: "Test",
  required: true,
  type: "text",
  error: "testing error",
  value: "124",
};
