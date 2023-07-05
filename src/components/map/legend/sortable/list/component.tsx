import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  useCallback,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react';

import cx from 'clsx';

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent, Active } from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from './item';

export interface SortableListProps {
  className?: string;
  onChangeOrder: (id: string[]) => void;
}

export const SortableList: FC<PropsWithChildren<SortableListProps>> = ({
  children,
  onChangeOrder,
}: PropsWithChildren<SortableListProps>) => {
  const [activeId, setActiveId] = useState<Active['id']>(null);

  const ActiveItem = useMemo(() => {
    const activeChildArray = Children.map(children, (Child) => {
      if (isValidElement(Child)) {
        const { props } = Child as { props: { id: string } };
        const { id } = props;

        if (id === activeId) {
          return Child;
        }
        return null;
      }
      return null;
    });

    return activeChildArray[0] || null;
  }, [children, activeId]);

  const itemsIds = useMemo<string[] | null>(
    () =>
      Children.map(children, (Child) => {
        if (isValidElement(Child)) {
          const { props } = Child as { props: { id: string } };
          const { id }: { id: string } = props;
          return id;
        }

        return null;
      }),
    [children]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    if (!active) return;
    setActiveId(active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (active.id !== over.id) {
        const oldIndex: number = itemsIds.indexOf(String(active.id));
        const newIndex: number = itemsIds.indexOf(String(over.id));

        if (onChangeOrder) onChangeOrder(arrayMove(itemsIds, oldIndex, newIndex));
      }
    },
    [itemsIds, onChangeOrder]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={itemsIds} strategy={verticalListSortingStrategy}>
        <div
          className={cx({
            'w-full': true,
          })}
        >
          {Children.map(children, (Child) => {
            if (isValidElement(Child)) {
              const {
                props: { id },
              } = Child as { props: { id: string } };
              return <SortableItem id={id}>{cloneElement(Child)}</SortableItem>;
            }
            return null;
          })}
        </div>
      </SortableContext>

      <DragOverlay>{isValidElement(ActiveItem) ? cloneElement(ActiveItem) : null}</DragOverlay>
    </DndContext>
  );
};

export default SortableList;
