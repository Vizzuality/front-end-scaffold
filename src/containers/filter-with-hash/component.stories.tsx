/* eslint-disable prettier/prettier */
import { hash1Atom, hash2Atom } from 'store/filter-with-hash';

import { Story } from '@storybook/react/types-6-0';
import { useAtomValue } from 'jotai';

import FilterWhithHash from './component';
import { FilterWhithHashProps } from './types';

const StoryFilterWithHash = {
  title: 'Components/FilterWithHash',
  component: FilterWhithHash,
  argTypes: {},
};

export default StoryFilterWithHash;

const Template: Story<FilterWhithHashProps> = () => {
  const hash1 = useAtomValue(hash1Atom);
  const hash2 = useAtomValue(hash2Atom);

  return (
    <div className="max-w-sm p-10 bg-white">
      <div>{`hash1 = ${hash1}`}</div>
      <div>{`hash2 = ${hash2}`}</div>
      <FilterWhithHash />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
