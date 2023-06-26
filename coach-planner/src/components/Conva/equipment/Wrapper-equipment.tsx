import React, { useEffect, useRef } from 'react';
import { Equipment } from '../../../store/slices/constants';
import { Group, Transformer } from 'react-konva';
import { setCurrent, setPoint, setRotation } from '../../../store/slices/draw-objects-slice';
import { useAppDispatch } from '../../../store/hooks';
import { KonvaEventObject } from 'konva/lib/Node';

export const WrapperEquipment = ({
  equipment,
  current,
  children,
}: {
  equipment: Equipment;
  current: string | null;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const trRef = useRef<any>(null);
  const shapeRef = useRef(null);

  const onClick = () => {
    dispatch(setCurrent(equipment.id));
  };

  const onDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    if (current === equipment.id) {
      dispatch(setPoint([e.target.x(), e.target.y()]));
    }
  };

  useEffect(() => {
    if (current === equipment.id) {
      if (trRef.current) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [current, equipment.id]);
  return (
    <>
      <Group
        rotation={equipment.rotation}
        onDragEnd={onDragEnd}
        onClick={onClick}
        draggable
        x={equipment.point[0] - 10}
        y={equipment.point[1] - 10}
        width={20}
        height={20}
        ref={shapeRef}
        onTransformEnd={(e) => {
          dispatch(setRotation(e.target.rotation()));
        }}
      >
        {children}
      </Group>
      {current === equipment.id && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }

            return newBox;
          }}
        />
      )}
    </>
  );
};
