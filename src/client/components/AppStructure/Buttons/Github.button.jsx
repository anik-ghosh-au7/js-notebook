import React from "react";
import Button from "@material-ui/core/Button";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const GithubButton = ({ useStyles, githubButtonClick }) => {
  const classes = useStyles();

  return (
    <Button
      type="button"
      width="50%"
      variant="contained"
      color="primary"
      className={classes.submit}
      style={{ marginTop: "10px" }}
      onClick={githubButtonClick}
    >
      <FontAwesomeIcon icon={faGithub} style={{ marginRight: "10px" }} /> Github
    </Button>
  );
};

export default GithubButton;
