import {
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';

import { Media } from 'components/media-query';

import ModalContent from './content';
import { OVERLAY_CLASSES } from './content/constants';
import { ModalProps } from './types';

export const Modal = (props: ModalProps) => {
  const { open, onOpenChange, dismissable } = props;
  const { floating, context } = useFloating({
    open,
    onOpenChange,
  });

  const { getFloatingProps } = useInteractions([
    useRole(context),
    useDismiss(context, {
      enabled: dismissable,
    }),
  ]);

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

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingOverlay lockScroll>
            <motion.div
              variants={overlayFramerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={OVERLAY_CLASSES}
            >
              <FloatingFocusManager context={context}>
                <>
                  <Media
                    lessThan="sm"
                    className="absolute flex flex-col w-full h-full pointer-events-none grow"
                  >
                    <ModalContent
                      {...props}
                      viewport=""
                      floating={floating}
                      getFloatingProps={getFloatingProps}
                    />
                  </Media>
                  <Media
                    greaterThanOrEqual="sm"
                    className="absolute flex flex-col w-full h-full pointer-events-none grow"
                  >
                    <ModalContent
                      {...props}
                      viewport="sm"
                      floating={floating}
                      getFloatingProps={getFloatingProps}
                    />
                  </Media>
                </>
              </FloatingFocusManager>
            </motion.div>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
};

export default Modal;
