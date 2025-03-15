import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card } from "./Card";
import { BtnLoading } from "../button";

export default {
  component: Card,
  title: "ui/Card",
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>This is testig body</Card>
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Testing",
  collapse: true,
  onToggleCollapse: () => {},
  toolbar: (
    <div className={"d-flex gap-1"}>
      <BtnLoading onClick={() => {}}>Test</BtnLoading>
      <BtnLoading onClick={() => {}}>Test 2</BtnLoading>
    </div>
  ),
};
