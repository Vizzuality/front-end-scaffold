import { cloneElement, Fragment, useRef, useState } from 'react';

import cx from 'classnames';

import {
  arrow,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useClick,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';

import { TooltipProps } from './types';

export const Tooltip = ({
  children,
  content,
  trigger = 'hover',
  placement = 'top',
  arrowProps = {
    enabled: false,
    size: 8,
    className: 'bg-white',
  },
  portalProps = {
    enabled: true,
  },
}: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const arrowRef = useRef<HTMLDivElement>(null);

  const { x, y, reference, floating, strategy, context, middlewareData } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(5),
      flip(),
      shift({ padding: 8 }),
      ...(arrowRef.current && arrowProps.enabled
        ? [
            arrow({
              element: arrowRef.current,
            }),
          ]
        : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: trigger === 'hover',
      restMs: 40,
    }),
    useClick(context, {
      enabled: trigger === 'click',
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  // Portal
  const Portal = portalProps.enabled ? FloatingPortal : Fragment;

  // Arrow
  const { arrow: arrowStyle = {} as any } = middlewareData;
  const { x: arrowX, y: arrowY } = arrowStyle;

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]];

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}

      <Portal {...portalProps}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              {...getFloatingProps({
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? '',
                  left: x ?? '',
                },
              })}
            >
              {content}

              {arrowProps.enabled && (
                <div
                  ref={arrowRef}
                  className={cx({
                    'absolute rotate-45 bg-white': true,
                    [arrowProps.className]: true,
                  })}
                  style={{
                    width: arrowProps.size,
                    height: arrowProps.size,
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: -arrowProps.size / 2,
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default Tooltip;
