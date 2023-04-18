import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import userEvent from '@testing-library/user-event';

describe('layout', () => {
  it('render', async () => {
    render(<Layout />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/enter name/i);
    expect(input).toMatchSnapshot();
    screen.debug();
  });

  it('render navbar', async () => {
    render(<Layout />);
    const input = screen.getByPlaceholderText(/enter name/i);
    expect(screen.getByTestId('input-message')).toContainHTML('');

    await userEvent.type(input, '12345');
    screen.debug();

    expect(screen.getByTestId('input-message')).toContainHTML('12345');
  });
});
