import React, { useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import { map } from "lodash";
import clsx from "clsx";

//styles
import useStyles from "../component.style";

const ResultComponent = ({ result }) => {
  const classes = useStyles();

  // color state
  const [color, setColor] = useState("white");
  const colorArray = ["white", "black"];

  // Color Change Handler
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <div
        className={clsx(classes.result_component, {
          [classes.result_component_white]: color === "white",
          [classes.result_component_black]: color === "black",
        })}
      >
        {map(result, (elem, idx) => (
          <h4
            key={idx}
            className={clsx(classes.result_content, {
              [classes.result_content_black]: color === "black",
            })}
          >
            {elem}
          </h4>
        ))}
      </div>
      {/* ----------------------- */}

      <Select
        value={color}
        onChange={handleColorChange}
        className={classes.code_theme}
        disableUnderline={true}
      >
        {map(colorArray, (name, idx) => (
          <MenuItem value={name} key={idx}>
            {name}
          </MenuItem>
        ))}
      </Select>

      {/* ----------------------- */}
    </>
  );
};

export default ResultComponent;
