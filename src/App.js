import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import { Switch } from "react-router-dom";
import { map } from "lodash";

// theme
import theme from "./project.theme";

// components
import MainStructure from "./MainStructure";
import { PublicRoute, PrivateRoute } from "./client/components/routeManagments";

// routes
import routes from "./client/routes";

function App() {
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

export default App;
