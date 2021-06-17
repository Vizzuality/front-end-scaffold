import cx from 'classnames';
import { forwardRef } from 'react';
import { LabelProps } from './types';

const THEME = {
  dark: 'block font-heading font-medium text-xs text-white',
  light: 'block font-heading font-medium text-xs text-gray-600',
};

const LabelComponent = ({ htmlFor, theme = 'dark', children, className }: LabelProps, ref) => (
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

export const Label = forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);

export default Label;
