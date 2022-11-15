import { FC, useCallback, MouseEvent } from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import ZOOM_IN_SVG from 'svgs/map/zoom-in.svg?sprite';
import ZOOM_OUT_SVG from 'svgs/map/zoom-out.svg?sprite';

import type { ZoomControlProps } from './types';

export const ZoomControl: FC<ZoomControlProps> = ({ mapRef, className }: ZoomControlProps) => {
  const zoom = mapRef?.getZoom();
  const minZoom = mapRef?.getMinZoom();
  const maxZoom = mapRef?.getMaxZoom();

  const increaseZoom = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!mapRef) return null;

      if (zoom + 1 <= maxZoom) {
        mapRef.zoomIn();
      }
    },
    [mapRef, zoom, maxZoom]
  );

  const decreaseZoom = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!mapRef) return null;

      if (zoom + 1 >= minZoom) {
        mapRef.zoomOut();
      }
    },
    [mapRef, zoom, minZoom]
  );

  return (
    <div
      className={cx({
        'inline-flex flex-col': true,
        [className]: !!className,
      })}
    >
      <button
        className={cx({
          'mb-0.5 rounded-t-3xl bg-black p-0.5 text-white': true,
          'hover:bg-gray-700 active:bg-gray-600': zoom !== maxZoom,
          'cursor-default opacity-50': zoom === maxZoom,
        })}
        aria-label="Zoom in"
        type="button"
        disabled={zoom === maxZoom}
        onClick={increaseZoom}
      >
        <Icon icon={ZOOM_IN_SVG} />
      </button>
      <button
        className={cx({
          'rounded-b-3xl bg-black p-0.5 text-white': true,
          'hover:bg-gray-700 active:bg-gray-600': zoom !== minZoom,
          'cursor-default opacity-50': zoom === minZoom,
        })}
        aria-label="Zoom out"
        type="button"
        disabled={zoom === minZoom}
        onClick={decreaseZoom}
      >
        <Icon icon={ZOOM_OUT_SVG} />
      </button>
    </div>
  );
};

export default ZoomControl;
