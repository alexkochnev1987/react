// "use strict";
// const arr = [1, 2, 3, 4, 1, 1, 3, 3, 5];

// const newArray = Object.entries(
//   arr.reduce((prev, curr) => {
//     prev[curr] ? (prev[curr] += 1) : (prev[curr] = 1);
//     return prev;
//   }, {})
// )
//   .sort((a, b) => {
//     console.log(a[1] - b[1]);
//     return b[1] - a[1];
//   })
//   .map((x) => x[0]);

// console.log(newArray);

// const sum = (a) => {
//   const func = (b) => {
//     if (b) {
//       return sum(a + b);
//     }
//     return a;
//   };
//   return func;
// };

const sum = (a, b) => a + b;
const mul = (a, b) => a * b;
// console.log(sum(1)(2)(3)());

const calculate = (callback) => {
  return (...args) =>
    args.length >= 2 ? callback(...args) : (a) => callback(...[...args, a]);
};

console.log(calculate(mul)(4)(5));
