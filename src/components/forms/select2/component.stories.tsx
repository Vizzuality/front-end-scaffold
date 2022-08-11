import { Story } from '@storybook/react/types-6-0';

import Select2 from './component';
import type { Select2Props } from './types';

const StorySelect2 = {
  title: 'Components/Forms/Select2',
  component: Select2,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
  },
};

export default StorySelect2;

const Template: Story<Select2Props> = ({ ...args }) => <Select2 {...args}>This is a test</Select2>;

export const Default = Template.bind({});
Default.args = {
  id: 'scenario',
  theme: 'dark',
  className: 'uppercase',
};
