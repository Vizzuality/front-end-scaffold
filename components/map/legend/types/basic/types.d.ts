type LegendTypeItem = {
  value: string;
  color: string;
};

export interface LegendTypeBasicProps {
  className?: string;
  items: Array<LegendTypeItem>;
}
