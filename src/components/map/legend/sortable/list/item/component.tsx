import { FC, PropsWithChildren } from 'react';

import cx from 'clsx';

import { useSortable, UseSortableArguments } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { SortableItemProps } from './types';

type SortableItemPropsWithChildren = PropsWithChildren<SortableItemProps>;

export const SortableItem: FC<SortableItemPropsWithChildren> = ({
  id,
  children,
}: SortableItemPropsWithChildren) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  } as UseSortableArguments);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cx({
        'opacity-0': isDragging,
      })}
    >
      {children}
    </div>
  );
};

export default SortableItem;
