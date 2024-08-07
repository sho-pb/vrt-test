import { StoryObj, Meta } from '@storybook/react';
import { Button } from '.';

const meta = {
  title: 'parts/Button',
  component: Button,
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => <Button>Click me</Button>,
};
