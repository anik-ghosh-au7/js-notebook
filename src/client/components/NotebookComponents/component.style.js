import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  split_wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  component_wrapper: {
    position: "relative",
    width: "100%",
  },
  component: {
    position: "relative",
    minHeight: "50px",
    width: "100%",
    marginTop: 15,
    backgroundColor: fade(theme.palette.common.black, 0.01),
    borderRadius: 2.5,
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.4)",
    padding: 2,
    "&:hover": {
      transform: "scale(1.015, 1.015)",
    },
  },
  shrink_component: {
    position: "relative",
    minHeight: "200px",
    width: "100%",
    marginTop: 15,
    backgroundColor: fade(theme.palette.common.black, 0.01),
    borderRadius: 2.5,
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.4)",
    padding: 2,
    "&:hover": {
      transform: "scale(1.015, 1.015)",
    },
  },
  move_shrink_component: {
    marginLeft: "10%",
  },
  output: {
    color: "red",
    fontWeight: 10,
    display: "inline-flex",
    marginLeft: "-70px",
    position: "absolute",
    top: "5%",
    left: "-3%",
  },
  input: {
    color: "blue",
    fontWeight: 10,
    display: "inline-flex",
    marginLeft: "-70px",
    position: "absolute",
    top: "5%",
  },
  edit_icon: {
    position: "absolute",
    top: "5px",
    right: "40px",
    fontSize: 20,
    color: fade(theme.palette.common.black, 0.25),
    "&:hover": {
      color: fade(theme.palette.common.black, 0.75),
      cursor: "pointer",
    },
  },
  delete_icon: {
    position: "absolute",
    top: "5px",
    right: "15px",
    fontSize: 20,
    color: fade(theme.palette.common.black, 0.25),
    "&:hover": {
      color: fade(theme.palette.common.black, 0.75),
      cursor: "pointer",
    },
  },
  play_icon: {
    position: "absolute",
    top: "5px",
    right: "70px",
    fontSize: 20,
    color: fade(theme.palette.common.black, 0.25),
    "&:hover": {
      color: fade(theme.palette.common.black, 0.75),
      cursor: "pointer",
    },
  },
  component_icon: {
    position: "absolute",
    top: "5px",
    left: "10px",
    fontSize: 30,
    color: fade(theme.palette.common.black, 0.25),
    cursor: "grab",
    title: "Drag",
  },
}));

export default useStyles;
