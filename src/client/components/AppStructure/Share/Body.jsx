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

// copyright
import Copyright from "../../Copyright/Copyright";

// axios
import httpRequest from "../../../config/axios.config";

// styles
import useStyles from "./body.style";
import DividerWithText from "../../Divider/DividerWithText";
import { Grid } from "@material-ui/core";

const Body = ({ toggleShare, notebookId }) => {
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
      console.log("response ===>>> ", response.data);
    } catch (error) {
      console.log(error.response);
      setError("error");
    }
  };

  const onCancelHandler = () => {
    toggleShare();
  };

  return (
    console.log("error", !!formik.errors.email || !!error, formik.errors),
    (
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
    )
  );
};

const mapStateToProps = (state) => {
  return {
    notebookId: state.activeTab,
  };
};

export default connect(mapStateToProps)(Body);
