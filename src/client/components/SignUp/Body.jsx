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
import { GoogleLogin } from "react-google-login";
import GitHubLogin from "react-github-login";
import axios from "axios";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

// axios
import httpRequest from "../../config/axios.config";

// styles
import useStyles from "./body.style";

// copyright
import Copyright from "../Copyright/Copyright";

// Divider
import DividerWithText from "../Divider/DividerWithText";

// reducer actions
import { signin, signup } from "../../redux/actions/sign.action";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// google credentials
import { GOOGLE_CLIENT_ID } from "../../config/google";

// github credentials
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../../config/github";

const Body = ({ toggleSignUp, toggleSignIn, setNotification }) => {
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

  const onChangeHandle = (e) => {
    formik.setFieldTouched(e.target.id);
    return formik.handleChange(e);
  };

  const responseGoogle = (response) => {
    console.log("google token --> ", response.accessToken);
    console.log("google user_data --> ", response.profileObj);
  };

  const responseGithub = async (response) => {
    // console.log("github response --> ", response);

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

    console.log("github user_data --> ", user_data.data);
  };

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

          <Button
            type="button"
            width="50%"
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ marginTop: "10px" }}
            onClick={() =>
              document.getElementById("github_button").children[0].click()
            }
          >
            <FontAwesomeIcon icon={faGithub} style={{ marginRight: "10px" }} />{" "}
            Github
          </Button>

          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                type="button"
                width="50%"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ float: "right", marginTop: "10px" }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  style={{ marginRight: "10px" }}
                />{" "}
                Google
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />

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
  };
};

export default connect(null, mapActionToProps)(Body);
