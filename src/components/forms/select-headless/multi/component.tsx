import React, { FC, useEffect, useRef, useState } from 'react';

import cx from 'classnames';

import { Listbox, Transition } from '@headlessui/react';

import THEME from 'components/forms/select-headless/constants/theme';

import type { MultiSelectProps } from './types';

export const Select: FC<MultiSelectProps> = (props: MultiSelectProps) => {
  const {
    batchSelectionActive = false,
    batchSelectionLabel = 'Select all',
    clearSelectionActive = false,
    clearSelectionLabel = 'Clear selection',
    disabled = false,
    options,
    size = 'base',
    theme = 'dark',
    onSelect,
  } = props;
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

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
    return selected.find((el) => el === value) ? true : false;
  };

  const handleDeselect = (value) => {
    const selectedUpdated = selected.filter((el) => el !== value);
    setSelected(selectedUpdated);
    setIsOpen(true);
  };

  const handleSelect = (value) => {
    if (!isSelected(value)) {
      const selectedUpdated = [...selected, options.find((el) => el === value)];
      return setSelected(selectedUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  };

  return (
    <div className="flex -mt-2">
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
                      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5':
                        true,
                      'border border-gray-300 rounded-3xl': !isOpen,
                      'border-t-2 border-r-2 border-l-2 border-blue-500 rounded-t-3xl': isOpen,
                      [THEME.sizes[size]]: true,
                      [THEME[theme].open.button]: isOpen,
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="block ml-4 truncate">
                      {selected.length < 1 ? 'Select items' : `Selected items (${selected.length})`}
                    </span>

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
                    'absolute w-full rounded-b-3xl overflow-y-auto border-b-2 border-r-2 border-l-2 border-blue-500':
                      true,
                    [THEME[theme].button[size]]: true,
                  })}
                >
                  <Listbox.Options
                    static
                    className={cx({
                      'py-1 overflow-y-auto text-base leading-6 max-h-60 focus:outline-none rounded-b-3xl':
                        true,
                      [THEME[theme].menu]: true,
                    })}
                  >
                    <div className="flex flex-col ml-4 text-sm">
                      {batchSelectionActive && (
                        <button
                          className="px-4 py-2 text-left"
                          type="button"
                          onClick={() => setSelected(options)}
                        >
                          {batchSelectionLabel}
                        </button>
                      )}
                      {clearSelectionActive && (
                        <button
                          className="px-4 py-2 text-left"
                          type="button"
                          onClick={() => setSelected([])}
                        >
                          {clearSelectionLabel}
                        </button>
                      )}
                    </div>
                    {options.map((opt) => {
                      const selectedItem = isSelected(opt);
                      return (
                        <Listbox.Option key={opt} value={opt}>
                          {({ active }) => (
                            <div
                              className={cx({
                                'cursor-pointer select-none relative py-2 pl-8 pr-4': true,
                                [THEME[theme].item.base]: true,
                                [THEME[theme].item.active]: active,
                              })}
                            >
                              <span
                                className={cx({
                                  'font-normal block truncate': true,
                                  'font-semibold': selectedItem,
                                })}
                              >
                                {opt}
                              </span>
                              {selectedItem && (
                                <span
                                  className={cx({
                                    'text-blue-600 absolute inset-y-0 left-0 flex items-center pl-1.5':
                                      true,
                                    'text-white': active,
                                  })}
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
                <div className="pt-1 ml-4 text-sm">
                  {!isOpen && selected.length > 0 && <>Selected items: {selected.join(', ')}</>}
                </div>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default Select;
