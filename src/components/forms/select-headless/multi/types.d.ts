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
  values?: string[];
  loading?: boolean;
  onSelect?: (selection: string[]) => void;
}
