import { Dispatch, useEffect } from 'react';

import Router from 'next/router';

import { useAtomValue, Atom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import queryString, { ParsedQuery } from 'query-string';

const defaultSerialize = <T>(value: T): string => {
  if (value === undefined) return undefined;

  return queryString.stringify(value, {
    arrayFormat: 'bracket-separator',
    arrayFormatSeparator: ',',
  });
};

const defaultDeserialize = (values: string) => {
  if (values === undefined) return undefined;

  return queryString.parse(values, {
    arrayFormat: 'bracket-separator',
    arrayFormatSeparator: ',',
    parseNumbers: true,
    parseBooleans: true,
  });
};

interface AtomURLOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (values: string) => ParsedQuery<string | number | boolean>;
  onChange?: Dispatch<T>;
}

export default function useAtomURL<T = string>(
  atomToSync: Atom<T>,
  initialValues?: string,
  {
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    onChange,
  }: AtomURLOptions<T> = {}
) {
  const deserializedValues = deserialize(initialValues);

  console.log('deserializedValues', deserializedValues);

  // ? when the initial value of the atom comes from the URL, we need to hydrate the client
  // ? to get the value from server and avoid values blinking
  useHydrateAtoms([[atomToSync, deserializedValues]]);
  const syncedAtomValue = useAtomValue<T>(atomToSync);

  console.log('syncedAtomValue', syncedAtomValue);

  useEffect(() => {
    async function updateURL() {
      let { pathname } = Router;
      const url = `${pathname}?${serialize(syncedAtomValue)}`;

      onChange?.(syncedAtomValue);
      await Router.replace(url, url, { shallow: true });
    }

    if (Router.isReady) updateURL();
  }, [syncedAtomValue, serialize, onChange]);
}
