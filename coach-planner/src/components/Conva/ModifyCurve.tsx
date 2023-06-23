import { Stage } from 'react-konva';
import { useRef } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  UserActionsValues,
  selectColor,
  selectLineType,
  selectLineWidth,
  selectPlayerType,
  selectUserAction,
} from '../../store/slices/canvas-slice';
import { BackgroundField } from './Background-field';
import { Stage as StageType } from 'konva/lib/Stage';
import { addLine, addPlayer, deleteCurrent, drawLine, setCurrent } from '../../store/slices/draw-objects-slice';

import { DrawArrowLine } from './Draw-arrow-line';
import { Vector2d } from 'konva/lib/types';
import { DrawPlayers } from './Draw-players';
import { useParams } from 'react-router-dom';
import { updateExercise, uploadBlob } from '../../db/exercises';

export const ModifyCurve = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const stageRef = useRef<StageType>(null);
  const action = useAppSelector(selectUserAction);
  const color = useAppSelector(selectColor);
  const lineType = useAppSelector(selectLineType);
  const width = useAppSelector(selectLineWidth);
  const type = useAppSelector(selectPlayerType);
  // const [img, setImg] = useState('');
  const isDrawing = useRef(false);
  const lastPoint = useRef<Vector2d>();

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
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

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
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

  const deleteLine = () => {
    dispatch(deleteCurrent());
  };

  const loadFile = async (file: Blob, id: string | undefined) => {
    if (id) {
      const img = await uploadBlob(file, id);
      await updateExercise(id, { img });
    }
  };

  const handleExport = async () => {
    const uri = stageRef.current;
    dispatch(setCurrent(null));
    if (uri) {
      const blob = (await uri.toBlob()) as Blob;
      loadFile(blob, id);
      // const data = uri.toDataURL()

      // setImg(data);
    }
  };

  return (
    <>
      <button onClick={handleExport}>Load</button>
      <button onClick={deleteLine}>Delete</button>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ position: 'relative' }}
      >
        <BackgroundField />
        <DrawArrowLine />
        <DrawPlayers />
      </Stage>
      {/* {img && <img src={img} alt="" />} */}
    </>
  );
};
