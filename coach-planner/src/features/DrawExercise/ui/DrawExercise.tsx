import { Stage, Layer } from 'react-konva';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectColor,
  selectEquipmentType,
  selectLineType,
  selectLineWidth,
  selectPlayerType,
  selectUserAction,
} from '../../../store/slices/canvas-slice';
import { DrawEntities } from '../../DrawEntities/DrawEntities';
import { Stage as StageType } from 'konva/lib/Stage';
import { Vector2d } from 'konva/lib/types';
import { UserActionsValues } from '../../../store/slices/constants';
import {
  addEquipment,
  addLine,
  addPlayer,
  drawLine,
  saveImage,
  setCurrent,
  setImage,
} from '../../../store/slices/draw-objects-slice';
import { UserActions } from '@/features/DrawToolbar/ui/UserActions';
import { SaveImageButtons } from '@/entities/DrawActionButtons/SaveImageButton';
import { ExerciseForPage } from '@/service/parseExerciseResponse';
import { AllDrawType } from '../lib/helpers';
export const DrawExercise = ({
  widthKonva,
  exercise,
}: {
  widthKonva: number;
  exercise: ExerciseForPage;
}) => {
  const dispatch = useAppDispatch();
  const stageRef = useRef<StageType>(null);
  const action = useAppSelector(selectUserAction);
  const color = useAppSelector(selectColor);
  const lineType = useAppSelector(selectLineType);
  const width = useAppSelector(selectLineWidth);
  const type = useAppSelector(selectPlayerType);
  const equipment = useAppSelector(selectEquipmentType);
  const isDrawing = useRef(false);
  const lastPoint = useRef<Vector2d>();

  const handleMouseDown = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    if (action === UserActionsValues.select) {
      return;
    }
    const stage = e.target.getStage();
    if (action === UserActionsValues.draw) {
      isDrawing.current = true;
      if (stage) {
        const pos = stage.getPointerPosition();
        if (pos) {
          dispatch(addLine({ points: [pos.x, pos.y], color, line: lineType, width }));
          lastPoint.current = pos;
        }
      }
    }

    if (action === UserActionsValues.addPlayer) {
      if (stage) {
        const pos = stage.getPointerPosition();
        if (pos) {
          dispatch(addPlayer({ point: [pos.x, pos.y], color, type }));
        }
      }
    }

    if (action === UserActionsValues.addEquipment) {
      if (stage) {
        const pos = stage.getPointerPosition();
        if (pos) {
          dispatch(addEquipment({ point: [pos.x, pos.y], color, type: equipment, rotation: 0 }));
        }
      }
    }
  };
  const drawArrowLine = (x: number, y: number) => dispatch(drawLine([x, y]));
  const cutArrowPoints = (currentPoint: Vector2d | null) => {
    const difference = 30;
    if (currentPoint && lastPoint.current) {
      const lastX = lastPoint.current.x;
      const lastY = lastPoint.current.y;

      if (Math.abs(lastX - currentPoint.x) > difference) {
        drawArrowLine(currentPoint.x, currentPoint.y);
        lastPoint.current = currentPoint;
      } else {
        if (Math.abs(lastY - currentPoint.y) > difference) {
          drawArrowLine(currentPoint.x, currentPoint.y);
          lastPoint.current = currentPoint;
        }
      }
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    if (stage) {
      const pos = stage.getPointerPosition();
      cutArrowPoints(pos);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const saveImageHandler = useCallback(async (id: string | undefined) => {
    const uri = stageRef.current;
    dispatch(setCurrent(null));
    if (uri) {
      const file = (await uri.toBlob()) as Blob;
      if (id) dispatch(saveImage({ file, id }));
    }
  }, []);

  useEffect(() => {
    if (exercise.conva) {
      const payload: { konva: AllDrawType; currentSize: number } = {
        konva: exercise.conva,
        currentSize: widthKonva,
      };

      dispatch(setImage(payload));
    }
  }, [dispatch]);

  return (
    <>
      <UserActions {...{ action, color, lineType, width, type, equipment }}>
        <SaveImageButtons saveImage={saveImageHandler} />
      </UserActions>
      <Stage
        ref={stageRef}
        width={widthKonva}
        height={widthKonva / 2}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ position: 'relative' }}
      >
        <Layer>
          <DrawEntities width={widthKonva} height={widthKonva / 2} />
        </Layer>
      </Stage>
    </>
  );
};
