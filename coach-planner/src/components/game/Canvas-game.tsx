import React, { useEffect, useRef, useState } from "react";
import { Counter, MyPaddle, paddleMove } from "./Paddle";
import { SmallBall, ballMovement } from "./ball-movement";
import { GameOver, collision } from "./game";

export const CanvasGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isGameOver, setGameOver] = useState(true);

  useEffect(() => {
    render();
  }, [isGameOver]);

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas) {
      clearCanvas(canvas);
      if (context) {
        ballMovement(context, canvas, SmallBall);
        paddleMove(canvas, context, MyPaddle);
        MyPaddle.setY(canvas.height - 20);
        if (
          (collision(SmallBall, MyPaddle) && SmallBall.dy < 0) ||
          (collision(SmallBall, MyPaddle) && SmallBall.dy > 0)
        ) {
          SmallBall.changeDY();
          Counter.addOne();
        }
        GameOver(SmallBall, canvas, Counter);
        context.font = "bold 20px Arial";
        context.fillText(`Score:${Counter.count}`, 20, 20);
      }
    }
    const myAnimation = requestAnimationFrame(render);
    if (Counter.gameOver) {
      setGameOver(true);
      cancelAnimationFrame(myAnimation);
    }
  };

  const startGame = () => {
    Counter.gameOver = false;
    setGameOver(false);
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    startGame();
  };

  const drawLine = (event: React.MouseEvent<HTMLCanvasElement>) => {
    MyPaddle.changeX(event.clientX - MyPaddle.width / 2);
  };

  const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {};

  const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d")!;
    context.resetTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <canvas
      style={{
        zIndex: 10,
        position: "absolute",
      }}
      onMouseDown={startDrawing}
      onMouseMove={drawLine}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      width={window.innerWidth - 20}
      height={(window.innerWidth - 20) / 2}
      ref={canvasRef}
    ></canvas>
  );
};
