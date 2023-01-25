import type { Dispatch } from 'react';

import Router from 'next/router';

import { Atom, useAtomValue } from 'jotai';
import {
  atomWithStorage,
  useHydrateAtoms,
  unstable_NO_STORAGE_VALUE as NO_STORAGE_VALUE,
} from 'jotai/utils';

const defaultSerialize = <T>(value: T): string => {
  if (value === undefined) return undefined;
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};

const defaultDeserialize = <T>(value: string): T => {
  if (value === undefined) return undefined;

  try {
    return JSON.parse(value);
  } catch {
    return value as T;
  }
};

interface AtomStorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  onChange?: Dispatch<T>;
}

export default function useAtomWithQueryParamStorage<T>(
  key: string,
  atom: Atom<T>,
  initialValue?: T,
  {
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    onChange,
  }: AtomStorageOptions<T> = {}
) {
  // ? when the initial value of the atom is set via URL, we need to hydrate the client
  // ? to get the value from server and avoid values blinking
  useHydrateAtoms([[atom, initialValue]]);
  const atomValue = useAtomValue(atom);

  return atomWithStorage<T>(key, atomValue, {
    delayInit: true,
    removeItem: async (_key) => {
      const url = new URL(Router.asPath);
      url.searchParams.delete(_key);

      await Router.replace({ ...url, query: url.toString() }, undefined, { shallow: true });
    },
    getItem: (_key) => {
      if (!(_key in Router.query) || !Router.isReady) return NO_STORAGE_VALUE;
      const queryValue = Router.query[_key] as string;

      const value = deserialize(queryValue);
      if (!value) return NO_STORAGE_VALUE;

      return value;
    },
    setItem: async (_key, newValue) => {
      const { query } = Router;

      if (!newValue) {
        delete query[_key];
      } else {
        query[_key] = serialize(newValue);
      }
      onChange?.(newValue);
      await Router.replace({ query }, undefined, { shallow: true });
    },
    subscribe: (_key, setValue) => {
      const callback = () => {
        const queryValue = Router.query[_key] as string;
        if (!queryValue) return;
        setValue(deserialize(queryValue));
      };

      Router.events.on('routeChangeComplete', callback); // ? Subscribe to next router
      window.addEventListener('hashchange', callback);

      return () => {
        Router.events.off('routeChangeComplete', callback); // ? Unsubscribe to next router
        window.removeEventListener('hashchange', callback);
      };
    },
  });
}
