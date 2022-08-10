export type UseModalReturnProps = {
  /**
   * Whether the modal is open
   * */
  isOpen: boolean;
  /**
   * Open the modal
   * */
  open: () => void;
  /**
   * Close the modal
   * */
  close: () => void;
};
