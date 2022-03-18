import { ViewportProps } from 'react-map-gl';

export interface FitBoundsControlProps {
  bounds?: {
    bbox?: number[];
    options?: Record<string, unknown>;
    viewportOptions?: Partial<ViewportProps>;
  };
  className?: string;
  onFitBoundsChange: (bounds) => void;
}
