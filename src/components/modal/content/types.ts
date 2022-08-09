import { ModalProps } from '../types';

export type ModalContentProps = ModalProps & {
  /** Size of the viewport in which the modal is rendered */
  viewport?: 'sm' | undefined;

  floating: any;
  getFloatingProps: any;
};
