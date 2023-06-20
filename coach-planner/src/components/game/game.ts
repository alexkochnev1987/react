import { Counter } from "./Paddle";
import { BallObject } from "./ball-movement";

interface GameObject {
  x: number;
  y: number;
  height: number;
  width: number;
}

export function collision(objA: GameObject, objB: GameObject) {
  if (
    objA.x + objA.width > objB.x &&
    objA.x < objB.x + objB.width &&
    objA.y + objA.height > objB.y &&
    objA.y < objB.y + objB.height
  ) {
    return true;
  } else {
    return false;
  }
}

export function GameOver(
  ballObj: BallObject<number>,
  canvas: HTMLCanvasElement,
  counter: typeof Counter
) {
  if (ballObj.y + ballObj.rad >= canvas.height) {
    counter.setZero();
    counter.gameOver = true;
  }
}
