import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithLocation } from 'jotai-location';
import { atomWithReset } from 'jotai/utils';
import { mapValues } from 'lodash-es';

import { deserialize, serialize } from './utils';

export type FilterValue = boolean | string | number | (string | number)[];

export type SearchParamsAtom = {
  [key: string]: string | string[];
};

const locationAtom = atomWithLocation();
locationAtom.debugLabel = 'location';

const searchParamsAtom = atom<SearchParamsAtom>((get) => {
  const iterator = get(locationAtom).searchParams;
  const entries = Object.fromEntries(iterator) || {};
  return mapValues(entries, (value) => deserialize(value));
});
searchParamsAtom.debugLabel = 'search params';

type UseFilterQueries<T> = {
  searchParams: Partial<SearchParamsAtom>;
  setSearchParam: (query: keyof T, value?: FilterValue) => void;
  setAllSearchParams: (newQueryFilters: T) => void;
  deleteAllSearchParams: () => void;
};

/** Hook to use search params with jotai-location */
export const useSearchParams = <T>(): UseFilterQueries<T> => {
  const [location, setLocation] = useAtom(locationAtom);
  const locationSearchParams = location.searchParams;

  const searchParams = useAtomValue<Partial<SearchParamsAtom>>(searchParamsAtom);

  const setSearchParam = (query: keyof T, value?: FilterValue) => {
    if (!value || (Array.isArray(value) && !value.length)) {
      locationSearchParams.delete(String(query));
    } else {
      locationSearchParams.set(String(query), serialize(value));
    }

    setLocation({
      searchParams: locationSearchParams,
    });
  };

  const setAllSearchParams = (newQueryFilters: T) => {
    Object.entries(newQueryFilters).forEach(([query, value]) => {
      if (!value || (Array.isArray(value) && !value.length)) {
        locationSearchParams.delete(query);
      } else {
        locationSearchParams.set(query, serialize(value));
      }
    });

    setLocation({
      searchParams: locationSearchParams,
    });
  };

  const deleteAllSearchParams = () => {
    const emptySearchParams = new URLSearchParams();
    setLocation({ searchParams: emptySearchParams });
  };

  return {
    searchParams,
    setSearchParam,
    setAllSearchParams,
    deleteAllSearchParams,
  };
};

// **** IMPLEMENTATION EXAMPLE
export type FilterQueryState = {
  query1: string;
  query2: string[];
};

export const defaultFilterQueryState: FilterQueryState = {
  query1: '',
  query2: [],
};

export const filterQueryStateAtoms = atomWithReset(defaultFilterQueryState);
// IMPLEMENTATION EXAMPLE ****
