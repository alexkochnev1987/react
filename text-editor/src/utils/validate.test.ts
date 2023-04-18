import axios from 'axios';
import { Mocked } from 'vitest';
import { arrToArrString } from './arr-num-to-string';
import { delay } from './delay';
import { getData, User } from './get-users';
import { users } from './mock-users';
import { square } from './square';
import { validateTrue } from './validate-true';

describe('validate function works', () => {
  it('middle of square', () => {
    Array(20)
      .fill(1)
      .forEach((_, index) => {
        expect(validateTrue(index)).toBe(true);
        expect(validateTrue(index * 2)).toBe(true);
      });
  });
  it('side of square', () => {
    expect(validateTrue(100)).toBe(true);
    expect(validateTrue(0)).toBe(true);
  });
  it('out of the box', () => {
    expect(validateTrue(101)).toBe(false);
    expect(validateTrue(-1)).toBe(false);
  });
});

describe('arrNum to stringArr function works', () => {
  const arr = [1, 2, 3, 4];

  const expected = ['1', '2', '3', '4'];
  it('middle of square', () => {
    expect(arrToArrString(arr)).toEqual(expected);
  });
  it('side of square', () => {
    expect(arrToArrString([...arr, null, undefined, 'fytfufhh'])).toEqual(expected);
  });
  it('out of the box', () => {
    expect(arrToArrString([])).toEqual([]);
  });
  it('out of the box', () => {
    expect(arrToArrString([...arr, 8, 9])).not.toEqual(expected);
  });
});

describe('square function works', () => {
  const spyMathPow = vi.spyOn(Math, 'pow');
  it('middle of square', () => {
    expect(square(2)).toEqual(4);
    expect(square(2)).toBeLessThan(5);
    expect(square(2)).toBeGreaterThanOrEqual(4);
    expect(square(2)).not.toBeUndefined();
  });
  it('side of square', () => {
    square(2);
    square(1);
    square(3);
    expect(spyMathPow).toBeCalledTimes(2);
  });
  it('side of square', () => {
    square(1);
    expect(spyMathPow).toBeCalledTimes(0);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});

describe('delay', () => {
  it('middle of square', async () => {
    const sum = await delay(() => 5 + 5, 1000);
    expect(sum).toBe(10);
  });
});

describe('delay', () => {
  let response: { data: User[] };

  vi.mock('axios');
  const mockedAxios = axios as Mocked<typeof axios>;
  const expected = Array(5)
    .fill(1)
    .map((_, i) => String(i + 1));
  beforeEach(() => {
    response = {
      data: users,
    };
  });
  it('middle of square', async () => {
    mockedAxios.get.mockResolvedValue(response);
    const data = await getData();

    expect(axios.get).toBeCalledTimes(1);
    expect(data).toEqual(expected);
    expect(data).toMatchSnapshot();
  });
});
