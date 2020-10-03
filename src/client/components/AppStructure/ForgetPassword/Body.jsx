import React, { useState, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

// axios
import httpRequest from "../../../config/axios.config";

// styles
import useStyles from "./body.style";

// copyright
import Copyright from "../../Copyright/Copyright";

// reducer actions
import { forget } from "../../../redux/actions/sign.action";
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

// Forget Password component -----------------------------------------
const ForgetPassword = ({ toggleForget, setNotification }) => {
  const [error, setError] = useState("");

  const [flag, setFlag] = useState({
    name: "email",
    label: "Email Address",
    button: "Send OTP",
  });

  // page logic function
  const setStates = async ({ targetName, url, data }) => {
    try {
      let response = await httpRequest({
        method: "POST",
        url,
        data,
      });

      // error state to false
      setError("");

      // notification state
      setNotification({
        msg: response.data.msg,
        open: true,
        severity: "success",
      });

      // input bar state
      if (targetName === "email") {
        setFlag({
          name: "otp",
          label: "OTP",
          button: "Submit OTP",
        });
      } else if (targetName === "otp") {
        setFlag({
          name: "reset",
          label: "New Password",
          button: "Reset Password",
        });
      } else {
        // modal state
        toggleForget();
      }
    } catch (err) {
      if (!!err.response) {
        setError(err.response.data.msg);
        setNotification({
          msg: err.response.data.msg,
          open: true,
          severity: "error",
        });
      }
      console.log(err.response);
    }
  };

  // on click submit
  const onFormSubmit = (e) => {
    e.preventDefault();

    // condition for email
    if (e.target.name === "email") {
      const parameters = {
        targetName: e.target.name,
        url: "http://localhost:5000/api/users/verify",
        data: { email: formik.values.email },
      };
      setStates({ ...parameters });
    }

    // condition for OTP
    else if (e.target.name === "otp") {
      const parameters = {
        targetName: e.target.name,
        url: "http://localhost:5000/api/users/otp",
        data: { otp: formik.values.otp, email: formik.values.email },
      };
      setStates({ ...parameters });
    }

    // condition for password reset
    else if (e.target.name === "reset") {
      const parameters = {
        targetName: e.target.name,
        url: "http://localhost:5000/api/users/password",
        data: { email: formik.values.email, password: formik.values.reset },
      };
      setStates({ ...parameters });
    }
  };

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      reset: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Required!"),
      otp: Yup.string()
        .trim()
        .length(4, "OTP should be 4 characters long")
        .matches(/^\d+$/, "OTP should only contain numbers")
        .required("Required!"),
      reset: Yup.string()
        .trim()
        .min(4, "Minimum 4 characters")
        .max(20, "Maximum 20 characters")
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,20}$/,
          "Atleast one each of number, upper case, lower case & special characters should be present"
        )
        .required("Required!"),
    }),
  });

  const onChangeHandle = (e) => {
    formik.setFieldTouched(flag.name);
    return formik.handleChange(e);
  };

  // return body ---------------------------------------------------
  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={onFormSubmit}
            name={flag.name}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type={flag.name === "reset" ? "password" : "text"}
              id={flag.name}
              label={flag.label}
              name={flag.name}
              autoComplete={flag.name}
              value={formik.values[flag.name]}
              onChange={onChangeHandle}
              error={
                (formik.errors[flag.name] && formik.touched[flag.name]) ||
                !!error
              }
              helperText={formik.errors[flag.name] || error}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!!formik.errors[flag.name]}
            >
              {flag.button}
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
    toggleForget: () => {
      dispatch({
        type: forget,
      });
    },
  };
};

export default connect(null, mapActionToProps)(ForgetPassword);
