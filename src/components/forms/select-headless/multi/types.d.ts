export interface MultiSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  batchSelectionActive?: boolean;
  batchSelectionLabel?: string;
  clearSelectionActive?: boolean;
  clearSelectionLabel?: string;
  disabled?: boolean;
  options?: SelectOptionProps[];
  placeholder?: string;
  size: 'base' | 's' | 'none';
  theme: 'dark' | 'light' | 'none';
  state?: 'none' | 'error' | 'valid';
  values?: string[];
  loading?: boolean;
  onChange?: (selection: string[]) => void;
}
