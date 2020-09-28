import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { map } from "lodash";
import { connect } from "react-redux";
import { sortableContainer } from "react-sortable-hoc";

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

// reducer action
import { CHANGE_ARRANGEMENT } from "../../../redux/actions/notebooks.action";

// sortable container
const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    props.changeArrangement(props.notebookId, oldIndex, newIndex);
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
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {map(props.components, (component, idx) => {
          switch (component) {
            case "Note":
              return (
                <NoteComponent
                  key={`item-${idx}`}
                  index={idx}
                  idx={idx}
                  component={component}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              );
            case "Link":
              return (
                <LinkComponent
                  key={`item-${idx}`}
                  index={idx}
                  idx={idx}
                  component={component}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              );
            case "Chart":
              return (
                <ChartComponent
                  key={`item-${idx}`}
                  index={idx}
                  idx={idx}
                  component={component}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              );
            case "Code":
              return (
                <CodeComponent
                  component={component}
                  key={`item-${idx}`}
                  index={idx}
                  idx={idx}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              );
            case "Image":
              return (
                <ImageComponent
                  component={component}
                  key={`item-${idx}`}
                  index={idx}
                  idx={idx}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              );
            default:
              break;
          }
        })}
        <ScrollDown />
      </SortableContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notebookId: state.activeTab,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    changeArrangement: (id, from, to) =>
      dispatch({
        type: CHANGE_ARRANGEMENT,
        payload: {
          id,
          from,
          to,
        },
      }),
  };
};

export default connect(mapStateToProps, mapActionToProps)(NewNotebook);
