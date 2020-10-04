import React, { useState, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import DividerWithText from "../../Divider/DividerWithText";

// copyright
import Copyright from "../../Copyright/Copyright";

// axios
import httpRequest from "../../../config/axios.config";

// styles
import useStyles from "./body.style";

// redux action
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

const Body = ({ toggleShare, notebookId, setNotification }) => {
  const [error, setError] = useState("");
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Required!"),
    }),
  });

  const onShareHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await httpRequest({
        method: "POST",
        url: "http://localhost:5000/api/protected/share", // to be changed
        data: { email: formik.values.email, notebookId },
      });

      setNotification({
        open: true,
        severity: "success",
        msg: response.data.msg,
      });
      toggleShare();
    } catch (error) {
      if (!!error.response) setError(error.response.data.msg);
      else
        setNotification({
          open: true,
          severity: "error",
          msg: "Sorry! server is down",
        });
    }
  };

  const onCancelHandler = () => {
    toggleShare();
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShareIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Share with
          </Typography>
          <form className={classes.form} noValidate name="email">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              value={formik.values["email"]}
              onChange={formik.handleChange}
              error={!!formik.errors.email || !!error}
              helperText={formik.errors["email"] || error}
              autoFocus
            />
            <div className={classes.divider}>
              <DividerWithText>Select</DividerWithText>
            </div>
            <Grid container>
              <Grid item xs>
                <Button
                  type="button"
                  width="50%"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ float: "left", marginTop: "10px" }}
                  onClick={onShareHandler}
                >
                  <CheckCircleIcon style={{ marginRight: "10px" }} /> Share
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
                  onClick={onCancelHandler}
                >
                  <CancelIcon style={{ marginRight: "10px" }} /> Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notebookId: state.activeTab,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (payload) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(Body);
