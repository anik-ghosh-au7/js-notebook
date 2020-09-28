import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { map } from "lodash";
import { connect } from "react-redux";

// styles
import useStyles from "./newNotebook.style";

// components
import ScrollDown from "../../ScrollDown/ScrollDown";
import {
  CodeComponent,
  ChartComponent,
  LinkComponent,
  NoteComponent,
  ImageComponent,
} from "../../NotebookComponents/";

const NewNotebook = (props) => {
  const classes = useStyles();

  const deleteHandler = (idx) => {
    console.log("component to be deleted - ", idx);
  };

  const editHandler = (idx) => {
    console.log("component to be edited - ", idx);
  };

  const editNotebookHandler = () => {
    console.log("notebook to be edited - ", props.notebookId);
  };

  return (
    <Fragment>
      <div
        className={classes.container}
        onDoubleClick={editNotebookHandler}
        title="Double click to edit"
      >
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
        switch (component) {
          case "Note":
            return (
              <NoteComponent
                component={component}
                idx={idx}
                key={idx}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            );
          case "Link":
            return (
              <LinkComponent
                component={component}
                idx={idx}
                key={idx}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            );
          case "Chart":
            return (
              <ChartComponent
                component={component}
                idx={idx}
                key={idx}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            );
          case "Code":
            return (
              <CodeComponent
                component={component}
                idx={idx}
                key={idx}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            );
          case "Image":
            return (
              <ImageComponent
                component={component}
                idx={idx}
                key={idx}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            );
          default:
            break;
        }
      })}
      <ScrollDown />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notebookId: state.activeTab,
  };
};

export default connect(mapStateToProps)(NewNotebook);
