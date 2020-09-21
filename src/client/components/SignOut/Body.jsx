import React, { Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import HelpIcon from "@material-ui/icons/Help";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";

// styles
import useStyles from "./body.style";

// copyright
import Copyright from "../Copyright/Copyright";

// reducer actions
import { clearUserData } from "../../utils/storageData";

// Forget Password component -----------------------------------------
const Body = ({ toggleSignOut, clearUserData }) => {
  const classes = useStyles();

  const onClickHandler = (e) => {
    const { innerText } = e.target;
    console.log(innerText, e.target);
    if (innerText === "YES") clearUserData();
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
          <Typography component="h1" variant="h5">
            Do You Want to Sign Out?
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickHandler}
            className={classes.submit}
          >
            Yes
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickHandler}
            className={classes.submit}
          >
            No
          </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
};

const mapActionToProps = {
  clearUserData,
};

export default connect(null, mapActionToProps)(Body);
