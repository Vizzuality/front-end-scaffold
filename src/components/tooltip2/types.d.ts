import { Placement } from '@floating-ui/react-dom-interactions';

export interface TooltipProps {
  children: JSX.Element;
  content: JSX.Element;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  arrowProps?: {
    enabled?: boolean;
    size: number;
    className?: string;
  };
  portalProps?: {
    enabled?: boolean;
    id?: string;
    root?: HTMLElement;
  };
}
