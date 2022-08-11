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

function Arrow({ dir }: { dir: 'down' | 'up' }) {
  return (
    <div
      style={{
        display: 'flex',
        transform: dir === 'up' ? 'rotate(180deg)' : undefined,
      }}
    >
      <svg width={16} height={16} viewBox="0 0 512 512">
        <g transform={`translate(0,512) scale(0.1,-0.1)`} fill="currentColor" stroke="none">
          <path
            d="M783 3543 c-29 -6 -63 -49 -63 -79 0 -15 20 -46 52 -81 29 -32 434
-451 901 -930 834 -858 849 -873 887 -873 38 0 53 15 887 873 467 479 872 898
901 930 59 65 64 91 28 134 l-24 28 -1774 1 c-975 1 -1783 -1 -1795 -3z"
          />
        </g>
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 512 512">
      <g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor" stroke="none">
        <path
          d="M4468 4401 c-36 -10 -88 -31 -115 -46 -32 -18 -446 -425 -1245 -1224
l-1198 -1196 -532 531 c-293 292 -555 546 -581 563 -163 110 -396 111 -563 3
-174 -113 -264 -327 -221 -529 34 -158 -4 -114 824 -944 509 -510 772 -766
808 -788 108 -65 264 -87 389 -55 146 38 67 -37 1582 1478 896 896 1411 1418
1428 1447 52 92 69 156 69 269 0 155 -42 259 -146 363 -127 127 -320 176 -499
128z"
        />
      </g>
    </svg>
  );
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
      className="Option"
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
      {children} {selectedIndex === index && <CheckIcon />}
    </li>
  );
};

export const OptionGroup: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ children, label }) => {
  return (
    <li className="OptionGroup">
      <div className="OptionGroupLabel">{label}</div>
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
              className="SelectGroupLabel"
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
          className: 'SelectButton',
        })}
      >
        {render(selectedIndex - 1)}
        <Arrow dir="down" />
      </button>
      {open && (
        <FloatingOverlay lockScroll>
          <FloatingFocusManager context={context} preventTabbing>
            <div
              {...getFloatingProps({
                ref: floating,
                className: 'Select',
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
