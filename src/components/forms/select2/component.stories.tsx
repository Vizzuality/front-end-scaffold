import { Story } from '@storybook/react/types-6-0';

import Select2 from './component';
import type { Select2Props } from './types';

const StorySelect2 = {
  title: 'Components/Forms/Select Headless',
  component: Select2,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    state: {
      control: {
        type: 'select',
        options: ['valid', 'error', 'none'],
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    initialValues: {
      table: {
        disable: true,
      },
    },
  },
};

export default StorySelect2;

const Template: Story<Select2Props> = (args) => (
  <div className="relative">
    <Select2 {...args} />
  </div>
);

export const Light = Template.bind({});
Light.args = {
  theme: 'light',
  size: 'base',
  options: [
    'Wade Cooper',
    'Arlene Mccoy',
    'Devon Webb',
    'Tom Cook',
    'Tanya Fox',
    'Hellen Schmidt',
    'Caroline Schultz',
    'Mason Heaney',
    'Claudie Smitham',
    'Emil Schaefer',
  ],
  disabled: false,
  clearSelectionActive: true,
  clearSelectionLabel: 'Clear selection',
  batchSelectionActive: true,
  batchSelectionLabel: 'Select all',
  onSelect: (option) => console.info(option),
};

export const Dark = Template.bind({});
Dark.args = {
  theme: 'dark',
  size: 'base',
  options: [
    'Wade Cooper',
    'Arlene Mccoy',
    'Devon Webb',
    'Tom Cook',
    'Tanya Fox',
    'Hellen Schmidt',
    'Caroline Schultz',
    'Mason Heaney',
    'Claudie Smitham',
    'Emil Schaefer',
  ],
  disabled: false,
  clearSelectionActive: true,
  clearSelectionLabel: 'Clear selection',
  batchSelectionActive: true,
  batchSelectionLabel: 'Select all',
  onSelect: (option) => console.info(option),
};

export const Multiple = Template.bind({});
Multiple.args = {
  theme: 'dark',
  size: 'base',
  multiple: true,
  options: [
    'Wade Cooper',
    'Arlene Mccoy',
    'Devon Webb',
    'Tom Cook',
    'Tanya Fox',
    'Hellen Schmidt',
    'Caroline Schultz',
    'Mason Heaney',
    'Claudie Smitham',
    'Emil Schaefer',
  ],
  disabled: false,
  clearSelectionActive: true,
  clearSelectionLabel: 'Clear selection',
  batchSelectionActive: true,
  batchSelectionLabel: 'Select all',
  onSelect: (option) => console.info(option),
};
