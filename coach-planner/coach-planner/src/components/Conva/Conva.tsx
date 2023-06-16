import { ModifyCurve } from "./ModifyCurve";
import { UserActions } from "../draw/User-actions";
import Autocomplete from "./debouce";

export const Conva = () => {
  return (
    <>
      <Autocomplete />
      <UserActions />
      <ModifyCurve />;
    </>
  );
};
