export interface Select2Props extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  disabled?: boolean;
  multiple?: boolean;
  value: string | string[];
  options?: SelectOptionProps[];
  placeholder?: string;
  prefix?: string;
  initialSelected?: string | string[];
  selected?: string | string[];
  initialValues?: string | string[];
  values?: string | string[];
  clearSelectionActive?: boolean;
  clearSelectionLabel?: string;
  batchSelectionActive?: boolean;
  batchSelectionLabel?: string;
  onChange?: (selection: string | string[]) => void;
}
