import { FC } from 'react';

import cx from 'classnames';

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
    <ul className="flex flex-col w-full space-y-1">
      {items.map(({ value, color }) => (
        <li key={`${value}`} className="flex space-x-2 text-xs">
          <div
            className="shrink-0 w-3 h-3 mt-0.5 rounded"
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
