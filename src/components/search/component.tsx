import { FC, useRef, MouseEvent } from 'react';

import cx from 'clsx';

import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import type { SearchFieldState } from '@react-stately/searchfield';

import { Button } from 'components/button';
import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';
import SEARCH_SVG from 'svgs/ui/search.svg?sprite';

import { SIZES, THEME } from './constants';
import type { SearchProps, PressEvent } from './types';

export const Search: FC<SearchProps> = ({
  theme = 'dark',
  size = 'base',
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const state: SearchFieldState = useSearchFieldState(rest);

  const ref = useRef();
  const { inputProps, clearButtonProps } = useSearchField(rest, state, ref);

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
      {/* TODO add PressEvent to button or change implementation */}
      {state.value !== '' && (
        <Button
          tabIndex={0}
          className="absolute right-3 z-10 flex h-5 w-5 items-center justify-center self-center p-0"
          type="button"
          variant="ghost"
          {...clearButtonProps}
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            clearButtonProps.onPress(e as unknown as PressEvent)
          }
        >
          <Icon icon={CLOSE_SVG} className="inline-block h-2 w-2" />
        </Button>
      )}
    </div>
  );
};

export default Search;
