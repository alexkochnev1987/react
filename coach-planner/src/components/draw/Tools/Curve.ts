// export interface QuadraticCurveProps {
//   x: number;
//   y: number;
//   color: string;
// }

// class QuadraticCurve {
//   public cpx: number;
//   public cpy: number;
//   public x: number;
//   public y: number;
//   public startX: number;
//   public startY: number;
//   public color: string;
//   public isSelected = true;
//   constructor(props: QuadraticCurveProps) {
//     this.startX = props.x;
//     this.startY = props.y;
//     this.cpx = props.x / 2;
//     this.cpy = props.y / 2;
//     this.x = props.x;
//     this.y = props.y;
//     this.color = props.color;
//   }
// }

// export class QuadraticCurves {
//   private curves: QuadraticCurve[] = [];
//   constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {
//     this.canvas = canvas;
//     this.context = context;
//   }

//   addCurve(props: QuadraticCurveProps) {
//     this.clearContext();
//     const curve = new QuadraticCurve(props);
//     this.curves.push(curve);
//     this.drawCurves();
//   }

//   drawCurves() {
//     this.clearContext();
//     if (this.curves.length > 0) {
//       this.curves.forEach((curve) => {
//         const curveLine = new Path2D();
//         this.context.beginPath();
//         this.context.strokeStyle = curve.color;
//         curveLine.moveTo(curve.startX, curve.startY);
//         curveLine.quadraticCurveTo(curve.x / 2, curve.y / 2, curve.x, curve.y);

//         this.context.stroke(curveLine);
//         if (curve.isSelected) {
//           this.context.beginPath();
//           this.context.arc(curve.startX, curve.startY, 8, 0, 2 * Math.PI);
//           this.context.stroke();
//           this.context.moveTo(curve.x, curve.y);

//           this.context.arc(curve.x, curve.y, 8, 0, 2 * Math.PI);
//           this.context.stroke();

//           this.context.moveTo(curve.x / 2, curve.y / 2);
//           this.context.arc(curve.x / 2, curve.y / 2, 8, 0, 2 * Math.PI);
//           this.context.stroke();
//         }
//       });
//     }
//   }

//   clearContext() {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }

//   changeCurve(x: number, y: number) {
//     this.curves.forEach((curve) => {
//       if (curve.isSelected) {
//         curve.x = x;
//         curve.y = y;
//       }
//     });
//     this.drawCurves();
//   }

//   setSelectCurve(curve: QuadraticCurve, select: boolean) {
//     curve.isSelected = select;
//   }

//   stopDrawingCurve() {
//     this.curves.forEach((curve) => {
//       this.setSelectCurve(curve, false);
//     });
//   }

//   isLineSelected(x: number, y: number) {
//     this.curves.forEach((curve) => {
//       const curveLine = new Path2D();
//       curveLine.moveTo(curve.startX, curve.startY);
//       curveLine.quadraticCurveTo(curve.cpx, curve.cpy, curve.x, curve.y);

//       const result = [0, 1, 2, -1, -2]
//         .map((elem) =>
//           this.context.isPointInStroke(curveLine, x + elem, y) || this.context.isPointInStroke(curveLine, x, y + elem)
//             ? true
//             : false,
//         )
//         .some((elem) => elem === true);

//       if (result) {
//         curve.isSelected = true;
//       } else {
//         curve.isSelected = false;
//       }
//     });
//     this.drawCurves();
//   }

//   dragCurveRound(x: number, y: number) {
//     this.curves.forEach((curve) => {
//       const curveRoundStart = new Path2D();
//       curveRoundStart.moveTo(curve.startX, curve.startY);
//       curveRoundStart.arc(curve.startX, curve.startY, 8, 0, 2 * Math.PI);

//       if (this.context.isPointInPath(curveRoundStart, x, y)) {
//       }
//     });
//   }
// }
