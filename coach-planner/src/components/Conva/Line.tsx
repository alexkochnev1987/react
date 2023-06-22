import { useEffect, useRef } from 'react';
import { Arrow } from 'react-konva';
import { Anchor } from './Anchor';
import { KonvaEventObject } from 'konva/lib/Node';

import { Arrow as ArrowType } from 'konva/lib/shapes/Arrow';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  LineTypes,
  UserActionsValues,
  selectColor,
  selectLineType,
  selectLineWidth,
  selectUserAction,
} from '../../store/slices/canvas-slice';
import {
  ArrowLine,
  changeLine,
  setCurrent,
  setLineColor,
  setLineType,
  setLineWidth,
} from '../../store/slices/draw-objects-slice';
import { findNearestPoint } from './helpers';

export const LineComponent = ({ current, line }: { line: ArrowLine; current: string | null }) => {
  const userAction = useAppSelector(selectUserAction);
  const lineColor = useAppSelector(selectColor);
  const lineType = useAppSelector(selectLineType);
  const lineWidth = useAppSelector(selectLineWidth);
  const dispatch = useAppDispatch();
  const ref = useRef<ArrowType>(null);
  const reducePoints = (acc: number[][], num: number, index: number) => {
    if (index % 2 === 0) {
      acc.push([num]);
    } else {
      acc[acc.length - 1].push(num);
    }
    return acc;
  };
  const dragAnchor = (e: KonvaEventObject<DragEvent>, i: number, points: number[]) => {
    const pointsArray = [...points];
    if (i === 0) {
      pointsArray[i] = e.target.x();
      pointsArray[i + 1] = e.target.y();
    } else {
      pointsArray[i * 2] = e.target.x();
      pointsArray[i * 2 + 1] = e.target.y();
    }
    dispatch(changeLine(pointsArray));
  };

  const deletePoint = (i: number, points: number[]) => {
    const pointsArray = [...points];
    if (i === 0) {
      pointsArray.splice(i, 2);
    } else {
      pointsArray.splice(i * 2, 2);
    }
    dispatch(changeLine(pointsArray));
  };

  const selectCurrent = () => {
    if (userAction === UserActionsValues.select) dispatch(setCurrent(line.id));
  };

  const onDbClick = (e: KonvaEventObject<MouseEvent>, points: number[]) => {
    const x = e.evt.offsetX;
    const y = e.evt.offsetY;
    const pointIndex = findNearestPoint(x, y, points);
    const newPoints = [...points];
    newPoints.splice(pointIndex + 2, 0, x, y);
    dispatch(changeLine(newPoints));
  };

  const setLineDash = (line: LineTypes) => {
    if (line === LineTypes.pass) {
      return [0.5, 15];
    }
    if (line === LineTypes.forwardPuck) {
      return [0.5, 10, 15, 10];
    }

    if (line === LineTypes.backwardPuck) {
      return [4, 10, 4, 10, 25, 10];
    }
    return [];
  };

  useEffect(() => {
    if (current === line.id) {
      dispatch(setLineType(lineType));
    }
  }, [current, dispatch, line.id, lineType]);

  useEffect(() => {
    if (current === line.id) {
      dispatch(setLineColor(lineColor));
    }
  }, [current, dispatch, line.id, lineColor]);

  useEffect(() => {
    if (current === line.id) {
      dispatch(setLineWidth(lineWidth));
    }
  }, [current, dispatch, line.id, lineWidth]);

  return (
    <>
      <Arrow
        ref={ref}
        points={line.points}
        stroke={line.color}
        strokeWidth={2 * line.width}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        fill={line.color}
        pointerLength={20}
        pointerWidth={20}
        dash={setLineDash(line.line)}
        onClick={selectCurrent}
        onDblClick={(e) => onDbClick(e, line.points)}
        onMouseOver={(e: KonvaEventObject<MouseEvent>) => {
          document.body.style.cursor = 'pointer';
          const width = e.currentTarget.getAttr('strokeWidth');
          e.currentTarget._setAttr('strokeWidth', width * 1.5);
        }}
        onMouseOut={(e: KonvaEventObject<MouseEvent>) => {
          document.body.style.cursor = 'pointer';
          const width = e.currentTarget.getAttr('strokeWidth');
          e.currentTarget._setAttr('strokeWidth', width / 1.5);
        }}
      />
      {current === line.id &&
        line.points.reduce(reducePoints, []).map(([x, y], index) => {
          return (
            <Anchor
              key={index}
              x={x}
              y={y}
              dragFunction={(x) => dragAnchor(x, index, line.points)}
              deleteAnchor={() => deletePoint(index, line.points)}
            />
          );
        })}
    </>
  );
};
