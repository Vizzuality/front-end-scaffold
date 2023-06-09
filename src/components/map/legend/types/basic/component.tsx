import { FC } from 'react';

import cx from 'clsx';

import type { LegendTypeBasicProps } from './types';

export const LegendTypeBasic: FC<LegendTypeBasicProps> = ({
  className = '',
  items,
}: LegendTypeBasicProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <ul className="flex w-full flex-col space-y-1">
      {items.map(({ value, color }) => (
        <li key={`${value}`} className="flex space-x-2 text-xs">
          <div
            className="mt-0.5 h-3 w-3 shrink-0 rounded"
            style={{
              backgroundColor: color,
            }}
          />
          <div>{value}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeBasic;
