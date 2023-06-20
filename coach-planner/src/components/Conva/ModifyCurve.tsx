import { Layer, Stage } from "react-konva";
import { RefObject, useMemo, useRef, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { LineComponent } from "./Line";
import { useAppSelector } from "../../store/hooks";
import { LineTypes, UserActionsValues } from "../../store/slices/canvas-slice";
import { BackgroundField } from "./Background-field";
import { Stage as StageType } from "konva/lib/Stage";

export const ModifyCurve = () => {
  const stageRef = useRef<StageType>(null);
  const pointsRef = useRef<number[]>([]);
  const action = useAppSelector((state) => state.canvas.userAction);
  const color = useAppSelector((state) => state.canvas.color);
  const lineType = useAppSelector((state) => state.canvas.lineType);
  const [selectId, setSelectId] = useState<number>();

  const isDrawing = useRef(false);
  const [lines, setLines] =
    useState<{ points: number[]; color: string; line: LineTypes }[]>();
  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (action === UserActionsValues.select) {
      return;
    }
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage) {
      const pos = stage.getPointerPosition();
      if (pos) {
        const newLines = lines
          ? [...lines, { points: [pos.x, pos.y], color: color, line: lineType }]
          : [{ points: [pos.x, pos.y], color: color, line: lineType }];
        setLines(newLines);
      }
    }
  };
  const debounce = (fn: Function, ms: number) => {
    let timer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      const callFn = () => fn.apply(this, args);
      clearTimeout(timer);
      timer = setTimeout(callFn, ms);
    };
  };

  const throttle = (fn: Function, ms: number) => {
    let isThrottle = false;
    let savedArgs: any[] | null;
    let savedThis: any | null;
    function wrapper(this: any, ...arg: any[]) {
      if (isThrottle) {
        savedArgs = arg;
        savedThis = this;
        return;
      }
      fn.apply(this, arg);
      isThrottle = true;
      setTimeout(() => {
        isThrottle = false;
        if (savedArgs && savedThis) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    if (stage) {
      const point = stage.getPointerPosition();
      if (lines) {
        const lastLine = lines[lines.length - 1];

        if (point) {
          if (lastLine) {
            const lastX = lastLine.points[lastLine.points.length - 2];
            const lastY = lastLine.points[lastLine.points.length - 1];
            const points = pointsRef.current;
            points.push(point.x, point.y);
            pointsRef.current = points;
            console.log(pointsRef.current);

            if (Math.abs(lastX - point.x) > 30) {
              lastLine.points = lastLine.points.concat([point.x, point.y]);
            } else {
              if (Math.abs(lastY - point.y) > 30) {
                lastLine.points = lastLine.points.concat([point.x, point.y]);
              }
            }

            lines.splice(lines.length - 1, 1, lastLine);
            setLines(lines.concat());
          }
        }
      }
    }
  };

  const trot = throttle(handleMouseMove, 500);

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const setPoints = (numbers: number[], index: number) => {
    if (lines) {
      const newLines = [...lines];
      newLines[index].points = numbers;
      setLines(newLines);
    }
  };

  const setColor = (color: string, index: number) => {
    if (lines) {
      const newLines = [...lines];
      newLines[index].color = color;
      setLines(newLines);
    }
  };

  const setLineType = (line: LineTypes, index: number) => {
    if (lines) {
      const newLines = [...lines];
      newLines[index].line = line;
      setLines(newLines);
    }
  };

  const deleteLine = () => {
    if (lines) {
      const newLines = [...lines];
      if (selectId || selectId === 0) newLines?.splice(selectId, 1);
      setLines(newLines);
      setSelectId(undefined);
    }
  };

  const handleExport = () => {
    const uri = stageRef.current;
    if (uri) {
      const data = uri.toDataURL();
      console.log(data);
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
        // onMousemove={handleMouseMove}
        onMouseMove={trot}
        onMouseup={handleMouseUp}
        style={{ position: "relative" }}
      >
        <BackgroundField />
        <Layer>
          {lines &&
            lines.map((line, i) => (
              <LineComponent
                setLineType={setLineType}
                line={line.line}
                setColor={setColor}
                color={line.color}
                index={i}
                setPoints={setPoints}
                points={line.points}
                active={selectId}
                setSelectId={setSelectId}
                key={i}
              />
            ))}
        </Layer>
      </Stage>
    </>
  );
};
