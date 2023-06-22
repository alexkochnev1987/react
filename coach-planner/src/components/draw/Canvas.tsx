import { Box, Button, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ColorTypes, UserActionsValues } from '../../store/slices/canvas-slice';
import { CanvasBackground } from './Canvas-background';

import { CanvasGame } from '../game/Canvas-game';
import { Circles } from './Tools/Player';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserActions } from './User-actions';
import { QuadraticCurveProps, QuadraticCurves } from './Tools/Curve';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  // const lineType = useAppSelector((state) => state.canvas.lineType);
  const userAction = useAppSelector((state) => state.canvas.userAction);
  const color = useAppSelector((state) => state.canvas.color);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  const [openGame, setOpenGame] = useState(false);
  const [circles, setCircles] = useState<Circles>();
  const [curves, setCurves] = useState<QuadraticCurves>();
  const [startCoordinates, setStartCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      const circles = new Circles(canvas, context);
      setCircles(circles);
      const curves = new QuadraticCurves(canvas, context);
      setCurves(curves);
    }
  }, [openGame]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setStartCoordinates({ x, y });
      context.beginPath();
      context.moveTo(x, y);
      if (userAction === UserActionsValues.drag) {
        // circles?.startDragging(x, y);
        return;
      }
      if (userAction === UserActionsValues.select) {
        // circles?.isCircleSelected(x, y);
        return;
      }
      if (userAction === UserActionsValues.polyline) {
        const curveProps: QuadraticCurveProps = {
          x,
          y,
          color,
        };
        curves?.addCurve(curveProps);
        return;
      }
    }
  };

  const drawLine = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const context = canvas.getContext('2d')!;

      if (isDrawing) {
        if (userAction === UserActionsValues.polyline) {
          curves?.changeCurve(x, y);
          return;
        }
        if (userAction === UserActionsValues.drag) {
          // circles?.movePlayer(x, y);

          return;
        }
        if (userAction === UserActionsValues.select) {
          // circles?.setColor(color);
          curves?.isLineSelected(x, y);
          return;
        }
        if (color === ColorTypes.white) {
          const shift = lineWidth * 5;
          context.clearRect(x - shift, y - shift, shift * 2, shift * 2);
        } else {
          context.strokeStyle = color;
          context.fillStyle = color;
          context.lineWidth = lineWidth * 2;
          context.lineTo(x, y);
          context.stroke();
          context.beginPath();
          context.arc(x, y, lineWidth, 0, Math.PI * 2);
          context.fill();
          context.beginPath();
          context.moveTo(x, y);
        }
      }
    }
  };

  const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    if (userAction === UserActionsValues.drag) {
      circles?.stopDragging();
    }
    if (userAction === UserActionsValues.polyline) {
      curves?.stopDrawingCurve();
    }
  };

  const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d')!;
    context.resetTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const deleteLine = (lineIndex: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      clearCanvas(canvas);
    }
  };

  const selectCursorType = () => {
    if (userAction === UserActionsValues.drag) return isDrawing ? 'grabbing' : 'grab';
    if (userAction === UserActionsValues.select) return 'default';
    return color === ColorTypes.white ? 'cell' : 'crosshair';
  };

  return (
    <>
      <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
        <Button onClick={() => deleteLine(0)}>Clear</Button>
        <Button onClick={() => setOpenGame((state) => !state)}>ToggleGame</Button>
        <Button onClick={() => circles?.addPlayer(color)}>Add circle</Button>
        {userAction === UserActionsValues.select && (
          <IconButton onClick={() => circles?.deletePlayer()} color="error">
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      <UserActions />

      <Box
        padding={'4px'}
        display={'flex'}
        justifyContent={'center'}
        width={'100%'}
        border={'2px solid'}
        borderColor={'palevioletred'}
      >
        {openGame ? (
          <CanvasGame />
        ) : (
          <canvas
            style={{
              zIndex: 10,
              cursor: selectCursorType(),
              position: 'absolute',
            }}
            onMouseDown={startDrawing}
            onMouseMove={drawLine}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            width={window.innerWidth - 20}
            height={(window.innerWidth - 20) / 2}
            ref={canvasRef}
          ></canvas>
        )}
        <CanvasBackground />
      </Box>
    </>
  );
};
