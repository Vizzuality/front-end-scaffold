import { ViewportProps } from 'react-map-gl';

export interface ZoomControlProps {
  viewport: Partial<ViewportProps>;
  className?: string;
  onZoomChange: (zoom: number) => void;
}
