import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.common.white,
    borderRadius: 5,
    boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.4)",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  wrapper: {
    margin: 15,
  },
  label: {
    fontWeight: "normal",
    padding: 5,
    margin: 2,
  },
  logo_text: {
    color: fade(theme.palette.common.black, 0.5),
    // textShadow: `0 0 7px ${theme.palette.common.white}, 0 0 0 ${theme.palette.common.black}`,
  },
  component: {
    minHeight: "30px",
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
  component_wrapper: {
    position: "relative",
  },
  output: {
    color: "red",
    fontWeight: 10,
    display: "inline-flex",
    marginLeft: "-70px",
    position: "absolute",
    marginTop: 0,
    top: "2%",
  },
  input: {
    color: "blue",
    fontWeight: 10,
    display: "inline-flex",
    marginLeft: "-70px",
    position: "absolute",
    marginTop: 0,
    top: "2%",
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
}));

export default useStyles;
