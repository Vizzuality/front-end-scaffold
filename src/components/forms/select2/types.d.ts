export interface Select2Props {
  htmlFor?: string;
  theme?: 'dark' | 'light';
  className?: string;
  label: string;
  value?: string | number;
  children: React.ReactNode;
  onChange: (value: string) => void;
  render: (selectedIndex: number) => React.ReactNode;
}
