import Dropdown from './Dropdown';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
	component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		label: 'Dropdown',
		children: 'HELLO',
	},
};
