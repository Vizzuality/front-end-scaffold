import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';

import cx from 'classnames';

import {
  useFloating,
  offset,
  flip,
  useListNavigation,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  FloatingFocusManager,
  autoUpdate,
  size,
  FloatingOverlay,
  ContextData,
} from '@floating-ui/react-dom-interactions';

import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

interface SelectContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<Array<HTMLLIElement | null>>;
  setOpen: (open: boolean) => void;
  onChange: (value: string) => void;
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => any;
  dataRef: ContextData;
}

const SelectContext = createContext({} as SelectContextValue);

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const Option: React.FC<{
  value: string;
  index?: number;
  children: React.ReactNode;
}> = ({ children, index = 0, value }) => {
  const {
    selectedIndex,
    setSelectedIndex,
    listRef,
    setOpen,
    onChange,
    activeIndex,
    setActiveIndex,
    getItemProps,
    dataRef,
  } = useContext(SelectContext);

  function handleSelect() {
    setSelectedIndex(index);
    onChange(value);
    setOpen(false);
    setActiveIndex(null);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || (event.key === ' ' && !dataRef.current.typing)) {
      event.preventDefault();
      handleSelect();
    }
  }

  return (
    <li
      className="flex items-center justify-between px-6 py-3 text-left text-white transition duration-150 ease-out rounded-sm cursor-pointer focus:bg-blue-500 outline-0 min-h-4"
      role="option"
      ref={(node) => (listRef.current[index] = node)}
      tabIndex={activeIndex === index ? 0 : 1}
      // activeIndex === index prevents VoiceOver stuttering.
      aria-selected={activeIndex === index && selectedIndex === index}
      data-selected={selectedIndex === index}
      {...getItemProps({
        onClick: handleSelect,
        onKeyDown: handleKeyDown,
      })}
    >
      {children}{' '}
      {/* {selectedIndex === index && (
        <Icon icon={CHECK_SVG} className="w-5 h-5 text-white border-none fill-white ring-white" />
      )} */}
    </li>
  );
};

export const OptionGroup: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ children, label }) => {
  return (
    <li>
      <div>{label}</div>
      <ul>{children}</ul>
    </li>
  );
};

export const Select2: React.FC<{
  onChange: (value: string) => void;
  render: (selectedIndex: number) => React.ReactNode;
  value: string;
  children: React.ReactNode;
}> = ({ children, value, render, onChange = () => {} }) => {
  const listItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const listContentRef = useRef([
    'Select...',
    ...(Children.map(children, (child) =>
      Children.map(
        isValidElement(child) && child.props.children,
        (grandchild) => grandchild.props.value
      )
    ) ?? []),
  ]);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(0, listContentRef.current.indexOf(value))
  );
  const [controlledScrolling, setControlledScrolling] = useState(false);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const { x, y, reference, floating, strategy, context, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 8 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const floatingRef = refs.floating;

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      onMatch: open ? setActiveIndex : setSelectedIndex,
      activeIndex,
      selectedIndex,
    }),
  ]);

  // Scroll the active or selected item into view when in `controlledScrolling`
  // mode (i.e. arrow key nav).
  useLayoutEffect(() => {
    const floatingSelect = floatingRef.current;

    if (open && controlledScrolling && floatingSelect) {
      const item =
        activeIndex != null
          ? listItemsRef.current[activeIndex]
          : selectedIndex != null
          ? listItemsRef.current[selectedIndex]
          : null;

      if (item && prevActiveIndex != null) {
        const itemHeight = listItemsRef.current[prevActiveIndex]?.offsetHeight ?? 0;

        const floatingHeight = floatingSelect.offsetHeight;
        const top = item.offsetTop;
        const bottom = top + itemHeight;

        if (top < floatingSelect.scrollTop) {
          floatingSelect.scrollTop -= floatingSelect.scrollTop - top + 5;
        } else if (bottom > floatingHeight + floatingSelect.scrollTop) {
          floatingSelect.scrollTop += bottom - floatingHeight - floatingSelect.scrollTop + 5;
        }
      }
    }
  }, [
    open,
    controlledScrolling,
    prevActiveIndex,
    activeIndex,
    floatingRef,
    selectedIndex,
    floating,
  ]);

  // Sync the height and the scrollTop values
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      const floatingSelect = refs.floating.current;

      if (open && floatingSelect && floatingSelect.clientHeight < floatingSelect.scrollHeight) {
        const item = listItemsRef.current[selectedIndex];
        if (item) {
          floatingSelect.scrollTop =
            item.offsetTop - floatingSelect.offsetHeight / 2 + item.offsetHeight / 2;
        }
      }
    });
  }, [open, selectedIndex, refs]);

  let optionIndex = 0;
  const options = [
    <ul key="default">
      <Option value="default">Select...</Option>
    </ul>,
    ...(Children.map(
      children,
      (child) =>
        isValidElement(child) && (
          <ul
            key={child.props.label}
            role="group"
            aria-labelledby={`floating-ui-select-${child.props.label}`}
          >
            <li
              role="presentation"
              id={`floating-ui-select-${child.props.label}`}
              className="px-4 my-5 text-white opacity-50"
              aria-hidden="true"
            >
              {child.props.label}
            </li>
            {Children.map(child.props.children, (grandchild) =>
              cloneElement(grandchild, { index: 1 + optionIndex++ })
            )}
          </ul>
        )
    ) ?? []),
  ];

  return (
    <SelectContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        activeIndex,
        setActiveIndex,
        listRef: listItemsRef,
        setOpen,
        onChange,
        getItemProps,
        dataRef: context.dataRef,
      }}
    >
      <button
        {...getReferenceProps({
          ref: reference,
          className:
            'relative flex items-center justify-between text-white bg-transparent ring-1 ring-gray-400 hover:opacity-20 rounded-3xl w-full py-1 px-4',
        })}
      >
        {render(selectedIndex - 1)}

        <Icon
          icon={ARROW_DOWN_SVG}
          className={cx({
            'absolute w-3 h-3 -translate-y-1/2 top-1/2 right-5': true,
            'transform transition-transform rotate-180 text-blue-500': open,
          })}
        />
      </button>
      {open && (
        <FloatingOverlay lockScroll>
          <FloatingFocusManager context={context} preventTabbing>
            <div
              {...getFloatingProps({
                ref: floating,
                className: 'ring-2 ring-blue-400 bg-gray-700 rounded-2xl',
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  overflow: 'auto',
                },
                onPointerEnter() {
                  setControlledScrolling(false);
                },
                onPointerMove() {
                  setControlledScrolling(false);
                },
                onKeyDown() {
                  setControlledScrolling(true);
                },
              })}
            >
              {options}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </SelectContext.Provider>
  );
};

export default Select2;
