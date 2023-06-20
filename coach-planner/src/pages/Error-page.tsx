import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

interface ErrorType {
  statusText: string | undefined;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError();
  const errorMessage = (error: unknown): string => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      console.error(error);
      return "Unknown error";
    }
  };

  return (
    <Box>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{errorMessage(error)}</p>
      <Link to={"/"}>
        <Button variant="contained" color="success">
          Go back
        </Button>
      </Link>
    </Box>
  );
}
