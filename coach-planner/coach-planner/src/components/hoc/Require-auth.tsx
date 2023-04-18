import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { RouteNames } from "../../router/routes";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (!user)
    return <Navigate to={RouteNames.login} state={{ from: location }} />;
  return children;
};
