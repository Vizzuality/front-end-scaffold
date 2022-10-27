import { FC, useRef } from 'react';

import cx from 'classnames';

// react aria
import { useButton } from '@react-aria/button'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite'; // eslint-disable-line @typescript-eslint/no-unused-vars
import SEARCH_SVG from 'svgs/ui/search.svg?sprite';

import { SIZES, THEME } from './constants';
import type { SearchProps } from './types';

export const Search: FC<SearchProps> = ({
  theme = 'dark',
  size = 'base',
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const state = useSearchFieldState(rest);

  const ref = useRef();
  const { inputProps, clearButtonProps } = useSearchField(rest, state, ref);
  const { buttonProps } = useButton(clearButtonProps, null);

  return (
    <div
      className={cx('relative flex w-full border-b border-gray-400', {
        [THEME[theme]]: true,
        [SIZES[size]]: true,
      })}
    >
      <Icon
        icon={SEARCH_SVG}
        className={cx({
          'absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform': true,
          [THEME[theme]]: true,
        })}
      />

      <input
        {...inputProps}
        ref={ref}
        placeholder={placeholder}
        type="search"
        className={cx(
          'w-full truncate bg-transparent px-10 font-sans leading-4 placeholder-gray-300 placeholder-opacity-50',
          {
            [THEME[theme]]: true,
            [SIZES[size]]: true,
          }
        )}
      />

      {state.value !== '' && (
        <button
          {...buttonProps}
          tabIndex={0}
          className="r-2 absolute right-3 z-10 flex h-5 w-5 items-center justify-center self-center"
          type="button"
        >
          <Icon icon={CLOSE_SVG} className="inline-block h-2 w-2" />
        </button>
      )}
    </div>
  );
};

export default Search;
