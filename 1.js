// class SingleTone {
//   static instance;
//   constructor() {}

//   getInstance() {
//     if (!SingleTone.instance) {
//       SingleTone.instance = new SingleTone();
//     }
//     return SingleTone.instance;
//   }
// }

// const singleTone = new SingleTone();
// const singleTone2 = new SingleTone();
// const a = singleTone.getInstance();
// const b = singleTone2.getInstance();

// console.log(a === b);

// console.log(Array.apply(null, { length: 9 }));
const a = 1;

// const b = {
//   a: 1,
//   valueOf: () => {
//     return 1;
//   },
// };

// a.__proto__.f = function () {
//   return this;
// };
// console.log(a.f());

// const b = " NaN";
console.log(a.__proto__ === Object.prototype);

// console.log(b.f());
