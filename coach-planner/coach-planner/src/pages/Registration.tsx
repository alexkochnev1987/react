import { Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { RouteNames } from "../router/routes";

type Inputs = {
  email: string;
  password: string;
  username: string;
};

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {};

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
