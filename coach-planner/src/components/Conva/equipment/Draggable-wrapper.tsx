import { Group } from 'react-konva';
import { Equipment } from '../../../store/slices/constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentId, setCurrent, setPoint } from '../../../store/slices/draw-objects-slice';
import { KonvaEventObject } from 'konva/lib/Node';

export const DraggableWrapper = ({ equipment, children }: { equipment: Equipment; children: React.ReactNode }) => {
  const current = useAppSelector(selectCurrentId);
  const dispatch = useAppDispatch();
  const onDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    if (current === equipment.id) {
      dispatch(setPoint([e.target.x(), e.target.y()]));
    }
  };
  const onDragStart = (e: KonvaEventObject<MouseEvent>) => {
    console.log(e);

    dispatch(setCurrent(equipment.id));
  };
  return (
    <Group
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
      x={equipment.point[0] - 10}
      y={equipment.point[1] - 10}
      width={20}
      height={20}
    >
      {children}
    </Group>
  );
};
