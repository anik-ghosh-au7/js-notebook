import { fade, makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  stickToBottom: {
    position: "fixed",
    paddingLeft: "4.5%",
    top: "94vh",
    backgroundColor: theme.palette.common.white,
  },
  tabBarShift: {
    paddingLeft: "0%",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    width: "inherit",
    margin: "50px",
  },
  containerShrink: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
