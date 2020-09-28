import React from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";

//styles
import useStyles from "../component.style";

const NoteComponent = ({ component, idx, deleteHandler, editHandler }) => {
  const classes = useStyles();
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
        <NotesRoundedIcon className={classes.component_icon} />
      </div>
    </div>
  );
};

export default NoteComponent;
