import { ReactNode } from 'react';

export interface LegendItemProps {
  id: string;
  name: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}
