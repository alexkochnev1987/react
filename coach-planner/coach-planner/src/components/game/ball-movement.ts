export interface BallObject<T> {
  x: T;
  y: T;
  dx: T;
  dy: T;
  rad: T;
  speed: T;
  height: T;
  width: T;
  change: () => void;
  changeDY: () => void;
  changeDX: () => void;
}

export const SmallBall: BallObject<number> = {
  x: 20,
  y: 200,
  dx: 5,
  dy: 5,
  rad: 10,
  height: 10,
  width: 10,
  speed: 10,
  change() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  },

  changeDY() {
    this.dy = -this.dy;
  },
  changeDX() {
    this.dx = -this.dx;
  },
};

export const ballMovement = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  ballObj: BallObject<number>
) => {
  const ball = new Ball(ballObj.x, ballObj.y, ballObj.rad);
  ball.draw(ctx);
  ballObj.change();
  if (
    ballObj.y - ballObj.rad <= 0 ||
    ballObj.y + ballObj.rad >= canvas.height
  ) {
    ballObj.changeDY();
  }
  if (ballObj.x - ballObj.rad <= 0 || ballObj.x + ballObj.rad >= canvas.width) {
    ballObj.changeDX();
  }
};
class Ball {
  constructor(public x: number, public y: number, public rad: number) {}
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
  }
}
