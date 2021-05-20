import {
  Children, cloneElement, FC, isValidElement,
} from 'react';
import cx from 'classnames';

export interface FieldProps {
  id: string;
  label?: string;
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  children?: React.ReactNode;
  className?: string;
}

export const Field: FC<FieldProps> = ({
  id,
  children,
  input,
  meta,
  className,
}: FieldProps) => {
  const getState = (m) => {
    if (m.touched && m.valid) return 'valid';
    if (m.touched && m.error) return 'error';

    return 'none';
  };

  const childrenWithProps = Children.map(children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (isValidElement(child)) {
      const status = getState(meta);

      return cloneElement(child, {
        ...input,
        ...child.props,
        id,
        status,
      });
    }
    return child;
  });

  return (
    <div
      className={cx({
        [className]: !!className,
      })}
    >
      {childrenWithProps}
    </div>
  );
};

export default Field;
