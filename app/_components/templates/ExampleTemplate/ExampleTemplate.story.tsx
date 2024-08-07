import { StoryObj, Meta } from '@storybook/react';
import { ExampleTemplate } from '.';

const meta = {
  title: 'templates/ExampleTemplate',
  component: ExampleTemplate,
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof ExampleTemplate>;

export const Default: Story = {
  render: () => <ExampleTemplate />,
};
