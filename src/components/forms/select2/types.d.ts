export interface OptionProps {
  value: string;
  index?: number;
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
