import { FC, useCallback, useState } from 'react';

import cx from 'classnames';

import { useId } from '@react-aria/utils';

import Icon from 'components/icon';

import LEGEND_SVG from 'svgs/map/legend.svg?sprite';
import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

import SortableList from './sortable/list';
import type { LegendProps } from './types';

export const Legend: FC<LegendProps> = ({
  children,
  className = '',
  maxHeight,
  onChangeOrder,
}: LegendProps) => {
  const [active, setActive] = useState(true);

  const id = useId();

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div
      className={cx({
        'flex grow flex-col rounded-3xl bg-black': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        aria-expanded={active}
        aria-controls={id}
        className="font-heading relative flex w-full items-center space-x-2 px-5 py-3 text-xs uppercase text-white"
        onClick={onToggleActive}
      >
        <Icon icon={LEGEND_SVG} className="h-4 w-4 text-gray-300" />
        <span>Legend</span>

        <Icon
          icon={ARROW_DOWN_SVG}
          className={cx({
            'absolute top-1/2 right-5 h-3 w-3 -translate-y-1/2 transform text-blue-500 transition-transform':
              true,
            'rotate-180': active,
          })}
        />
      </button>

      {active && (
        <div
          className="relative flex grow flex-col overflow-hidden rounded-3xl"
          style={{
            maxHeight,
          }}
        >
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-4 w-full bg-gradient-to-b from-black via-black" />
          <div className="overflow-y-auto overflow-x-hidden">
            <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-3 w-full bg-gradient-to-t from-black via-black" />
        </div>
      )}
    </div>
  );
};

export default Legend;
