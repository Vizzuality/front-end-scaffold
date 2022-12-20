import { FC, PropsWithChildren } from 'react';

import cx from 'classnames';

import type { LegendItemProps } from './types';

type LegendItemPropsWithChildren = PropsWithChildren<LegendItemProps>;

export const LegendItem: FC<LegendItemPropsWithChildren> = ({
  id,
  name,
  description,
  icon,
  children,
}: LegendItemPropsWithChildren) => (
  <div key={id} className="py-2.5 px-5">
    <div className="flex">
      <div
        className={cx({
          relative: true,
          'pl-5': icon,
        })}
      >
        {icon && <div className="absolute top-0 left-0">{icon}</div>}
        <div className="font-heading text-sm text-white">{name}</div>
      </div>
    </div>

    <div className="text-sm text-gray-300">{description}</div>

    {children && <div className="mt-2.5">{children}</div>}
  </div>
);

export default LegendItem;
