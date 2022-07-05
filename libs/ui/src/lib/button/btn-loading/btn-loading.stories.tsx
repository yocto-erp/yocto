import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BtnLoading } from "./btn-loading";

export default {
  component: BtnLoading,
  title: "Button/Loading",
} as ComponentMeta<typeof BtnLoading>;

const Template: ComponentStory<typeof BtnLoading> = (args) => (
  <BtnLoading {...args} />
);

const icon = <i className="bi bi-alarm-fill" />;
export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  children: "Loading",
  icon: icon,
  className: "btn btn-info",
};
