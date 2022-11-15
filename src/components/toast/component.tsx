import { useCallback, useEffect, useRef } from 'react';

import cx from 'classnames';

import { motion, useAnimation, ResolvedValues } from 'framer-motion';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import { THEME } from './constants';
import type { ToastProps } from './types';

export const Toast: React.FC<ToastProps> = ({
  id,
  content,
  level = 'info',
  autoDismiss = true,
  onDismiss,
}: ToastProps) => {
  const DURATION = 5;
  const controls = useAnimation();
  const progress = useRef(0);

  const ICON = THEME[level || 'info'].icon;

  useEffect(() => {
    if (autoDismiss) {
      controls.start({
        y: '100%',
        transition: { duration: DURATION },
      });
    }
  }, [controls, autoDismiss]);

  const handleProgressUpdate = useCallback(
    (latest: ResolvedValues) => {
      const y2 = parseInt(latest.y as string, 10);
      progress.current = y2 / 100;
    },
    [progress]
  );

  const handleDismiss = useCallback(() => {
    if (onDismiss) {
      onDismiss(id);
    }
  }, [id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        ease: 'anticipate',
        duration: 0.5,
      }}
    >
      <div
        role="alert"
        className={cx({
          'pointer-events-auto mb-2 w-full': true,
        })}
      >
        <div
          className="flex w-full rounded-2xl bg-white p-2 text-gray-500 shadow-md transition hover:ring-4 hover:ring-white hover:ring-opacity-40"
          onMouseEnter={() => {
            controls.stop();
          }}
          onMouseLeave={() => {
            controls.start({
              y: '100%',
              transition: { duration: DURATION - DURATION * progress.current },
            });
          }}
        >
          <div className="flex grow">
            <div
              className={cx({
                'relative z-20 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-md':
                  true,
              })}
            >
              <div
                className={cx({
                  'absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b': true,
                  [THEME[level]?.hoverBg]: true,
                })}
              />
              <motion.div
                className={cx({
                  'absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-b': true,
                  [THEME[level]?.bg]: true,
                })}
                initial={{ y: '0%' }}
                animate={controls}
                onUpdate={handleProgressUpdate}
                onAnimationComplete={handleDismiss}
              />

              <Icon icon={ICON} className="relative z-20 h-5 w-5 self-center" />
            </div>

            <div className="ml-2.5 grow">{content}</div>
          </div>

          <button
            type="button"
            className="ml-5 flex h-10 w-10 shrink-0 items-center justify-center"
            onClick={handleDismiss}
          >
            <Icon icon={CLOSE_SVG} className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;
