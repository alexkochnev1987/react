import { Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../router/routes";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "../firebase";

type Inputs = {
  email: string;
  password: string;
  username: string;
};

export const Registration = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true })}
        placeholder="email"
        defaultValue={"alexkochnev1987@gmail.com"}
      />

      <input
        {...register("username", { required: true })}
        placeholder="username"
        defaultValue={"qwerty"}
      />

      <input
        {...register("password", { required: true })}
        placeholder="password"
        defaultValue={"alexTest"}
      />

      <input type="submit" />
      <Button>
        <Link to={RouteNames.login}>Go to Login</Link>
      </Button>
    </form>
  );
};
