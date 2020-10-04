import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    margin: theme.spacing(0),
  },
  details: {
    margin: theme.spacing(10, 0),
    textAlign: "center",
    cursor: "pointer",
  },
  card: {
    "&:hover": {
      transform: "scale(1.2, 1.2)",
      //   boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.4)",
    },
  },
  stickToBottom: {
    position: "fixed",
    top: "95%",
    left: "45%",
  },
  component_icon: {
    fontSize: 150,
    color: fade(theme.palette.common.black, 0.5),
  },
  heading: {
    position: "absolute",
    top: "5%",
    paddingTop: "20px",
    color: fade(theme.palette.common.black, 0.7),
  },
  list: {
    position: "absolute",
    top: "10%",
    paddingTop: "40px",
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
  },
}));

export default useStyles;
