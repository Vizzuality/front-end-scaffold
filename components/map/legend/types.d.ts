export interface LegendProps {
  className?: string;
  children: React.ReactNode;
  maxHeight: string | number;
  onChangeOrder: (id: string[]) => void;
}
