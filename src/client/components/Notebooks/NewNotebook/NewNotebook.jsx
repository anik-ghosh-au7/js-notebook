import { Typography, TextField } from "@material-ui/core";
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
import {
  CHANGE_ARRANGEMENT,
  DELETE_COMPONENT,
  UPDATE_NOTEBOOK,
} from "../../../redux/actions/notebooks.action";

// sortable container
const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const NewNotebook = (props) => {
  const classes = useStyles();

  // flag for edit Title
  const [flag, setFlag] = React.useState(false);

  // title state
  const [title, setTitle] = React.useState(props.title);

  // error state
  const [isError, setIsError] = React.useState(false);

  const deleteHandler = (idx) => {
    props.deleteComponent(props.notebookId, idx);
  };

  const editHandler = (idx) => {
    console.log("component to be edited - ", idx);
  };

  const editTitleHandler = () => {
    setFlag(true);
    console.log("edit");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    props.changeArrangement(props.notebookId, oldIndex, newIndex);
  };

  // custom title validation
  const checkTitle = (title) => {
    let text = title.trim();
    if (text.length < 2 || text.length > 30) return setIsError(true);
    setIsError(false);
  };

  const onTitleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
    checkTitle(e.currentTarget.value);
  };

  const saveTitleHandler = () => {
    if (flag && !isError) {
      setFlag(false);
      props.updateNotebook(props.notebookId, "title", title.trim());
      setTitle(title.trim());
    }
  };

  return (
    <Fragment>
      <div
        className={classes.container}
        onClick={saveTitleHandler}
        onDoubleClick={editTitleHandler}
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
          {flag ? (
            <TextField
              error={isError}
              id="filled-basic"
              label="Title"
              variant="outlined"
              value={title}
              autoFocus={true}
              onChange={onTitleChangeHandler}
              helperText={isError && "Title should be 2 to 30 char long"}
            />
          ) : (
            <Typography
              variant="h3"
              component="h3"
              className={classes.logo_text}
            >
              {props.title}
            </Typography>
          )}
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
    deleteComponent: (id, index) => {
      dispatch({
        type: DELETE_COMPONENT,
        payload: { id, index },
      });
    },
    updateNotebook: (id, name, value) => {
      dispatch({
        type: UPDATE_NOTEBOOK,
        payload: { id, name, value },
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(NewNotebook);
