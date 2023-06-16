import React, { useEffect, useRef, useState } from "react";
import { Arrow } from "react-konva";
import { Anchor } from "./Anchor";
import { KonvaEventObject } from "konva/lib/Node";

import { Arrow as ArrowType } from "konva/lib/shapes/Arrow";
import { useAppSelector } from "../../store/hooks";
import { set } from "react-hook-form";
import { SignalCellularConnectedNoInternet4BarRounded } from "@mui/icons-material";
import { LineTypes } from "../../store/slices/canvas-slice";

export const LineComponent = ({
  points,
  active,
  setSelectId,
  setPoints,
  index,
  color,
  setColor,
  line,
  setLineType,
}: {
  line: LineTypes;
  points: number[];
  active: number | undefined;
  setSelectId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPoints: (numbers: number[], index: number) => void;
  index: number;
  color: string;
  setColor: (color: string, index: number) => void;
  setLineType: (line: LineTypes, index: number) => void;
}) => {
  const reduxColor = useAppSelector((state) => state.canvas.color);
  const lineType = useAppSelector((state) => state.canvas.lineType);
  const ref = useRef<ArrowType>(null);
  const reducePoints = (acc: number[][], num: number, index: number) => {
    if (index % 2 === 0) {
      acc.push([num]);
    } else {
      acc[acc.length - 1].push(num);
    }
    return acc;
  };
  const dragAnchor = (e: KonvaEventObject<DragEvent>, i: number) => {
    const pointsArray = [...points];
    if (i === 0) {
      pointsArray[i] = e.target.x();
      pointsArray[i + 1] = e.target.y();
    } else {
      pointsArray[i * 2] = e.target.x();
      pointsArray[i * 2 + 1] = e.target.y();
    }
    setPoints(pointsArray, index);
  };

  const deletePoint = (i: number) => {
    const pointsArray = [...points];
    if (i === 0) {
      pointsArray.splice(i, 2);
    } else {
      pointsArray.splice(i * 2, 2);
    }
    setPoints(pointsArray, index);
  };

  const findNearestPoint = (x: number, y: number) => {
    let pointIndex = 0;
    let abs = Number.MAX_VALUE;
    points.forEach((elem, index, arr) => {
      if (index % 2 === 0) {
        const middlePoint = Math.abs(elem - x) + Math.abs(arr[index + 1] - y);
        if (middlePoint < abs) {
          pointIndex = index;
          abs = middlePoint;
        }
      }
    });
    return pointIndex;
  };

  const onDbClick = (e: KonvaEventObject<MouseEvent>) => {
    const x = e.evt.offsetX;
    const y = e.evt.offsetY;
    const pointIndex = findNearestPoint(x, y);
    const newPoints = [...points];
    newPoints.splice(pointIndex + 2, 0, x, y);
    setPoints(newPoints, index);
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
    if (index === active) {
      setColor(reduxColor, index);
    }
  }, [reduxColor]);

  useEffect(() => {
    if (index === active) {
      setLineType(lineType, index);
    }
  }, [lineType]);

  return (
    <>
      <Arrow
        ref={ref}
        points={points}
        stroke={color}
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        fill={color}
        pointerLength={20}
        pointerWidth={20}
        dash={setLineDash(line)}
        onClick={(e) => {
          setSelectId(index);
        }}
        onDblClick={onDbClick}
      />
      {index === active &&
        points.reduce(reducePoints, []).map(([x, y], index) => {
          return (
            <Anchor
              key={index}
              x={x}
              y={y}
              dragFunction={(x) => dragAnchor(x, index)}
              deleteAnchor={() => deletePoint(index)}
            />
          );
        })}
    </>
  );
};
