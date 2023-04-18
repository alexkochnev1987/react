import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';

export const navbarItems = [
  {
    id: 1,
    icon: <LoginIcon />,
    label: 'Войти',
    route: '/login',
  },
  {
    id: 2,
    icon: '',
    label: 'Регистрация',
    route: '/registration',
  },
  {
    id: 3,
    icon: <PeopleIcon />,
    label: 'Пользователи',
    route: '/users',
  },
];
