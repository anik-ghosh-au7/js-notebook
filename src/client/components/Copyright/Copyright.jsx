import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import React from "react";

// config
import homeUrl from "../../config/url";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={homeUrl}>
        JS-NoteBook
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
