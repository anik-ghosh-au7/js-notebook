import React, { useState } from "react";
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
import httpRequest from "../../config/axios.config";

// styles
import useStyles from "./body.style";

// copyright
import Copyright from "../Copyright/Copyright";

// reducer actions
import { forget } from "../../redux/actions/sign.action";

const SignIn = ({ toggleForget }) => {
  const [error, setError] = useState("");

  const [flag, setFlag] = useState({
    name: "email",
    label: "Email Address",
    button: "Send OTP",
  });

  // const [flag, setFlag] = useState({
  //   name: "otp",
  //   label: "OTP",
  //   button: "Submit OTP",
  // });

  // const [flag, setFlag] = useState({
  // name: "reset",
  // label: "New Password",
  // button: "Reset Password",
  // });

  // on click submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (e.target.name === "email") {
      try {
        let response = await httpRequest({
          method: "POST",
          url: "http://localhost:5000/reset",
          data: { email: formik.values.email },
        });
        if (response.data.isError) {
          setError(response.data.msg);
        } else {
          setFlag({
            name: "otp",
            label: "OTP",
            button: "Submit OTP",
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else if (e.target.name === "otp") {
      try {
        let response = await httpRequest({
          method: "POST",
          url: "http://localhost:5000/verify",
          data: { email: formik.values.email, otp: formik.values.otp },
        });
        if (response.data.isError) {
          setError(response.data.msg);
        } else {
          setError("");
          setFlag({
            name: "reset",
            label: "New Password",
            button: "Reset Password",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    // else if (e.target.name === "reset") {
    // }
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

  return (
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
            onChange={(e) => {
              formik.setFieldTouched(flag.name);
              return formik.handleChange(e);
            }}
            error={
              (formik.errors[flag.name] && formik.touched[flag.name]) || !!error
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
          >
            {flag.button}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    toggleForget: () => {
      dispatch({
        type: forget,
      });
    },
  };
};

export default connect(null, mapActionToProps)(SignIn);
