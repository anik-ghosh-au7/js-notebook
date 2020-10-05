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
  details: {
    margin: theme.spacing(10, 0),
    textAlign: "center",
    cursor: "pointer",
    height: "71.3vh",
  },
  card: {
    "&:hover": {
      transform: "scale(1.2, 1.2)",
    },
  },
  component_icon: {
    fontSize: 150,
    color: fade(theme.palette.common.black, 0.5),
  },
  icon: {
    position: "absolute",
    right: "4%",
    top: "5%",
    paddingTop: "40px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.3, 1.3)",
      paddingTop: "35px",
    },
    zIndex: 1,
  },
}));

export default useStyles;
