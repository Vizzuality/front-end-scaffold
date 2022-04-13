import { FC } from 'react';

import cx from 'classnames';

import type { LegendTypeChoroplethProps } from './types';

export const LegendTypeChoropleth: FC<LegendTypeChoroplethProps> = ({
  className = '',
  items,
}: LegendTypeChoroplethProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <ul className="flex w-full">
      {items.map(({ color }) => (
        <li
          key={`${color}`}
          className="h-2 shrink-0"
          style={{
            width: `${100 / items.length}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </ul>

    <ul className="flex w-full mt-1">
      {items.map(({ value }) => (
        <li
          key={`${value}`}
          className="text-xs text-center shrink-0"
          style={{
            width: `${100 / items.length}%`,
          }}
        >
          {value}
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeChoropleth;
