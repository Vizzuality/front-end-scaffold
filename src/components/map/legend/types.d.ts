export interface LegendProps {
  className?: string;
  maxHeight: string | number;
  onChangeOrder: (id: string[]) => void;
}

export type LegendTypeItem = {
  value: string;
  color: string;
};
