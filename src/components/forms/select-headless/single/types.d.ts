export interface SingleSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  value?: string;
  disabled?: boolean;
  options?: SelectOptionProps[];
  placeholder?: string;
  loading?: boolean;
  clearable?: boolean;
  clearSelectionLabel?: string;
  size: 'base' | 's' | 'none';
  theme: 'dark' | 'light' | 'none';
  onChange?: (selection: string) => void;
}
