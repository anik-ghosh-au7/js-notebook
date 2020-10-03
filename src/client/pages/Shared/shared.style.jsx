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
    color: fade(theme.palette.common.black, 0.7),
  },
}));

export default useStyles;
