import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.common.white,
    borderRadius: 5,
    boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.4)",
  },
  wrapper: {
    margin: 15,
  },
  label: {
    fontWeight: "normal",
    padding: 5,
    margin: 2,
  },
}));

export default useStyles;
