import { Button } from './Button';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		label: 'Button',
		children: 'Button',
	},
};
