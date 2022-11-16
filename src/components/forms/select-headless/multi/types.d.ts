export interface MultiSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  batchSelectionActive?: boolean;
  batchSelectionLabel?: string;
  clearSelectionActive?: boolean;
  clearSelectionLabel?: string;
  disabled?: boolean;
  options?: SelectOptionProps[];
  placeholder?: string;
  size: 'base' | 's';
  theme: 'dark' | 'light';
  values?: string[];
  loading?: boolean;
  onSelect?: (selection: string[]) => void;
}
