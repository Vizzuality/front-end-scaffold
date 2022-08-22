export interface SelectContextValue {
  selectedIndex: number | number[];
  setSelectedIndex: (index: number) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<Array<HTMLLIElement | null>>;
  setOpen: (open: boolean) => void;
  onChange: (value: string) => void;
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => any;
  dataRef: ContextData;
}

export interface OptionProps {
  value: string;
  index?: number;
  multi?: boolean;
  theme?: 'dark' | 'light';
  children: React.ReactNode;
}

export interface OptionGroupProps {
  label: string;
  children: React.ReactNode;
}

export interface Select2Props {
  htmlFor?: string;
  theme?: 'dark' | 'light';
  className?: string;
  label: string;
  value?: string | number;
  multi?: boolean;
  children: React.ReactNode;
  onChange: (value: string) => void;
  render: (selectedIndex: number) => React.ReactNode;
  categories: string[];
  items: {
    name?: string;
    icon?: React.ReactNode;
    category?: string;
    filter: any;
  };
}
