import { counter, decrement, increment } from './counter-slice';

describe('reducer works', () => {
  it('increment', () => {
    expect(counter({ value: 0 }, increment())).toEqual({ value: 1 });
  });
  it('decrement', () => {
    expect(counter({ value: 0 }, decrement())).toEqual({ value: -1 });
  });

  it('empty state', () => {
    expect(counter(undefined, decrement())).toEqual({ value: -1 });
    expect(counter(undefined, increment())).toEqual({ value: 1 });
  });
});
