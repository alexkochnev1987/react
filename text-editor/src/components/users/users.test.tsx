import { render, screen } from '@testing-library/react';
import { Users } from './users';

import axios from 'axios';
import { Mocked } from 'vitest';
import { User } from '../../utils/get-users';
import { users } from '../../utils/mock-users';

describe('user render', () => {
  vi.mock('axios');
  const mockedAxios = axios as Mocked<typeof axios>;
  let response: { data: User[] };
  beforeEach(() => {
    response = {
      data: users,
    };
  });
  it('debug', async () => {
    mockedAxios.get.mockResolvedValue(response);
    render(<Users />);
    screen.debug();
    const users = await screen.findAllByTestId('user-item');
    screen.debug();
    expect(users.length).toBe(5);
    expect(axios.get).toBeCalledTimes(1);
  });
});
