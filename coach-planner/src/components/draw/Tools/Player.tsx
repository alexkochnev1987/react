// class Circle {
//   public shiftY: number | null = null;
//   public shiftX: number | null = null;
//   constructor(
//     public x: number,
//     public y: number,
//     public radius: number,
//     public color: string,
//     public isSelected = false
//   ) {}
// }

// export function randomFromTo(from: number, to: number) {
//   return Math.floor(Math.random() * (to - from + 1) + from);
// }

// const colors = [
//   "green",
//   "blue",
//   "red",
//   "yellow",
//   "magenta",
//   "orange",
//   "brown",
//   "purple",
//   "pink",
// ];

// export class Circles {
//   private circles: Circle[] = [];

//   constructor(
//     private canvas: HTMLCanvasElement,
//     private context: CanvasRenderingContext2D
//   ) {}
//   addPlayer(color: string) {
//     var radius = 10;
//     var x = randomFromTo(0, this.canvas.width);
//     var y = randomFromTo(0, this.canvas.height);
//     var circle = new Circle(x, y, radius, color);
//     this.circles.push(circle);
//     this.drawCircles();
//   }

//   clearContext() {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }

//   drawCircles() {
//     this.clearContext();
//     if (this.circles.length > 0) {
//       this.circles.forEach((circle) => {
//         this.context.globalAlpha = 0.85;
//         this.context.beginPath();
//         this.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
//         this.context.fillStyle = circle.color;
//         this.context.strokeStyle = "black";
//         if (circle.isSelected) {
//           this.context.lineWidth = 8;
//         } else {
//           this.context.lineWidth = 1;
//         }
//         this.context.fill();
//         this.context.stroke();
//       });
//     }
//   }

//   setColor(color: string) {
//     this.circles.forEach((circle) => {
//       if (circle.isSelected) circle.color = color;
//     });
//     this.drawCircles();
//   }

//   selectCircle(circle: Circle) {
//     circle.isSelected = !circle.isSelected;
//   }

//   isCircleSelected(x: number, y: number) {
//     this.clearContext();
//     this.circles.forEach((circle) => {
//       const distanceFromCenter = Math.sqrt(
//         Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2)
//       );
//       if (distanceFromCenter <= circle.radius) {
//         this.selectCircle(circle);
//       }
//       this.drawCircles();
//     });
//   }

//   movePlayer(x: number, y: number) {
//     this.circles.forEach((circle) => {
//       if (circle.isSelected) {
//         if (circle.shiftY !== null) {
//           circle.y = y - circle.shiftY;
//         }
//         if (circle.shiftX !== null) {
//           circle.x = x - circle.shiftX;
//         }
//       }
//     });
//     this.drawCircles();
//   }

//   startDragging(x: number, y: number) {
//     this.circles.forEach((circle) => {
//       circle.shiftX = x - circle.x;
//       circle.shiftY = y - circle.y;
//     });
//   }
//   stopDragging() {
//     this.circles.forEach((circle) => {
//       circle.shiftX = null;
//       circle.shiftY = null;
//     });
//   }

//   deletePlayer() {
//     this.clearContext();
//     this.circles = this.circles.filter((circle) => !circle.isSelected);
//     this.drawCircles();
//   }
// }
