import { FC } from 'react';

import cx from 'clsx';

import type { LegendTypeGradientProps } from './types';

export const LegendTypeGradient: FC<LegendTypeGradientProps> = ({
  className = '',
  items,
}: LegendTypeGradientProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <div
      className="flex h-2 w-full"
      style={{
        backgroundImage: `linear-gradient(to right, ${items.map((i) => i.color).join(',')})`,
      }}
    />

    <ul className="mt-1 flex w-full list-none justify-between">
      {items
        .filter(({ value }) => !!value)
        .map(({ value }) => (
          <li key={`${value}`} className="shrink-0 text-xs">
            {value}
          </li>
        ))}
    </ul>
  </div>
);

export default LegendTypeGradient;
