import { FC, useEffect } from 'react';

import {
  useSearchParams,
  filterQueryStateAtoms,
  defaultFilterQueryState,
  FilterQueryState,
} from 'store/filter-with-query';

import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import Button from 'components/button';
import Input from 'components/forms/input';
import Select from 'components/forms/select/multi/component';

import { FilterWhithQueryProps } from './types';

export const FilterWhithQuery: FC<FilterWhithQueryProps> = () => {
  const { deleteAllSearchParams, searchParams, setAllSearchParams } =
    useSearchParams<FilterQueryState>();

  const [filterQueryState, setFilterQueryState] = useAtom(filterQueryStateAtoms);

  const resetAtom = useResetAtom(filterQueryStateAtoms);
  const resetAllFilterQueryState = () => resetAtom();

  const resetFilterQueryState = (filter: keyof FilterQueryState) => {
    setFilterQueryState({ ...filterQueryState, [filter]: defaultFilterQueryState[filter] });
  };

  // Filter state handles
  const handleChangeFilter = (filter: keyof FilterQueryState, value: string | string[]) => {
    setFilterQueryState({ ...filterQueryState, [filter]: value });
  };

  const handleRemoveFilter = (filter: keyof FilterQueryState) => {
    resetFilterQueryState(filter);
  };

  const handleRemoveAllFilters = () => {
    resetAllFilterQueryState();
  };

  // Queries handles
  // const handleChangeQuery = (filter: keyof FilterQueryState, value: string | string[]) => {
  //   setSearchParam(filter, value);
  // };

  // const handleRemoveQuery = (filter: keyof FilterQueryState) => {
  //   setSearchParam(filter);
  // };

  const handleSetAllQueries = () => {
    setAllSearchParams(filterQueryState as FilterQueryState);
  };

  const handleRemoveAllQueries = () => {
    deleteAllSearchParams();
  };

  useEffect(() => {
    // Get filter state from queryFilters
    let queryFiltersOnState = filterQueryState;
    const filterKeyArr = Object.keys(filterQueryState);
    Object.entries(searchParams).forEach(([key, value]) => {
      if (filterKeyArr.includes(key)) {
        queryFiltersOnState[key] = value;
      }
    });

    setFilterQueryState(queryFiltersOnState);
  }, [filterQueryState, searchParams, setFilterQueryState]);

  return (
    <div>
      <form>
        <div className="flex justify-between">
          <Input
            theme="light"
            value={filterQueryState.query1}
            onChange={(e) => handleChangeFilter('query1', e.currentTarget.value)}
          />
          <Button size="s" theme="secondary" onClick={() => handleRemoveFilter('query1')}>
            X
          </Button>
        </div>
        <div className="flex justify-between">
          <Select
            id="query2"
            theme="light"
            size="base"
            options={[
              { label: 'Spain', value: 'spain' },
              { label: 'France', value: 'france' },
              { label: 'Italy', value: 'italy' },
            ]}
            values={filterQueryState.query2}
            onChange={(value) => handleChangeFilter('query2', value)}
          />
          <Button size="s" theme="secondary" onClick={() => handleRemoveFilter('query2')}>
            X
          </Button>
        </div>
        <div className="flex justify-between">
          <Button
            size="s"
            theme="secondary"
            onClick={() => {
              handleRemoveAllFilters();
              handleRemoveAllQueries();
            }}
          >
            Clear
          </Button>
          <Button size="s" theme="primary" onClick={handleSetAllQueries}>
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterWhithQuery;
