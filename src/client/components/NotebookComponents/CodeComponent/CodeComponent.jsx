import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import clsx from "clsx";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

//styles
import useStyles from "../component.style";

const CodeComponent = ({ component, idx, deleteHandler, editHandler }) => {
  const classes = useStyles();

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <CodeRoundedIcon />
    </span>
  ));

  const [run, setRun] = useState(false);

  const playHandler = (idx) => {
    console.log("component to be runned - ", idx);
    setRun(true);
  };

  const refreshHandler = (idx) => {
    console.log("component output refreshed - ", idx);
  };

  const closeHandler = (idx) => {
    console.log("component output closed - ", idx);
    setRun(false);
  };

  return (
    <div className={classes.split_wrapper}>
      <div
        className={classes.component_wrapper}
        key={idx}
        onDoubleClick={() => editHandler(idx)}
      >
        <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
        <div
          className={clsx({
            [classes.component]: !run,
            [classes.shrink_component]: run,
          })}
        >
          <h1 style={{ textAlign: "center" }}>{component}</h1>
          <DeleteOutlineOutlinedIcon
            className={classes.delete_icon}
            onClick={() => deleteHandler(idx)}
          />
          <EditOutlinedIcon
            className={classes.edit_icon}
            onClick={() => editHandler(idx)}
          />
          <PlayCircleFilledWhiteOutlinedIcon
            className={classes.play_icon}
            onClick={() => playHandler(idx)}
          />
          <DragHandle />
        </div>
      </div>

      {run && (
        <div
          className={clsx(classes.component_wrapper, {
            [classes.move_shrink_component]: run,
          })}
          key={`split - ${idx}`}
          onDoubleClick={() => editHandler(idx)}
        >
          <h3 className={classes.output}>{`Out [ ${idx + 1} ] : `}</h3>
          <div className={classes.shrink_component}>
            <h1 style={{ textAlign: "center" }}>{`${component} Output`}</h1>
            <RefreshRoundedIcon
              className={classes.edit_icon}
              onClick={() => refreshHandler(idx)}
            />
            <CloseRoundedIcon
              className={classes.delete_icon}
              onClick={() => closeHandler(idx)}
            />
            <CompareArrowsIcon className={classes.component_icon} />
          </div>
        </div>
      )}
    </div>
  );
};

//Draggable elements
const SortableItem = sortableElement((props) => {
  console.log(props);
  return <CodeComponent {...props} />;
});

export default SortableItem;
