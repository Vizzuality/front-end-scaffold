import { ReactElement } from 'react';

import { FlickingOptions, FlickingProps } from '@egjs/react-flicking';

export interface CarouselProps extends Partial<FlickingProps> {
  slide: number;
  slides: {
    id: string | number;
    content?: ReactElement;
  }[];
  autoplay?: boolean | number;
  options?: Partial<FlickingOptions>;
}
