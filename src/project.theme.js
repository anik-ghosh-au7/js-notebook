import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#535350",
      main: "#383836",
      dark: "#3E3E3C",
      contrastText: "#000",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#F5F5F5",
      dark: "#EBEBEB",
      contrastText: "#fff",
    },
  },
});

export default theme;
