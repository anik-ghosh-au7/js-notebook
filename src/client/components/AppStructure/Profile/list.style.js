import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    textAlign: "center",
    fontWeight: "bold",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.secondary.main,
  },
}));

export default useStyles;
