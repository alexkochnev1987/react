import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../router/routes';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  const signWithEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    signWithEmail(email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => GoogleAuthProvider.credentialFromResult(result))
      .catch((error) => GoogleAuthProvider.credentialFromError(error));
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: true })}
        placeholder="email"
        type="email"
        defaultValue={'alexkochnev1987@gmail.com'}
      />

      <input
        {...register('password', { required: true })}
        placeholder="password"
        type="password"
        defaultValue={'alexTest'}
      />

      <input type="submit" />
      <Button onClick={() => loginWithGoogle()}>
        <GoogleIcon />
      </Button>

      <Button>
        <Link to={RouteNames.registration}>Go to Registration</Link>
      </Button>

      <Button>
        <Link to={RouteNames.user}>Go to User</Link>
      </Button>
    </form>
  );
};
