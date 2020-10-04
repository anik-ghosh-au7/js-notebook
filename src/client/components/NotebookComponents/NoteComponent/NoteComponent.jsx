import React from "react";
import { connect } from "react-redux";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

//styles
import useStyles from "../component.style";

// reducer action
import { UPDATE_COMPONENTS } from "../../../redux/actions/notebooks.action";

const NoteComponent = ({
  component,
  idx,
  deleteHandler,
  notebookId,
  updateComponent,
  canEdit,
}) => {
  const classes = useStyles();

  // edit state
  const [isEdit, setIsEdit] = React.useState(false);

  // note data state
  const [data, setData] = React.useState("");

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <NotesRoundedIcon />
    </span>
  ));

  const onChangeHandler = (e) => {
    setData(e.currentTarget.value);
  };

  // edit handler
  const editHandler = (idx) => {
    if (canEdit) setIsEdit(true);
  };

  // save handler
  const saveHandler = (idx) => {
    setIsEdit(false);
    updateComponent(notebookId, idx, data);
  };

  return (
    <div
      className={classes.component_wrapper}
      key={idx}
      onDoubleClick={() => editHandler(idx)}
      onBlur={() => saveHandler(idx)}
    >
      <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
      <div className={classes.component}>
        {isEdit ? (
          <TextareaAutosize
            rowsMin={2}
            placeholder="Type here"
            className={classes.text_field}
            fullwidth="true"
            autoFocus
            defaultValue={component.value}
            onChange={onChangeHandler}
          />
        ) : (
          <div className={classes.note_component}>
            {!!component.value ? (
              <p>{component.value}</p>
            ) : (
              <span className={classes.default_text}>Double Click To Edit</span>
            )}
          </div>
        )}
        <DeleteOutlineOutlinedIcon
          className={classes.delete_icon}
          onClick={() => deleteHandler(idx)}
        />
        {!isEdit ? (
          <EditOutlinedIcon
            className={classes.edit_icon}
            onClick={() => editHandler(idx)}
          />
        ) : (
          <SaveOutlinedIcon
            className={classes.edit_icon}
            onClick={() => saveHandler(idx)}
          />
        )}
        <DragHandle />
      </div>
    </div>
  );
};

//Draggable elements
const SortableItem = sortableElement((props) => <NoteComponent {...props} />);

const mapStateToProps = (state) => {
  return {
    notebookId: state.activeTab,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    updateComponent: (id, componentIdx, value) => {
      dispatch({
        type: UPDATE_COMPONENTS,
        payload: { id, componentIdx, value },
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SortableItem);
