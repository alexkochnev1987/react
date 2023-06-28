import { Stage } from 'react-konva';
import { useRef } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectColor,
  selectEquipmentType,
  selectLineType,
  selectLineWidth,
  selectPlayerType,
  selectUserAction,
} from '../../store/slices/canvas-slice';
import { BackgroundField } from './Background-field';
import { Stage as StageType } from 'konva/lib/Stage';
import { DrawArrowLine } from './Draw-arrow-line';
import { Vector2d } from 'konva/lib/types';
import { DrawPlayers } from './Draw-players';
import { useParams } from 'react-router-dom';
import { UserActionsValues } from '../../store/slices/constants';
import {
  addEquipment,
  addLine,
  addPlayer,
  drawLine,
  saveImage,
  setCurrent,
} from '../../store/slices/draw-objects-slice';
import { UserActions } from '../draw/User-actions';
import { DrawEquipment } from './Draw-equipment';
import { SaveImageButtons } from './Save-image-button';
import { Box } from '@mui/material';

export const ModifyCurve = () => {
  const { id } = useParams();
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

  const saveImageHandler = async () => {
    const uri = stageRef.current;
    dispatch(setCurrent(null));
    if (uri) {
      const file = (await uri.toBlob()) as Blob;
      dispatch(saveImage({ file, id }));
    }
  };

  return (
    <>
      <Box display={'flex'} alignItems="center" justifyContent="space-between">
        <UserActions />
        <SaveImageButtons saveImage={saveImageHandler} />
      </Box>
      <Stage
        ref={stageRef}
        width={640}
        height={320}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ position: 'relative' }}
      >
        <BackgroundField />
        <DrawArrowLine />
        <DrawPlayers />
        <DrawEquipment />
      </Stage>
    </>
  );
};
