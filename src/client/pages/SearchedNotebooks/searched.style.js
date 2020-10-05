import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    margin: theme.spacing(0),
  },
  list: {
    position: "absolute",
    top: "10%",
    paddingTop: "40px",
  },
  heading: {
    position: "absolute",
    top: "5%",
    paddingTop: "20px",
    color: fade(theme.palette.common.black, 0.7),
  },
}));

export default useStyles;
