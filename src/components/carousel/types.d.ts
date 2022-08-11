import { ReactElement } from 'react';

export interface CarouselProps {
  slides: {
    id: string | number;
    content?: ReactElement;
  }[];
}
