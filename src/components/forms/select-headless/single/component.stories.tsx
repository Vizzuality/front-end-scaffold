import { Story } from '@storybook/react/types-6-0';

import Select from './component';
import type { SingleSelectProps } from './types';

const StorySelect = {
  title: 'Components/Forms/Select Headless/Single',
  component: Select,
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

export default StorySelect;

const Template: Story<SingleSelectProps> = (args) => (
  <div className="relative">
    <Select {...args} />
  </div>
);

export const Light = Template.bind({});
Light.args = {
  theme: 'light',
  size: 'base',
  options: [
    {
      label: 'Wade Cooper',
      value: 'Wade Cooper',
    },
    {
      label: 'Arlene Mccoy',
      value: 'Arlene Mccoy',
    },
    {
      label: 'Devon Webb',
      value: 'Devon Webb',
    },
    {
      label: 'Tom Cook',
      value: 'Tom Cook',
    },
    {
      label: 'Tanya Fox',
      value: 'Tanya Fox',
    },
    {
      label: 'Hellen Schmidt',
      value: 'Hellen Schmidt',
    },

    {
      label: 'Caroline Schultz',
      value: 'Caroline Schultz',
    },
    {
      label: 'Mason Heaney',
      value: 'Mason Heaney',
    },
    {
      label: 'Claudie Smitham',
      value: 'Claudie Smitham',
    },
    {
      label: 'Emil Schaefer',
      value: 'Emil Schaefer',
    },
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
    {
      label: 'Wade Cooper',
      value: 'Wade Cooper',
    },
    {
      label: 'Arlene Mccoy',
      value: 'Arlene Mccoy',
    },
    {
      label: 'Devon Webb',
      value: 'Devon Webb',
    },
    {
      label: 'Tom Cook',
      value: 'Tom Cook',
    },
    {
      label: 'Tanya Fox',
      value: 'Tanya Fox',
    },
    {
      label: 'Hellen Schmidt',
      value: 'Hellen Schmidt',
    },

    {
      label: 'Caroline Schultz',
      value: 'Caroline Schultz',
    },
    {
      label: 'Mason Heaney',
      value: 'Mason Heaney',
    },
    {
      label: 'Claudie Smitham',
      value: 'Claudie Smitham',
    },
    {
      label: 'Emil Schaefer',
      value: 'Emil Schaefer',
    },
  ],
  disabled: false,
  clearSelectionActive: true,
  clearSelectionLabel: 'Clear selection',
  batchSelectionActive: true,
  batchSelectionLabel: 'Select all',
  onSelect: (option) => console.info(option),
};
