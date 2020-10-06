import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

// github credentials
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../../../config/github";

// Components
import DividerWithText from "../../Divider/DividerWithText";
import GoogleButton from "../Buttons/Google.button";
import GithubButton from "../Buttons/Github.button";

// reducer actions
import { forget, signin, signup } from "../../../redux/actions/sign.action";
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

// user data reducer
import { setUserData } from "../../../utils/storageData";

// config
import homeUrl from "../../../config/url";

//  signin component -----------------------------------------------
const SignIn = ({
  toggleSignUp,
  toggleSignIn,
  toggleForget,
  setNotification,
  setUser,
}) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
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

  // formik input handle
  let onChangeHandle = (e) => {
    formik.setFieldTouched(e.target.id);
    return formik.handleChange(e);
  };

  // Google response
  const responseGoogle = async (response, status) => {
    try {
      if (!status) {
        return setNotification({
          open: true,
          severity: "error",
          msg: "Login Unsuccessful",
        });
      }

      let userData = {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        img: response.profileObj.imageUrl,
      };

      // sending data to server
      let res = await httpRequest({
        method: "POST",
        url: `${homeUrl}api/users/custom`,
        data: userData,
      });

      const { user, token } = res.data.data;

      setUser(user, token);

      setNotification({
        open: true,
        severity: "success",
        msg: "Login Successful",
      });
      toggleSignIn();
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Sorry! server is down.",
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
        url: `${homeUrl}api/users/custom`,
        data: userData,
      });

      const { user, token } = res.data.data;

      setUser(user, token);

      setNotification({
        open: true,
        severity: "success",
        msg: "Login Successful!!",
      });

      toggleSignIn();
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Sorry! server is down.",
      });
    }
  };

  // github button click logic
  const githubButtonClick = () =>
    document.getElementById("github_button").children[0].click();

  // on click submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        email: formik.values.email,
        password: formik.values.password,
      };
      let response = await httpRequest({
        method: "POST",
        url: `${homeUrl}api/users/login`,
        data,
      });

      // if all good
      setNotification({
        open: true,
        severity: "success",
        msg: response.data.msg,
      });

      // setting data to local storage
      setUser(response.data.data.user, response.data.data.token);

      // switching to user home
      toggleSignIn();
    } catch (err) {
      if (!!err.response) {
        setNotification({
          open: true,
          severity: "error",
          msg: err.response.data.msg,
        });
      }
    }
  };

  // return component -----------------------------------------------------------
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChangeHandle}
            error={formik.errors.email && formik.touched.email}
            helperText={formik.errors.email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangeHandle}
            error={formik.errors.password && formik.touched.password}
            helperText={formik.errors.password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!!formik.errors.email || !!formik.errors.password}
          >
            Sign In
          </Button>

          <DividerWithText>Or</DividerWithText>
          {/*Github Button*/}
          <GithubButton
            useStyles={useStyles}
            githubButtonClick={githubButtonClick}
          />

          {/*Google Button*/}
          <GoogleButton responseGoogle={responseGoogle} useStyles={useStyles} />

          <Grid container>
            <Grid item xs>
              <Link
                className={classes.link}
                variant="body2"
                onClick={() => {
                  toggleSignIn();
                  toggleForget();
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.link}
                variant="body2"
                onClick={() => {
                  toggleSignIn();
                  toggleSignUp();
                }}
              >
                {"Don't have an account? Sign Up"}
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
      <Box mt={8}>
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
    toggleForget: () => {
      dispatch({
        type: forget,
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

export default connect(null, mapActionToProps)(SignIn);
