import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(8, 0),
    textAlign: "center",
  },
  details: {
    margin: theme.spacing(30, 5),
    textAlign: "center",
  },
  card: {
    "&:hover": {
      transform: "scale(1.2, 1.2)",
      boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.4)",
    },
  },
}));

export default useStyles;
