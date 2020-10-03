import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import { Switch } from "react-router-dom";
import { map } from "lodash";
import { connect } from "react-redux";

// theme
import theme from "./project.theme";

// components
import MainStructure from "./MainStructure";
import { PublicRoute, PrivateRoute } from "./client/components/routeManagments";

// routes
import routes from "./client/routes";
import { SET_USER } from "./client/redux/actions/user.action";

function App({ setUserData }) {
  useEffect(() => {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("user")) {
      let token = localStorage.getItem("token");
      let user = JSON.parse(localStorage.getItem("user"));
      let payload = {
        token,
        ...user,
      };
      setUserData(payload);
    }
  }, [setUserData]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <MainStructure>
          <Switch>
            {map(routes, (route, idx) => {
              return !!route.isProtected ? (
                <PrivateRoute {...route} key={idx} />
              ) : (
                <PublicRoute {...route} key={idx} />
              );
            })}
          </Switch>
        </MainStructure>
      </Container>
    </ThemeProvider>
  );
}

const mapActionToProps = (dispatch) => {
  return {
    setUserData: (payload) =>
      dispatch({
        type: SET_USER,
        payload,
      }),
  };
};

export default connect(null, mapActionToProps)(App);
