import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../router/routes";
import GoogleIcon from "@mui/icons-material/Google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppSelector } from "../store/hooks";
import { auth } from "../firebase";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const signWithEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = async (
    { email, password },
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    signWithEmail(email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => GoogleAuthProvider.credentialFromResult(result))
      .catch((error) => GoogleAuthProvider.credentialFromError(error));
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);
  return (
    <form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
      <input
        {...register("email", { required: true })}
        placeholder="email"
        type="email"
        defaultValue={"alexkochnev1987@gmail.com"}
      />

      <input
        {...register("password", { required: true })}
        placeholder="password"
        type="password"
        defaultValue={"alexTest"}
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
