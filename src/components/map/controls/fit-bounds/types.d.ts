import type { CustomMapProps } from '../../types';

export interface FitBoundsControlProps {
  bounds?: CustomMapProps['bounds'];
  className?: string;
  onFitBoundsChange: (bounds: CustomMapProps['bounds']) => void;
}
