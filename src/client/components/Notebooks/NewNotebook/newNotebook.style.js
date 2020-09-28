import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
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
}));

export default useStyles;
