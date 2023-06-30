import { FC, useRef, ChangeEvent } from 'react';

import cx from 'clsx';

import { Button } from '@/components/ui/button';
import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';
import SEARCH_SVG from 'svgs/ui/search.svg?sprite';

import { SIZES, THEME } from './constants';
import type { SearchProps } from './types';

export const Search: FC<SearchProps> = ({
  theme = 'dark',
  size = 'base',
  value,
  setValue,
  label = 'Search',
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const ref = useRef<HTMLInputElement>();
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form
      className={cx('relative flex w-full border-b border-gray-400', {
        [THEME[theme]]: true,
        [SIZES[size]]: true,
      })}
      role="search"
      action=""
      method="get"
      onSubmit={(e) => e.preventDefault()}
    >
      <Icon
        icon={SEARCH_SVG}
        className={cx({
          'absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform': true,
          [THEME[theme]]: true,
        })}
      />
      <label htmlFor="search">
        <span className="visually-hidden">{label}</span>
      </label>
      <input
        ref={ref}
        placeholder={placeholder}
        type="search"
        id="search"
        aria-label={label}
        onInput={onInput}
        value={value}
        className={cx(
          'w-full truncate bg-transparent px-10 font-sans leading-4 placeholder-gray-300 placeholder-opacity-50',
          {
            [THEME[theme]]: true,
            [SIZES[size]]: true,
          }
        )}
      />
      {value !== '' && (
        <Button
          tabIndex={0}
          className="absolute right-3 z-10 flex h-5 w-5 items-center justify-center self-center p-0"
          type="button"
          variant="ghost"
          onClick={() => {
            setValue('');
            if (ref.current) {
              ref.current.focus();
            }
          }}
          aria-label="Empty search"
        >
          <Icon icon={CLOSE_SVG} className="inline-block h-2 w-2" />
        </Button>
      )}
    </form>
  );
};

export default Search;
