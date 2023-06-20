export interface PaddleObject<T> {
  x: T;
  y: T;
  height: T;
  width: T;
  colors: string[];
  changeX: (x: number) => void;
  setY: (x: number) => void;
}

export const MyPaddle: PaddleObject<number> = {
  x: 100,
  y: 0,
  height: 20,
  width: 100,
  colors: ["orange"],
  changeX(x: number) {
    this.x = x;
  },
  setY(y: number) {
    this.y = y;
  },
};

export const Counter = {
  count: 0,
  gameOver: false,
  setZero() {
    this.count = 0;
  },
  addOne() {
    this.count += 1;
  },
};

export const paddleMove = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  paddleProps: PaddleObject<number>
) => {
  class Paddle {
    constructor(
      public x: number,
      public y = canvas.height - 20,
      public height = 20,
      public width = paddleProps.width,
      public colors = ["red", "#ffa62b"]
    ) {}

    move() {
      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.lineWidth = 1;
      context.shadowBlur = 0;
      context.shadowColor = "blue";
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.fill();
    }
  }
  const paddle = new Paddle(paddleProps.x);
  if (paddleProps.x <= 0) paddleProps.x = 0;
  if (paddleProps.x + paddleProps.width >= canvas.width)
    paddleProps.x = canvas.width - paddleProps.width;
  paddle.move();
};
