import React from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

//styles
import useStyles from "../component.style";

const NoteComponent = ({ component, idx, deleteHandler, editHandler }) => {
  const classes = useStyles();

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <NotesRoundedIcon />
    </span>
  ));

  return (
    <div
      className={classes.component_wrapper}
      key={idx}
      onDoubleClick={() => editHandler(idx)}
    >
      <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
      <div className={classes.component}>
        <h1 style={{ textAlign: "center" }}>{component}</h1>
        <DeleteOutlineOutlinedIcon
          className={classes.delete_icon}
          onClick={() => deleteHandler(idx)}
        />
        <EditOutlinedIcon
          className={classes.edit_icon}
          onClick={() => editHandler(idx)}
        />
        <DragHandle />
      </div>
    </div>
  );
};

//Draggable elements
const SortableItem = sortableElement((props) => <NoteComponent {...props} />);

export default SortableItem;
