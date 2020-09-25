import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(3, 0),
    textAlign: "center",
  },
  details: {
    marginTop: theme.spacing(5),
    textAlign: "center",
  },
}));

export default useStyles;
