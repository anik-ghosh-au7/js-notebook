import React, { useRef } from "react";
import { withRouter } from "react-router";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import html2pdf from "html2pdf.js";
// import html2canvas from "html2canvas";
// import jspdf from "jspdf";

// styles
import useStyles from "./sidePanel.style";

// components
import Navbar from "../NavBar/Navbar";
import Tools from "./Tools";

// All Buttons
import { mainButtons, notebookButtons } from "./buttons";

// reducer actions
import { signin } from "../../../redux/actions/sign.action";
import { ADD_NOTEBOOK } from "../../../redux/actions/notebooks.action";
import { SHIFT, UNSHIFT } from "../../../redux/actions/tabbar.action";
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

const SidePanel = ({
  isSignIn,
  toggleSignIn,
  children,
  history,
  addNotebook,
  shift,
  unshift,
  setNotification,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // ref for download as pdf
  const pdfRef = useRef();

  // For pdf------------------------------------------------------------------------
  const createPdf = async () => {
    try {
      let element = pdfRef.current;
      let divWidth = element.clientWidth;
      let divHeight = element.clientHeight;
      let opt = {
        margin: [0, 0.2],
        filename: "myNotebook.pdf",
        enableLinks: true,
        image: { type: "jpeg", quality: 0.98 },
        pagebreak: { mode: ["css", "whiteline"], avoid: ".component_wrapper" },
        html2canvas: {
          scale: 2,
          width: divWidth,
          height: divHeight,
          windowWidth: divWidth + 150,
          scrollX: 0,
          scrollY: 0,
          ignoreElements: true,
          useCORS: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(opt).from(element).save();
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: "Sorry! We are facing some issue in making pdf.",
      });
    }
  };

  // --------------------------------------------------------------------------------

  const handleDrawerOpen = () => {
    setOpen(true);
    shift();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    unshift();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Navbar onDrawerClick={handleDrawerOpen} />
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {mainButtons(isSignIn, toggleSignIn, history, addNotebook).map(
            (button, index) => {
              const { name, Icon, onClick, label } = button;
              return (
                <ListItem
                  button
                  key={index}
                  onClick={onClick}
                  className={classes.mainButton}
                >
                  <ListItemIcon title={label}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              );
            }
          )}
        </List>
        <Divider />
        <List>
          {notebookButtons(isSignIn, toggleSignIn, handleClick).map(
            (button, index) => {
              const { name, Icon, onClick, label } = button;
              return (
                <ListItem
                  button
                  key={index}
                  onClick={name === "Download" ? createPdf : onClick}
                  className={classes.notebookButton}
                >
                  <ListItemIcon title={label}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              );
            }
          )}
        </List>
        <Tools anchorEl={anchorEl} handleClose={handleClose} />
      </Drawer>
      <main className={classes.content} ref={pdfRef}>
        {/* <div className={classes.toolbar} /> */}
        {children}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignIn: !isEmpty(state.userData),
  };
};

const mapActionToProps = (dispatch) => {
  return {
    toggleSignIn: () => {
      dispatch({
        type: signin,
      });
    },
    addNotebook: () =>
      dispatch({
        type: ADD_NOTEBOOK,
      }),
    shift: () =>
      dispatch({
        type: SHIFT,
      }),
    unshift: () =>
      dispatch({
        type: UNSHIFT,
      }),
    setNotification: (payload) => {
      dispatch({ type: SET_NOTIFICATION, payload });
    },
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(SidePanel));
