import { Container } from "@mui/material";
import { MainPage } from "../../pages/Main-page";
import { Navbar } from "../navbar/Navbar";

export const Layout = () => {
  const description = "For using app login or register";

  return (
    <Container>
      <Navbar />
      <MainPage />
    </Container>
  );
};
