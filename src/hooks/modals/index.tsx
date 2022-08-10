import { useCallback, useState } from 'react';

import type { UseModalReturnProps } from './types';

export function useModal(defaultIsOpen?: boolean): UseModalReturnProps {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = useCallback((): void => {
    setIsOpen(true);
  }, []);

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    open,
    close,
  };
}
