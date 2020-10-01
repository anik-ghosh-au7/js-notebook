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
    minHeight: "100px",
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
  component_code: {
    position: "relative",
    minHeight: "210px",
    width: "100%",
    height: "210px",
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
    minHeight: "300px",
    width: "100%",
    height: "300px",
    marginTop: 15,
    backgroundColor: fade(theme.palette.common.black, 0.01),
    borderRadius: 2.5,
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.4)",
    padding: 2,
    "&:hover": {
      transform: "scale(1.015, 1.015)",
    },
  },
  code_theme: {
    position: "absolute",
    top: "5px",
    left: "60px",
    color: fade(theme.palette.common.black, 0.5),
    paddingTop: "5px",
  },
  move_shrink_component: {
    marginLeft: "10%",
  },
  result_component: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "99%",
    height: "85%",
    top: "42px",
    overflow: "auto",
    paddingLeft: "20px",
    // alignItems: "center",
    // justifyContent: "center",
    fontFamily:
      "Courier New, Courier, monospace, Times New Roman, Times, serif",
    backgroundColor: theme.palette.common.white,
  },
  result_component_black: {
    backgroundColor: fade(theme.palette.common.black, 0.8),
  },
  result_component_white: {
    backgroundColor: theme.palette.common.white,
  },
  result_content: {
    margin: "15px 0 0 0",
    fontSize: 15,
  },
  result_content_black: {
    color: "red",
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
  expand_contract_icon: {
    position: "absolute",
    bottom: "5px",
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
  text_field: {
    width: "91%",
    margin: theme.spacing(3, 6, 2, 5),
    overFlow: "hidden",
    backgroundColor: fade(theme.palette.common.black, 0.001),
    border: "none",
    resize: "none",
    "&:focus": {
      outline: "none",
      backgroundColor: fade(theme.palette.common.black, 0.001),
    },
  },
  note_component: {
    width: "91%",
    margin: theme.spacing(3, 6, 2, 5),
    fontSize: "10",
    fontWeight: "normal",
    fontFamily: "calibri",
    textAlign: "justify",
    textAlignLast: "center",
    whiteSpace: "pre-wrap",
  },
  link_field: {
    padding: theme.spacing(3, 6, 0, 5),
  },
  link_component: {
    width: "91%",
    margin: theme.spacing(3, 5.5, 2, 3),
    fontSize: "10",
    fontWeight: "normal",
    fontFamily: "calibri",
    textAlign: "center",
    wordWrap: "break-word",
  },
  default_text: {
    fontSize: 30,
    fontStyle: "normal",
    color: fade(theme.palette.common.black, 0.25),
  },
  link: {
    textDecoration: "none",
    "&:visited": {
      color: "red",
    },
  },
  chart_header: {
    width: "91%",
    margin: theme.spacing(4, 3, -1, 3),
    padding: theme.spacing(1),
    textAlign: "center",
  },
  chart_component: {
    width: "91%",
    margin: theme.spacing(-2, 0.7, 2, 7.3),
    padding: theme.spacing(1, 4),
    textAlign: "center",
    height: "65%",
    overflowY: "scroll",
  },
  chart_feild_wrapper: {
    position: "relative",
  },
  chart_feild_icon: {
    position: "absolute",
    top: "30%",
    right: "5%",
  },
  chart_feild_index: {
    position: "absolute",
    top: "30%",
    left: "-8%",
    color: fade(theme.palette.common.black, 0.5),
  },
  chart_icons: {
    cursor: "pointer",
    color: fade(theme.palette.common.black, 0.25),
    "&:hover": {
      color: fade(theme.palette.common.black, 0.75),
      cursor: "pointer",
    },
  },
}));

export default useStyles;
