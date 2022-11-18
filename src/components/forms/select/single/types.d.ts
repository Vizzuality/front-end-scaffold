export interface SingleSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  value?: unknown | string | number;
  disabled?: boolean;
  options?: SelectOptionProps[];
  placeholder?: string;
  loading?: boolean;
  clearable?: boolean;
  clearSelectionLabel?: string;
  size: 'base' | 's' | 'none';
  theme: 'dark' | 'light' | 'none';
  state?: 'none' | 'error' | 'valid';
  onChange?: (selection: string) => void;
}
