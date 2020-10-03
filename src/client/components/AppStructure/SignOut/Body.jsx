import React, { Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import HelpIcon from "@material-ui/icons/Help";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { connect } from "react-redux";

// styles
import useStyles from "./body.style";

// copyright
import Copyright from "../../Copyright/Copyright";

// reducer actions
import { clearUserData } from "../../../utils/storageData";
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";
import { Grid } from "@material-ui/core";

// Components
import DividerWithText from "../../Divider/DividerWithText";
import { withRouter } from "react-router";

// Forget Password component -----------------------------------------
const Body = ({ toggleSignOut, clearUserData, setNotification, history }) => {
  const classes = useStyles();

  const onClickHandler = (e) => {
    const { innerText } = e.target;
    if (innerText === "YES") {
      clearUserData();
      setNotification({
        open: true,
        severity: "success",
        msg: "Sign out successful",
      });
      if (history.location.pathname !== "/create") history.push("/");
    } else if (innerText === "NO") {
      setNotification({
        open: true,
        severity: "warning",
        msg: "Sign out cancelled",
      });
    }
    toggleSignOut();
  };

  // return body ---------------------------------------------------
  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HelpIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Do You Want to Sign Out?
          </Typography>

          <DividerWithText>Select</DividerWithText>
          <Grid container>
            <Grid item xs>
              <Button
                type="button"
                width="50%"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ float: "left", marginTop: "10px" }}
                onClick={onClickHandler}
              >
                <CheckCircleIcon style={{ marginRight: "10px" }} /> Yes
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                type="button"
                width="50%"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ float: "right", marginTop: "10px" }}
                onClick={onClickHandler}
              >
                <CancelIcon style={{ marginRight: "10px" }} /> No
              </Button>
            </Grid>
          </Grid>
        </div>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    clearUserData: () => dispatch(clearUserData()),
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(null, mapActionToProps)(withRouter(Body));
