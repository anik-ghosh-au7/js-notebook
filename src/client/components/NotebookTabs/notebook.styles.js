import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  stickToBottom: {
    position: "fixed",
    paddingLeft: "4%",
    top: "94vh",
    backgroundColor: theme.palette.common.white,
  },
  container: {
    width: "inherit",
    margin: "50px",
  },
  tab_label: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
    fontSize: 20,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: fade(theme.palette.common.black, 0.5),
    },
    borderRadius: 50,
  },
}));

export default useStyles;
