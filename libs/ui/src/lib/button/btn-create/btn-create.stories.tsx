import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BtnCreate } from "./btn-create";

export default {
  component: BtnCreate,
  title: "Button/Create",
} as ComponentMeta<typeof BtnCreate>;

const Template: ComponentStory<typeof BtnCreate> = (args) => (
  <BtnCreate {...args} />
);

export const Create = Template.bind({
  isLoading: true,
  children: "Create",
  className: "btn btn-danger"
});
Create.args = {
  isLoading: true,
  children: "Create",
  className: "btn btn-danger"
};
