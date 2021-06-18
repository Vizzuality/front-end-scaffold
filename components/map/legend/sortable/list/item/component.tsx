import { FC } from 'react';
import cx from 'classnames';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { SortableItemProps } from './types';

export const SortableItem: FC<SortableItemProps> = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

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
