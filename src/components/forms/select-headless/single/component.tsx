import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import cx from 'classnames';

import { Listbox, Transition } from '@headlessui/react';

import THEME from 'components/forms/select-headless/constants/theme';
import Icon from 'components/icon';
import Loading from 'components/loading';

import CHEVRON_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';
import CHEVRON_UP_SVG from 'svgs/ui/arrow-up.svg?sprite';

import type { SingleSelectProps } from './types';

export const Select: FC<SingleSelectProps> = (props: SingleSelectProps) => {
  const {
    disabled = false,
    options,
    placeholder = 'Select...',
    size = 'base',
    theme = 'dark',
    value,
    clearable,
    clearSelectionLabel = 'Clear',
    loading,
    onSelect,
  } = props;
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const clearableBtnRef = useRef(null);

  const initialValue = value || null;

  const [selected, setSelected] = useState(initialValue);

  const SELECTED = useMemo(() => {
    if (loading) return 'Loading...';

    if (selected) {
      const option = options.find((o) => o.value === selected);
      return option?.label;
    }

    return placeholder;
  }, [options, selected, placeholder, loading]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (v) => {
    setSelected(v);

    if (onSelect) {
      onSelect(v);
    }
  };

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
        onChange={handleSelect}
      >
        {({ open }) => (
          <>
            <div className="relative space-y-3" ref={ref}>
              <span className="inline-block w-full">
                <Listbox.Button
                  ref={triggerRef}
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
                  <div className="flex px-5 text-sm">
                    {clearable && (
                      <Listbox.Option key={null} value={null}>
                        <button
                          ref={clearableBtnRef}
                          type="button"
                          className="py-2 text-left underline"
                        >
                          {clearSelectionLabel}
                        </button>
                      </Listbox.Option>
                    )}
                  </div>

                  {options.map((opt) => {
                    return (
                      <Listbox.Option key={opt.value} value={opt.value}>
                        {({ active: a, selected: s, disabled: d }) => (
                          <div
                            className={cx({
                              'flex space-x-2 cursor-pointer select-none relative py-2 pl-5 pr-4':
                                true,
                              [THEME[theme].item.base]: true,
                              [THEME[theme].item.active]: a,
                              [THEME[theme].item.selected]: s,
                              [THEME[theme].item.disabled]: d,
                            })}
                          >
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
