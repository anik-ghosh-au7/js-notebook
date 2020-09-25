import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";

// theme
import theme from "./project.theme";

// // components
// import SignUp from "./client/components/SignUp/SignUp";
// import SignIn from "./client/components/SignIn/SignIn";
// import SignOut from "./client/components/SignOut/SignOut";
// import Profile from "./client/components/Profile/Profile";
// import Notification from "./client/components/Notification/Notification";
// import ForgetPassword from "./client/components/ForgetPassword/ForgetPassword";
// import SidePanel from "./client/components/SidePanel/SidePanel";
import MainStructure from "./MainStructure";
import AboutUs from "./client/pages/AboutUs/About";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <MainStructure>
          <AboutUs />
        </MainStructure>
      </Container>
    </ThemeProvider>
  );
}

export default App;
