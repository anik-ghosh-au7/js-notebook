import React from "react";
import Typography from "@material-ui/core/Typography";

// import style
import useStyles from "./about.style";

const AboutUs = () => {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        <Typography variant="h1" color="primary">
          Welcome
        </Typography>
        <Typography variant="h6" color="primary">
          We believe knowledge is meant to be shared. Alone we can do so little
          but together we can do so much. JS-NoteBook is a web application that
          you can use to create and share documents that contain live javascript
          code, equations, visualizations, text, and images. You can download
          your notebook.
        </Typography>
      </div>
    </div>
  );
};

export default AboutUs;
