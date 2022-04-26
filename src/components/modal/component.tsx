import { FC } from 'react';

import { usePreventScroll, OverlayContainer } from '@react-aria/overlays';
import { AnimatePresence } from 'framer-motion';

import { Media } from 'components/media-query';

import ModalContent from './content';
import type { ModalProps } from './types';

export const Modal: FC<ModalProps> = (props: ModalProps) => {
  const { open } = props;

  usePreventScroll({ isDisabled: !open });

  return (
    <AnimatePresence>
      {open && (
        <OverlayContainer>
          <Media lessThan="sm">
            <ModalContent {...props} viewport="" />
          </Media>
          <Media greaterThanOrEqual="sm">
            <ModalContent {...props} viewport="sm" />
          </Media>
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default Modal;
