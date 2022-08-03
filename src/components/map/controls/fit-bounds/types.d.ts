import type { Bounds } from '../../types';

export interface FitBoundsControlProps {
  bounds?: Bounds;
  className?: string;
  onFitBoundsChange: (bounds: Bounds) => void;
}
