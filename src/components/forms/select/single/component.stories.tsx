import { Story } from '@storybook/react/types-6-0';

import Select from './component';
import type { SingleSelectProps } from './types';

const StorySelect = {
  title: 'Components/Forms/Select/Single',
  component: Select,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    initialValues: {
      table: {
        disable: true,
      },
    },
  },
};

export default StorySelect;

const Template: Story<SingleSelectProps> = (args) => (
  <div className="relative text-white">
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
  value: null,
  disabled: false,
  clearable: true,
  clearSelectionLabel: 'Clear selection',
  loading: false,
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
  value: null,
  disabled: false,
  clearable: true,
  clearSelectionLabel: 'Clear selection',
  loading: false,
  onSelect: (option) => console.info(option),
};
