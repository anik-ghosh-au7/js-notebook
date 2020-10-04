import { Typography, TextField } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
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
import Share from "../../AppStructure/Share/Share";

// reducer action
import {
  CHANGE_ARRANGEMENT,
  DELETE_COMPONENT,
  UPDATE_NOTEBOOK,
} from "../../../redux/actions/notebooks.action";
import { SET_TAB } from "../../../redux/actions/activetab.action";

// sortable container
const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

//  notebook component
const NewNotebook = (props) => {
  const classes = useStyles();

  // flag for edit Title
  const [flag, setFlag] = React.useState(false);

  // title state
  const [title, setTitle] = React.useState(props.title);

  // error state
  const [isError, setIsError] = React.useState(false);

  const {
    setActiveTab,
    id,
    userName,
    updateNotebook,
    author,
    canEdit,
    isSearched,
  } = props;

  // component did mount
  useEffect(() => {
    setActiveTab(id);
  }, [setActiveTab, id]);

  // updating author
  useEffect(() => {
    if (canEdit && !isSearched) {
      if (userName !== "Guest" && author === "Guest")
        updateNotebook(id, "author", userName);
    }
  }, [id, userName, updateNotebook, author, canEdit, isSearched]);

  const deleteHandler = (idx) => {
    if (!isSearched) props.deleteComponent(props.notebookId, idx);
  };

  const editTitleHandler = () => {
    if (canEdit && !isSearched) setFlag(true);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (!isSearched)
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
        // onClick={saveTitleHandler}
        onBlur={saveTitleHandler}
        onDoubleClick={editTitleHandler}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            saveTitleHandler();
          }
        }}
        title="Double click to edit"
      >
        <div className={classes.wrapper}>
          <h3 className={classes.label}>
            <b>Author : </b>
            <em>{props.author}</em>
          </h3>
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
      <div>
        <SortableContainer
          onSortEnd={onSortEnd}
          useDragHandle
          useWindowAsScrollContainer
        >
          {map(props.components, (component, idx) => {
            switch (component.name) {
              case "Note":
                return (
                  <NoteComponent
                    key={`item-${idx}`}
                    index={idx}
                    idx={idx}
                    component={component}
                    deleteHandler={deleteHandler}
                    canEdit={!isSearched}
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
                    canEdit={!isSearched}
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
                    canEdit={!isSearched}
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
                    runAll={props.runAll}
                    canEdit={!isSearched}
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
                    canEdit={!isSearched}
                  />
                );
              default:
                break;
            }
          })}
        </SortableContainer>
      </div>
      <ScrollDown components={props.components} />
      <Share />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notebookId: state.activeTab,
    userName: !!state.userData.firstName
      ? `${state.userData.firstName} ${
          !!state.userData.lastName ? state.userData.lastName : ""
        }`
      : "Guest",
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
    setActiveTab: (id) => {
      dispatch({
        type: SET_TAB,
        payload: id,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(NewNotebook);
