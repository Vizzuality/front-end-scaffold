import React, { FC, useEffect, useRef, useState } from 'react';

import cx from 'classnames';

import { Listbox, Transition } from '@headlessui/react';

import THEME from 'components/forms/select2/constants/theme';

import type { Select2Props } from './types';

export const Select2: FC<Select2Props> = (props: Select2Props) => {
  const {
    batchSelectionActive = false,
    batchSelectionLabel = 'Select all',
    clearSelectionActive = false,
    clearSelectionLabel = 'Clear selection',
    disabled = false,
    multiple = false,
    options,
    placeholder = 'Select...',
    size = 'base',
    theme = 'dark',
    onSelect,
  } = props;
  const ref = useRef(null);
  const initialValue = multiple ? [] : null;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);

  const isSelected = (value) => {
    if (multiple) return selected.find((el) => el === value) ? true : false;
    return selected === value ? true : false;
  };

  const handleDeselect = (value) => {
    const selectedUpdated = selected.filter((el) => el !== value);
    setSelected(selectedUpdated);
    setIsOpen(true);
  };

  const handleSelect = (value) => {
    if (!multiple) return setSelected(value);
    if (!isSelected(value) && multiple) {
      const selectedUpdated = [...selected, options.find((el) => el === value)];
      return setSelected(selectedUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  };

  return (
    <div className="flex">
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
          onChange={(value) => handleSelect(value)}
        >
          {() => (
            <>
              <div className="relative" ref={ref}>
                <span className="inline-block w-full">
                  <Listbox.Button
                    className={cx({
                      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out  cursor-pointer  sm:text-sm sm:leading-5':
                        true,
                      'border border-gray-300 rounded-3xl': !isOpen,
                      'border-2 border-blue-500 rounded-t-3xl': isOpen,
                      [THEME.sizes[size]]: true,
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {multiple && (
                      <span className="block truncate">
                        {selected.length < 1
                          ? 'Select items'
                          : `Selected items (${selected.length})`}
                      </span>
                    )}
                    {!multiple && <span className="block truncate">{selected || placeholder}</span>}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className={cx({
                    'absolute w-full rounded-b-3xl overflow-auto border border-red-600': true,
                    [THEME[theme].button]: true,
                  })}
                >
                  <div className="flex flex-col">
                    {batchSelectionActive && multiple && (
                      <button
                        className="px-4 py-2 text-left"
                        type="button"
                        onClick={() => setSelected(options)}
                      >
                        {batchSelectionLabel}
                      </button>
                    )}
                    {clearSelectionActive && multiple && (
                      <button
                        className="px-4 py-2 text-left"
                        type="button"
                        onClick={() => setSelected(initialValue)}
                      >
                        {clearSelectionLabel}
                      </button>
                    )}
                  </div>
                  <Listbox.Options
                    static
                    className={cx({
                      'py-1  text-base leading-6 max-h-60 focus:outline-none rounded-b-3xl': true,
                      [THEME[theme].menu]: true,
                    })}
                  >
                    {options.map((opt) => {
                      const selectedItem = isSelected(opt);
                      return (
                        <Listbox.Option key={opt} value={opt}>
                          {({ active }) => (
                            <div
                              className={`${
                                active ? 'text-white bg-gray-200' : 'text-gray-900'
                              } cursor-pointer select-none relative py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selectedItem ? 'font-semibold' : 'font-normal'
                                } block truncate`}
                              >
                                {opt}
                              </span>
                              {selectedItem && (
                                <span
                                  className={`${
                                    active ? 'text-white' : 'text-blue-600'
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
                <div className="pt-1 text-sm">
                  {!isOpen && multiple && selected.length > 0 && (
                    <>Selected items: {selected.join(', ')}</>
                  )}
                </div>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default Select2;
