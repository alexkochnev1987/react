import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Routing test', () => {
  it('class btn length', async () => {
    render(<App />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    const navbar = screen.queryByTestId('navbar');
    expect(navbar).toBeInTheDocument();
    const goToUsers = screen.queryByText('Пользователи');
    expect(goToUsers).toBeInTheDocument();
    if (goToUsers) await userEvent.click(goToUsers);

    const users = await screen.findAllByTestId('user-item');
    expect(users.length).toBe(10);

    await userEvent.click(button);
    const goToLogin = await screen.queryByText('Войти');
    expect(goToLogin).toBeInTheDocument();

    if (goToLogin) await userEvent.click(goToLogin);
    const login = await screen.queryByText('Add');

    expect(login).toBeInTheDocument();
  });
});
