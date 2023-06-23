class SingleTone {
  static instance;
  constructor() {}

  getInstance() {
    if (!SingleTone.instance) {
      SingleTone.instance = new SingleTone();
    }
    return SingleTone.instance;
  }
}

const singleTone = new SingleTone();
const singleTone2 = new SingleTone();
const a = singleTone.getInstance();
const b = singleTone2.getInstance();

console.log(a === b);
