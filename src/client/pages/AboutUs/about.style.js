import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  parent: {
    position: "relative",
  },

  child: {
    position: "absolute",
    left: "50%",
    marginTop: "20%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
  },
}));

export default useStyles;
