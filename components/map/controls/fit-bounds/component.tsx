import { FC, useCallback } from 'react';
import cx from 'classnames';

import Icon from 'components/icon';

import FIT_BOUNDS_SVG from 'svgs/map/fit-bounds.svg?sprite';

import { FitBoundsControlProps } from './types';

export const FitBoundsControl: FC<FitBoundsControlProps> = ({
  bounds,
  className,
  onFitBoundsChange,
}: FitBoundsControlProps) => {
  const handleFitBoundsChange = useCallback(() => {
    onFitBoundsChange(bounds);
  }, [bounds, onFitBoundsChange]);

  return (
    <button
      aria-label="Fit to bounds"
      className={cx({
        'mb-0.5 px-0.5 py-1 rounded-3xl text-white bg-black': true,
        'hover:bg-gray-700 active:bg-gray-600': !!bounds,
        'opacity-50 cursor-default': !bounds,
        [className]: !!className,
      })}
      type="button"
      disabled={!bounds}
      onClick={handleFitBoundsChange}
    >
      <Icon icon={FIT_BOUNDS_SVG} />
    </button>
  );
};

export default FitBoundsControl;
