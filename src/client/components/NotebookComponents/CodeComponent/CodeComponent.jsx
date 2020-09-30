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

  // code state
  const [code, setCode] = useState(`// Type your code here\n`);

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

  // result state
  const [result, setResult] = useState([]);

  // code runner
  const evaluate_code = () => {
    // overriding console.log function
    let resultArr = [];

    console.log = function (value) {
      resultArr.push(value);
      return resultArr;
    };

    try {
      // eslint-disable-next-line
      let result_data = eval(code);
      setResult(result_data);
    } catch (error) {
      console.log("error ==>>>>> ", error);
    }
  };

  const playHandler = (idx) => {
    console.log("component to be runned - ", idx);
    setRun(true);
    evaluate_code();
  };

  const refreshHandler = (idx) => {
    evaluate_code();
  };

  const closeHandler = (idx) => {
    console.log("component output closed - ", idx);
    setRun(false);
  };

  const ResultComponent = () => {
    return (
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        {map(result, (elem, idx) => (
          <h5 key={idx}>{elem}</h5>
        ))}
      </div>
    );
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
          <CodeEditor theme={theme} run={run} code={code} setCode={setCode} />

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
            <ResultComponent />
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
