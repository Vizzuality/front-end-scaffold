/* eslint-disable prettier/prettier */

import { useSearchParams, FilterQueryState, filterQueryStateAtoms } from 'store/filter-with-query';

import { Story } from '@storybook/react/types-6-0';
import { useAtomValue } from 'jotai';

import FilterWhithQuery from './component';
import { FilterWhithQueryProps } from './types';

const StoryFilterWithQuery = {
  title: 'Components/FilterWhithQuery',
  component: FilterWhithQuery,
  argTypes: {},
};

export default StoryFilterWithQuery;

const Template: Story<FilterWhithQueryProps> = () => {
  const filterQueryState = useAtomValue(filterQueryStateAtoms);
  const { searchParams } = useSearchParams<FilterQueryState>();

  return (
    <div className='max-w-sm '>
      <div>
        <p>Queries:</p>
        <ul>
          {Object.entries(searchParams)?.map(([key, value]) => (
            <li key={key}>{`${key} = ${value}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Filter state:</p>
        <ul>
          {Object.entries(filterQueryState)?.map(([key, value]) => (
            <li key={key}>{`${key} = ${value}`}</li>
          ))}
        </ul>
      </div>
      <FilterWhithQuery />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
