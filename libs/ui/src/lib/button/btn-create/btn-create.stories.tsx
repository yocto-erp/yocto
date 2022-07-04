import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BtnCreate } from "./btn-create";

export default {
  component: BtnCreate,
  title: "Button/BtnCreate",
} as ComponentMeta<typeof BtnCreate>;

const Template: ComponentStory<typeof BtnCreate> = (args) => (
  <BtnCreate {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isLoading: true,
  children: "Create",
  className: "btn btn-danger"
};
