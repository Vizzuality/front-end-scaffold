import { FC, Fragment, useMemo, useState } from 'react';

import cx from 'classnames';

import { Listbox, Transition } from '@headlessui/react';

import Checkbox from 'components/forms/checkbox';
import THEME from 'components/forms/select2/constants/theme';
import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

import type { Select2Props } from './types';

export const Select2: FC<Select2Props> = (props: Select2Props) => {
  const {
    theme = 'dark',
    // size = 'base',
    placeholder = 'Select...',
    options,
    // selected,
    // initialSelected,
    // meta = {},
    disabled,
    multiple,
    value = '',
    // onChange,
  } = props;

  const [selected, setSelected] = useState(placeholder);

  const handleChange = (s) => {
    setSelected(s);
  };

  const values = useMemo(() => {
    if (typeof selected !== 'undefined') {
      if (multiple) {
        if (Array.isArray(selected)) return selected;

        return [selected];
      }
    }
    return selected;
  }, [multiple, selected]);

  return (
    <div
      className={cx({
        'z-50 cursor-pointer': true,
        'opacity-80 pointer-events-none': disabled,
      })}
    >
      <Listbox value={value} onChange={(s) => handleChange(s)}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button
              className={cx({
                'relative w-full py-2 px-4 pr-10 text-left rounded-3xl bg-transparent ring-1 ring-gray-400':
                  true,
                [THEME[theme].container]: true,
              })}
            >
              <span className="block truncate">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Icon
                  icon={ARROW_DOWN_SVG}
                  className={cx({
                    'absolute w-3 h-3 text-blue-500 -translate-y-1/2 top-1/2 right-5': true,
                    'rotate-180 transition-transform transform ': open,
                  })}
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <button
                  className="px-4 py-2"
                  type="button"
                  onClick={() => console.log('unselect all')}
                >
                  Clear all
                </button>
                {options.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className="relative flex items-center px-4 py-2 space-x-4 text-gray-900 cursor-pointer"
                    value={option}
                  >
                    {/* CHECKBOX */}
                    {/* {value !== 'clear' && value !== 'all' && ( */}
                    {multiple && (
                      <Checkbox
                        className="cursor-pointer"
                        checked={values.includes(selected)}
                        readOnly
                      />
                    )}
                    {/* )} */}
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default Select2;
