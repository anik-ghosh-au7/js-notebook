import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  list_container: {
    padding: "20px 10px",
    margin: "20px 30px 20px 10px",
    "&:hover": {
      transform: "scale(1.05, 1.05)",
    },
    cursor: "pointer",
  },
  notebook: {
    padding: "20px 0",
  },
});

export default useStyles;
