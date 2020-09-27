import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import GitHubLogin from "react-github-login";
import axios from "axios";

// axios
import httpRequest from "../../../config/axios.config";

// styles
import useStyles from "./body.style";

// copyright
import Copyright from "../../Copyright/Copyright";

// reducer actions
import { signin, signup } from "../../../redux/actions/sign.action";
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

// user data reducer
import { setUserData } from "../../../utils/storageData";

// github credentials
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../../../config/github";

// components
import DividerWithText from "../../Divider/DividerWithText";
import GoogleButton from "../Buttons/Google.button";
import GitHubButton from "../Buttons/Github.button";

const Body = ({ toggleSignUp, toggleSignIn, setNotification, setUser }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(10, "Maximum 10 characters")
        .required("Required!"),
      lastName: Yup.string()
        .trim()
        .min(2, "Mininum 2 characters")
        .max(10, "Maximum 10 characters")
        .required("Required!"),
      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
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

  // input data handle
  const onChangeHandle = (e) => {
    formik.setFieldTouched(e.target.id);
    return formik.handleChange(e);
  };

  // google response
  const responseGoogle = async (response, status) => {
    try {
      if (!status) {
        return setNotification({
          open: true,
          severity: "error",
          msg: "Login Unsuccessful",
        });
      }
      console.log("google token --> ", response.accessToken);
      console.log("google user_data --> ", response.profileObj);
      let userData = {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        img: response.profileObj.imageUrl,
      };

      // sending data to server
      let res = await httpRequest({
        method: "POST",
        url: "http://localhost:5000/api/users/custom",
        data: userData,
      });

      const { user, token } = res.data.data;

      setUser(user, token);

      setNotification({
        open: true,
        severity: "success",
        msg: "Login Successful",
      });
      toggleSignUp();
    } catch (err) {
      console.log(err);

      if (!!err.response)
        setNotification({
          open: true,
          severity: "error",
          msg: err.response.data.msg,
        });
    }
  };

  // github response
  const responseGithub = async (response) => {
    try {
      let response_data = await httpRequest({
        method: "POST",
        url:
          "https://cors-anywhere.herokuapp.com/" +
          "https://github.com/login/oauth/access_token",
        data: {
          client_id: GITHUB_CLIENT_ID,
          code: response.code,
          client_secret: GITHUB_CLIENT_SECRET,
        },
      });

      console.log("github token --> ", response_data.data.access_token);

      let user_data = await axios("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `token ${response_data.data.access_token}`,
        },
      });

      let userData = {
        img: user_data.data.avatar_url,
        github: user_data.data.url,
        email: user_data.data.email,
        firstName: user_data.data.name
          ? user_data.data.name.split(" ")[0]
          : user_data.data.login,
        lastName: user_data.data.name
          ? user_data.data.name.split(" ")[1]
          : null,
      };

      // sending data to server
      let res = await httpRequest({
        method: "POST",
        url: "http://localhost:5000/api/users/custom",
        data: userData,
      });

      const { user, token } = res.data.data;

      setUser(user, token);

      console.log("github user_data --> ", user_data.data);

      setNotification({
        open: true,
        severity: "success",
        msg: "Login Successful!!",
      });

      toggleSignUp();
    } catch (err) {
      console.log(err);

      if (!!err.response)
        setNotification({
          open: true,
          severity: "error",
          msg: err.response.data.msg,
        });
    }
  };

  // form submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password,
      };
      let response = await httpRequest({
        method: "POST",
        url: "http://localhost:5000/api/users/signup",
        data,
      });

      // if all good
      setNotification({
        open: true,
        severity: "success",
        msg: response.data.msg,
      });

      // switching to login
      toggleSignUp();
      toggleSignIn();
    } catch (err) {
      if (!!err.response)
        setNotification({
          open: true,
          severity: "error",
          msg: err.response.data.msg,
        });
    }
  };

  // github button click logic
  const githubButtonClick = () =>
    document.getElementById("github_button").children[0].click();

  // return component ---------------------------------------------
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                value={formik.values.firstName}
                onChange={onChangeHandle}
                error={formik.errors.firstName && formik.touched.firstName}
                helperText={formik.errors.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formik.values.lastName}
                onChange={onChangeHandle}
                error={formik.errors.lastName && formik.touched.lastName}
                helperText={formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={onChangeHandle}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={onChangeHandle}
                error={formik.errors.password && formik.touched.password}
                helperText={formik.errors.password}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              !!formik.errors.firstName ||
              !!formik.errors.lastName ||
              !!formik.errors.email ||
              !!formik.errors.password
            }
          >
            Sign Up
          </Button>

          <DividerWithText>Or</DividerWithText>
          {/*Github button*/}
          <GitHubButton
            useStyles={useStyles}
            githubButtonClick={githubButtonClick}
          />

          {/*Google button*/}
          <GoogleButton responseGoogle={responseGoogle} useStyles={useStyles} />

          <Grid container justify="flex-end">
            <Grid item>
              <Link
                className={classes.link}
                variant="body2"
                onClick={() => {
                  toggleSignUp();
                  toggleSignIn();
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {/*main github button*/}
        <div hidden id="github_button">
          <GitHubLogin
            clientId={GITHUB_CLIENT_ID}
            onSuccess={responseGithub}
            onFailure={responseGithub}
            redirectUri=""
          />
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    toggleSignUp: () => {
      dispatch({
        type: signup,
      });
    },
    toggleSignIn: () => {
      dispatch({
        type: signin,
      });
    },
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
    setUser: (data, token) => dispatch(setUserData(data, token)),
  };
};

export default connect(null, mapActionToProps)(Body);
