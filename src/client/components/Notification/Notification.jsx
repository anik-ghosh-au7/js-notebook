import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// style
import useStyles from "./notification.style";
import { CLEAR_NOTIFICATION } from "../../redux/actions/notification.action";
import { connect } from "react-redux";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notification = (props) => {
  const classes = useStyles();
  const { open, msg, severity, clearNotification } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    clearNotification();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
      {/*<Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert>*/}
    </div>
  );
};

const setStateToProps = ({ notification }) => {
  return {
    ...notification,
  };
};

const setActionToProps = (dispatch) => {
  return {
    clearNotification: () => {
      dispatch({
        type: CLEAR_NOTIFICATION,
      });
    },
  };
};

export default connect(setStateToProps, setActionToProps)(Notification);
