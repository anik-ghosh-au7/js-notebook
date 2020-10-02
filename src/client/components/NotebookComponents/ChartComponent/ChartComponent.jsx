import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import BarChartIcon from "@material-ui/icons/BarChart";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import clsx from "clsx";
import { sortableElement, sortableHandle } from "react-sortable-hoc";
import { map } from "lodash";
import { MenuItem, Select } from "@material-ui/core";

//styles
import useStyles from "../component.style";

// reducer action
import { UPDATE_COMPONENTS } from "../../../redux/actions/notebooks.action";
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

// component
import {
  PolarChart,
  BarChart,
  RadarChart,
  LineChart,
  DoughnutChart,
  PieChart,
} from "./Charts";
import ChartInput from "./ChartInput";

// component -------------------------------------------------------------------------------
const ChartComponent = ({
  component,
  idx,
  deleteHandler,
  updateComponent,
  notebookId,
  setNotification,
}) => {
  const classes = useStyles();

  // chart array
  let chartArr = ["Polar", "Bar", "Radar", "Line", "Doughnut", "Pie"];

  // handle chart change
  const handleChartChange = (e) => {
    setData({
      ...data,
      chart: e.target.value,
    });
  };

  // data state
  const [data, setData] = useState({
    title:
      !!component.value && !!component.value.title ? component.value.title : "",
    labels:
      !!component.value && !!component.value.labels
        ? component.value.labels
        : [""],
    values:
      !!component.value && !!component.value.values
        ? component.value.values
        : [0],
    chart:
      !!component.value && !!component.value.chart
        ? component.value.chart
        : "Polar",
    description:
      !!component.value && !!component.value.description
        ? component.value.description
        : "",
  });

  // for setting state as redux state
  useEffect(() => {
    if (!!component.value)
      setData({
        title: component.value.title,
        labels: component.value.labels,
        values: component.value.values,
        chart: component.value.chart,
        description: component.value.description,
      });
    else {
      setData({
        title: "",
        labels: [""],
        values: [0],
        chart: "Polar",
        description: "",
      });
    }
  }, [component.value]);

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <BarChartIcon />
    </span>
  ));

  const run = true;

  const refreshHandler = () => {
    setData({
      title:
        !!component.value && !!component.value.title
          ? component.value.title
          : "",
      labels:
        !!component.value && !!component.value.labels
          ? component.value.labels
          : [""],
      values:
        !!component.value && !!component.value.values
          ? component.value.values
          : [0],
      chart:
        !!component.value && !!component.value.chart
          ? component.value.chart
          : "Polar",
      description:
        !!component.value && !!component.value.description
          ? component.value.description
          : "",
    });
  };

  const saveHandler = (idx) => {
    updateComponent(notebookId, idx, data);
  };

  const onSaveHandler = () => {
    saveHandler();
    setNotification({
      open: true,
      severity: "success",
      msg: "data saved successfully",
    });
  };

  // Custom Blur Handler for parent component to save data
  const blurHandler = (e, idx) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        saveHandler(idx);
      }
    }, 0);
  };

  // const blurHandler = (idx) => {
  //   updateComponent(notebookId, idx, data);
  // };

  return (
    <div className={classes.split_wrapper} onBlur={(e) => blurHandler(e, idx)}>
      <div className={classes.component_wrapper} key={idx}>
        <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
        <div
          className={clsx({
            [classes.component]: !run,
            [classes.shrink_component]: run,
          })}
        >
          <ChartInput
            data={data}
            setData={setData}
            setNotification={setNotification}
          />
          <DeleteOutlineOutlinedIcon
            className={classes.delete_icon}
            onClick={() => deleteHandler(idx)}
          />
          <SaveOutlinedIcon
            className={classes.edit_icon}
            onClick={onSaveHandler}
          />
          <RefreshRoundedIcon
            className={classes.play_icon}
            onClick={refreshHandler}
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
        >
          <h3 className={classes.output}>{`Out [ ${idx + 1} ] : `}</h3>
          <div
            className={classes.shrink_component}
            style={{ paddingTop: "20px" }}
          >
            {data.chart === "Polar" && (
              <PolarChart
                labels={data.labels}
                datasets={[{ label: data.description, data: data.values }]}
                title={data.title}
              />
            )}
            {data.chart === "Bar" && (
              <BarChart
                labels={data.labels}
                datasets={[{ label: data.description, data: data.values }]}
                title={data.title}
              />
            )}
            {data.chart === "Radar" && (
              <RadarChart
                labels={data.labels}
                datasets={[{ label: data.description, data: data.values }]}
                title={data.title}
              />
            )}
            {data.chart === "Line" && (
              <LineChart
                labels={data.labels}
                datasets={[{ label: data.description, data: data.values }]}
                title={data.title}
              />
            )}
            {data.chart === "Doughnut" && (
              <DoughnutChart
                labels={data.labels}
                datasets={[{ label: data.description, data: data.values }]}
                title={data.title}
              />
            )}
            {data.chart === "Pie" && (
              <PieChart
                labels={data.labels}
                datasets={[{ label: data.description, data: data.values }]}
                title={data.title}
              />
            )}

            <Select
              value={data.chart}
              onChange={handleChartChange}
              className={classes.code_theme}
              disableUnderline={true}
            >
              {map(chartArr, (name, idx) => (
                <MenuItem value={name} key={idx}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <CompareArrowsIcon className={classes.component_icon} />
          </div>
        </div>
      )}
    </div>
  );
};

//Draggable elements
const SortableItem = sortableElement((props) => <ChartComponent {...props} />);

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
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SortableItem);
