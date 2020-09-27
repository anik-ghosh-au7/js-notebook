import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card_root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.4)",
    height: "100%",
    width: "100%",
    position: "relative",
  },
  profile_img: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  btn: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
}));

export default useStyles;
