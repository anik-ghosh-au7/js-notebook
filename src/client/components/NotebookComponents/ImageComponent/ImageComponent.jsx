import React from "react";
import { connect } from "react-redux";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

//styles
import useStyles from "../component.style";

// reducer actions
import { UPDATE_COMPONENTS } from "../../../redux/actions/notebooks.action";

//components
import DropZone from "../../DropZone/DropZone";

const ImageComponent = ({
  component,
  idx,
  deleteHandler,
  notebookId,
  updateComponent,
}) => {
  const classes = useStyles();

  // image data state
  const [data, setData] = React.useState("");

  // Dropzone state
  const [isOpen, setIsOpen] = React.useState(false);

  // edit handler
  const editHandler = () => {
    setIsOpen(true);
  };

  // save handler
  const saveHandler = (idx) => {
    setIsOpen(false);
    updateComponent(notebookId, idx, data);
  };

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <ImageOutlinedIcon />
    </span>
  ));

  return (
    <div
      className={classes.component_wrapper}
      key={idx}
      onDoubleClick={() => editHandler()}
    >
      <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
      <div className={classes.component}>
        {!isOpen ? (
          <h1 style={{ textAlign: "center" }}>{component.name}</h1>
        ) : (
          <DropZone isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        <DeleteOutlineOutlinedIcon
          className={classes.delete_icon}
          onClick={() => deleteHandler(idx)}
        />
        {!isOpen ? (
          <EditOutlinedIcon
            className={classes.edit_icon}
            onClick={() => editHandler()}
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
const SortableItem = sortableElement((props) => <ImageComponent {...props} />);

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
