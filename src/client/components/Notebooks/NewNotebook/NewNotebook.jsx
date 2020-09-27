import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { map } from "lodash";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";

// styles
import useStyles from "./newNotebook.style";

// components
import ScrollDown from "../../ScrollDown/ScrollDown";

const NewNotebook = (props) => {
  const classes = useStyles();

  const deleteHandler = (idx) => {
    console.log("component to be deleted - ", idx);
  };

  const editHandler = (idx) => {
    console.log("component to be edited - ", idx);
  };

  const playHandler = (idx) => {
    console.log("component to be runned - ", idx);
  };

  return (
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
          <Typography variant="h3" component="h3" className={classes.logo_text}>
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
          <div
            className={classes.component_wrapper}
            key={idx}
            onDoubleClick={() => editHandler(idx)}
          >
            <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
            <div className={classes.component}>
              <h1>{component}</h1>
              <DeleteOutlineOutlinedIcon
                className={classes.delete_icon}
                onClick={() => deleteHandler(idx)}
              />
              <EditOutlinedIcon
                className={classes.edit_icon}
                onClick={() => editHandler(idx)}
              />
              {(component === "Code" || component === "Chart") && (
                <PlayCircleFilledWhiteOutlinedIcon
                  className={classes.play_icon}
                  onClick={() => playHandler(idx)}
                />
              )}
            </div>
          </div>
        );
      })}
      <ScrollDown />
    </Fragment>
  );
};

export default NewNotebook;
