import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";

// theme
import theme from "./project.theme";

// components
import Navbar from "./client/components/NavBar/Navbar";
import SignUp from "./client/components/SignUp/SignUp";
import SignIn from "./client/components/SignIn/SignIn";
import Notification from "./client/components/Notification/Notification";
import ForgetPassword from "./client/components/ForgetPassword/ForgetPassword";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Navbar />
        <Notification />
        <SignUp />
        <SignIn />
        <ForgetPassword />
      </Container>
    </ThemeProvider>
  );
}

export default App;
