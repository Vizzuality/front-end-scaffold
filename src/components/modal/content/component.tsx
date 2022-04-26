import { FC, useRef } from 'react';

import cx from 'classnames';

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, useModal } from '@react-aria/overlays';
import { motion } from 'framer-motion';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import { CONTENT_CLASSES, OVERLAY_CLASSES } from './constants';
import type { ModalContentProps } from './types';

export const ModalContent: FC<ModalContentProps> = ({
  title,
  open,
  dismissable = true,
  size = 'default',
  children,
  scrollable = true,
  className,
  onDismiss,
  viewport,
}: ModalContentProps) => {
  const containerRef = useRef();
  const { overlayProps } = useOverlay(
    {
      isKeyboardDismissDisabled: !dismissable,
      isDismissable: dismissable,
      isOpen: open,
      onClose: onDismiss,
    },
    containerRef
  );
  const { modalProps } = useModal();
  const { dialogProps } = useDialog({ 'aria-label': title }, containerRef);

  const overlayFramerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.125,
      },
    },
  };

  const contentFramerVariants = {
    initial: {
      opacity: 0,
      x: viewport === 'sm' ? '-50%' : '0',
      y: '-60%',
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
      opacity: 0,
      x: viewport === 'sm' ? '-50%' : '0',
      y: '-60%',
      transition: {
        delay: 0,
      },
    },
  };

  return (
    <motion.div
      variants={overlayFramerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cx({ [OVERLAY_CLASSES]: true })}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div {...overlayProps} {...dialogProps} {...modalProps} ref={containerRef}>
          <motion.div
            variants={contentFramerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cx({ [CONTENT_CLASSES[size]]: true, [className]: !!className })}
            style={{
              maxHeight: '90%',
            }}
          >
            {dismissable && (
              <div className="relative">
                <button
                  type="button"
                  onClick={onDismiss}
                  className="absolute flex items-center px-4 py-4 text-sm text-gray-300 right-4 -top-4 focus:text-black hover:text-black"
                >
                  <span className="text-xs">Close</span>
                  <Icon icon={CLOSE_SVG} className="inline-block w-3 h-3 ml-2 text-black" />
                </button>
              </div>
            )}

            {!scrollable && children}
            {scrollable && <div className="overflow-y-auto flex-grow-1">{children}</div>}
          </motion.div>
        </div>
      </FocusScope>
    </motion.div>
  );
};

export default ModalContent;
