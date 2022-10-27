import { FC } from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import { CONTENT_CLASSES } from './constants';
import type { ModalContentProps } from './types';

export const ModalContent: FC<ModalContentProps> = ({
  size = 'default',
  children,
  className,
  viewport,
  floating,
  getFloatingProps,
  onOpenChange,
}: ModalContentProps) => {
  const contentFramerVariants = {
    initial: {
      opacity: 0,
      x: viewport === 'sm' ? '-50%' : '0',
      y: viewport === 'sm' ? '-60%' : '-52.5%',
    },
    animate: {
      opacity: 1,
      x: viewport === 'sm' ? '-50%' : '0',
      y: '-50%',
      transition: {
        delay: 0.125,
      },
    },
    exit: {
      x: viewport === 'sm' ? '-50%' : '0',
      y: viewport === 'sm' ? '-60%' : '-52.5%',
      transition: {
        delay: 0,
        duration: 0.25,
      },
    },
  };

  return (
    <motion.div
      variants={contentFramerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cx({ [CONTENT_CLASSES[size]]: true, [className]: !!className })}
      {...getFloatingProps({
        ref: floating,
      })}
    >
      <div className="relative flex grow flex-col overflow-hidden">
        <button
          type="button"
          onClick={() => {
            onOpenChange(false);
          }}
          className="absolute top-6 right-6 flex items-center px-4 py-4 text-sm text-gray-300"
        >
          <Icon icon={CLOSE_SVG} className="inline-block h-3 w-3 text-black" />
        </button>

        {children}
      </div>
    </motion.div>
  );
};

export default ModalContent;
