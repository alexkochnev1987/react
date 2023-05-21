import { Container } from "@mui/material";
import { MainPage } from "../../pages/Main-page";
import { Navbar } from "../navbar/Navbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  const description = "For using app login or register";

  return (
    <Container
      disableGutters={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        overflow: "hidden",
      }}
    >
      <ToastContainer />
      <Navbar />
      <MainPage />
    </Container>
  );
};
