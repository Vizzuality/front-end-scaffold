import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import cx from 'classnames';

import { Listbox, Transition } from '@headlessui/react';

import Checkbox from 'components/forms/checkbox';
import THEME from 'components/forms/select-headless/constants/theme';
import Icon from 'components/icon';
import Loading from 'components/loading';

import CHEVRON_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';
import CHEVRON_UP_SVG from 'svgs/ui/arrow-up.svg?sprite';

import type { MultiSelectProps } from './types';

export const Select: FC<MultiSelectProps> = (props: MultiSelectProps) => {
  const {
    batchSelectionActive = false,
    batchSelectionLabel = 'Select all',
    clearSelectionActive = false,
    clearSelectionLabel = 'Clear all',
    disabled = false,
    options,
    placeholder = 'Select...',
    loading,
    size = 'base',
    theme,
    values,
    onSelect,
  } = props;
  const ref = useRef(null);
  const initialValues = values || [];
  const [selected, setSelected] = useState(initialValues);

  const SELECTED = useMemo(() => {
    if (loading) return 'Loading...';

    if (!selected.length) return placeholder || 'Select items';

    // if (selected.length === options.length) return placeholder;

    if (selected.length === 1) {
      const option = options.find((o) => o.value === selected[0]);
      if (option) return option.label;
      return null;
    }

    if (selected.length === options.length) return `All items selected`;

    if (selected.length > 1) return `Selected items (${selected.length})`;

    return null;
  }, [loading, options, placeholder, selected]);

  useEffect(() => {
    if (values) {
      setSelected(values);
    }
  }, [values]);

  const handleSelect = useCallback(
    (v) => {
      setSelected(v);
      if (onSelect) {
        onSelect(v);
      }
    },
    [onSelect]
  );

  const handleSelectAll = useCallback(() => {
    const allOptions = options.map((o) => o.value);
    setSelected(allOptions);
    if (onSelect) {
      onSelect(allOptions);
    }
  }, [onSelect, options]);

  const handleClearAll = useCallback(() => {
    setSelected([]);
    if (onSelect) {
      onSelect([]);
    }
  }, [onSelect]);

  return (
    <div
      className={cx({
        'w-full': true,
        [THEME[theme].container]: true,
      })}
    >
      <Listbox
        as="div"
        className="space-y-1"
        disabled={disabled}
        value={selected}
        multiple
        onChange={handleSelect}
      >
        {({ open }) => (
          <>
            <div className="relative space-y-3" ref={ref}>
              <span className="inline-block w-full">
                <Listbox.Button
                  className={cx({
                    [THEME[theme].button]: true,
                    'border border-grey-0/40 text-grey-0/40': disabled,
                    [THEME.sizes[size]]: true,
                    [THEME[theme].open.button]: open,
                  })}
                >
                  <span className="block truncate">{SELECTED}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Loading
                      visible={loading}
                      className={THEME[theme].loading}
                      iconClassName="w-3 h-3"
                    />

                    {!loading && (
                      <Icon
                        icon={open ? CHEVRON_UP_SVG : CHEVRON_DOWN_SVG}
                        className={cx({
                          'w-3 h-3': true,
                        })}
                      />
                    )}
                  </span>
                </Listbox.Button>
              </span>

              <Transition
                unmount={false}
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className={cx({
                  'z-10 absolute w-full overflow-y-auto rounded-lg shadow-lg min-w-[250px]': true,
                  [THEME[theme].button[size]]: true,
                })}
              >
                <Listbox.Options
                  static
                  className={cx({
                    'py-1 overflow-y-auto text-base leading-6 max-h-60 focus:outline-none': true,
                    [THEME[theme].menu]: true,
                  })}
                >
                  <div className="flex px-5 space-x-5 text-sm">
                    {batchSelectionActive && (
                      <button
                        className="py-2 text-left underline text-grey-20"
                        type="button"
                        onClick={handleSelectAll}
                      >
                        {batchSelectionLabel}
                      </button>
                    )}

                    {clearSelectionActive && (
                      <button
                        className="py-2 text-left underline"
                        type="button"
                        onClick={handleClearAll}
                      >
                        {selected.length < 1 && clearSelectionLabel}
                        {selected.length >= 1 &&
                          selected.length !== options.length &&
                          `${clearSelectionLabel} (${selected.length} Selected)`}
                        {selected.length === options.length &&
                          `${clearSelectionLabel} (All selected)`}
                      </button>
                    )}
                  </div>

                  {options.map((opt) => {
                    return (
                      <Listbox.Option key={opt.value} value={opt.value}>
                        {({ active: a, disabled: d }) => (
                          <div
                            className={cx({
                              'flex items-center space-x-2 cursor-pointer select-none relative py-2 pl-5 pr-4':
                                true,
                              [THEME[theme].item.base]: true,
                              [THEME[theme].item.active]: a,
                              [THEME[theme].item.disabled]: d,
                            })}
                          >
                            <Checkbox
                              className="cursor-pointer focus:text-black focus:ring-black checked:bg-black"
                              checked={selected.includes(opt.value)}
                              readOnly
                            />

                            <span
                              className={cx({
                                'font-semibold block line-clamp-2': true,
                              })}
                            >
                              {opt.label}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
