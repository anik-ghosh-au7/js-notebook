import React from "react";
import { GoogleLogin } from "react-google-login";
import Button from "@material-ui/core/Button";

// google credentials
import { GOOGLE_CLIENT_ID } from "../../../config/google";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleButton = ({ responseGoogle, useStyles }) => {
  const classes = useStyles();
  return (
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
          <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px" }} />{" "}
          Google
        </Button>
      )}
      buttonText="Login"
      onSuccess={(data) => responseGoogle(data, true)}
      onFailure={(data) => responseGoogle(data, false)}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleButton;
