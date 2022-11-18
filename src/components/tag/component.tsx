import { FC } from 'react';

import cx from 'classnames';

import type { TagProps } from './types';

export const Tag: FC<TagProps> = ({ children, className }: TagProps) => (
  <div
    className={cx({
      'relative inline-flex rounded': true,
      [`${className}`]: !!className,
      'bg-gray-200 text-black': !className,
    })}
  >
    <div
      className={cx({
        'flex-col px-2 py-1 text-sm leading-none': true,
      })}
    >
      <div className="flex-1">{children}</div>
    </div>
  </div>
);

export default Tag;
