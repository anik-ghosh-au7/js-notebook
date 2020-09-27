import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { map } from "lodash";

// styles
import useStyles from "./newNotebook.style";

const NewNotebook = (props) => {
  const classes = useStyles();

  return (
    console.log(props),
    (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <h2 className={classes.label}>
              <b>Author : </b>
              <em>{props.author}</em>
            </h2>
            <h3 className={classes.label}>
              <b>Modified : </b>
              {props.modifiedOn}
            </h3>
          </div>
          <div className={classes.wrapper}>
            <Typography
              variant="h3"
              component="h3"
              className={classes.logo_text}
            >
              {props.title}
            </Typography>
          </div>
          <div className={classes.wrapper}>
            <h3 className={classes.label}>
              <b>Created : </b>
              {props.createdOn}
            </h3>
            <h3 className={classes.label}>
              <b>Time : </b>
              {props.time}
            </h3>
          </div>
        </div>
        {map(props.components, (component, idx) => {
          return (
            <div className={classes.component} key={idx}>
              <h1>{component}</h1>
            </div>
          );
        })}
      </Fragment>
    )
  );
};

export default NewNotebook;
