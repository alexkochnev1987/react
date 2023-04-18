import { selectCount } from './counter-slice';

describe('selectors works', () => {
  it('selectCount', () => {
    expect(selectCount({ counter: { value: 0 } })).toBe(0);
  });
});
