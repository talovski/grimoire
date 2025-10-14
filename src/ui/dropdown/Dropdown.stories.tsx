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
		btnContent: 'Button',
		contentStyleExtend: 'flex flex-col',
		children: (
			<>
				<button>focusable</button>
				<button>focusable 2</button>
				<ul>
					<li>nonfocusable</li>
					<li>
						<button>(nested) focusable 3</button>
					</li>
				</ul>
			</>
		),
	},
};
