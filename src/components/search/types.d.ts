export interface SearchProps extends AriaSearchFieldProps {
  theme?: 'dark' | 'light';
  size: 'sm' | 'base';
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}
