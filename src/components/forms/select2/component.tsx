import { forwardRef } from 'react';

import cx from 'classnames';

import { THEME } from './constants';
import type { Select2Props } from './types';

function Select2Component({ htmlFor, theme = 'dark', children, className }: Select2Props, ref) {
  return (
    <label
      className={cx({
        [THEME[theme]]: true,
        [className]: !!className,
      })}
      htmlFor={htmlFor}
      ref={ref}
    >
      {children}
    </label>
  );
}

export const Select2 = forwardRef<HTMLLabelElement, Select2Props>(Select2Component);

export default Select2;
