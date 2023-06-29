// import React, { useEffect, useRef } from "react";

// export const CanvasBackground = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const backgroundImage = new Image();
//     backgroundImage.src =
//       "https://firebasestorage.googleapis.com/v0/b/coach-planner.appspot.com/o/sU8ybwdeWM27EZkHKwjv?alt=media&token=e8e94c70-ea7c-4aa0-8d8b-e96bb303aebf";
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext("2d");
//     backgroundImage.onload = function () {
//       drawBackground();
//     };
//     function drawBackground() {
//       if (context)
//         context.drawImage(
//           backgroundImage,
//           0,
//           0,
//           window.innerWidth - 20,
//           (window.innerWidth - 20) / 2
//         );
//     }
//   }, []);
//   return (
//     <canvas
//       width={window.innerWidth - 20}
//       height={(window.innerWidth - 20) / 2}
//       ref={canvasRef}
//     ></canvas>
//   );
// };
