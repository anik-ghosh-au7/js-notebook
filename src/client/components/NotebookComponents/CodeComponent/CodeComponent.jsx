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
import { map } from "lodash";
import { MenuItem, Select } from "@material-ui/core";

//styles
import useStyles from "../component.style";

// components
import CodeEditor from "./CodeEditor";

const CodeComponent = ({ component, idx, deleteHandler, editHandler }) => {
  const classes = useStyles();

  // theme state
  const [theme, setTheme] = useState("monokai");
  const themeArray = [
    "monokai",
    "github",
    "tomorrow",
    "twilight",
    "kuroir",
    "xcode",
    "textmate",
    "terminal",
    "solarized_dark",
    "solarized_light",
  ];

  // Theme Change Handler
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

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
          style={{ height: "200px" }}
        >
          <CodeEditor theme={theme} run={run} />

          {/* ----------------------- */}

          <Select
            value={theme}
            onChange={handleThemeChange}
            className={classes.code_theme}
            disableUnderline={true}
          >
            {map(themeArray, (name, idx) => (
              <MenuItem value={name} key={idx}>
                {name}
              </MenuItem>
            ))}
          </Select>

          {/* ----------------------- */}

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
            <h1
              style={{ textAlign: "center" }}
            >{`${component.name} Output`}</h1>
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
  return <CodeComponent {...props} />;
});

export default SortableItem;
