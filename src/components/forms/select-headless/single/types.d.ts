export interface SingleSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  disabled?: boolean;
  value: string;
  options?: SelectOptionProps[];
  placeholder?: string;
  loading?: boolean;
  selected?: string;
  clearable?: boolean;
  clearSelectionLabel?: string;
  size: 'base' | 's';
  theme: 'dark' | 'light';
  onSelect?: (selection: string) => void;
}
