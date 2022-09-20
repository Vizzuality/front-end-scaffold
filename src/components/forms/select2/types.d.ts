export interface Select2Props extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  batchSelectionActive?: boolean;
  batchSelectionLabel?: string;
  clearSelectionActive?: boolean;
  clearSelectionLabel?: string;
  disabled?: boolean;
  label?: string | string[];
  multiple?: boolean;
  value: string | string[];
  options?: SelectOptionProps[];
  placeholder?: string;
  prefix?: string;
  selected?: string | string[];
  values?: string | string[];
  onChange?: (selection: string | string[]) => void;
}
