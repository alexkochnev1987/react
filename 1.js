async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await response.json();
  return json;
}

function* fetchUsers() {
  const x = yield getData(8);
  const y = yield getData(9);
  return [x, y];
}

function runner(generatorFunction) {
  const iterator = generatorFunction();

  function nextStep(resolvedValue) {
    const { value: nextIteratorValue, done } = iterator.next(resolvedValue);
    if (done) return nextIteratorValue;
    return nextIteratorValue.then(nextStep);
  }
  return Promise.resolve().then(nextStep);
}

runner(fetchUsers).then((value) => {
  console.log(value);
});
