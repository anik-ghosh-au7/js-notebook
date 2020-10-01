import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { map } from "lodash";

//styles
import useStyles from "../component.style";

// components
import ScrollDown from "../../../components/ScrollDown/ScrollDown";

const ChartInput = ({ data, setData, setNotification }) => {
  const classes = useStyles();

  // adding field
  const addFieldHandler = () => {
    if (data.labels.length < 10) {
      setData({
        ...data,
        labels: [...data.labels, ""],
        values: [...data.values, 0],
      });
    } else {
      setNotification({
        open: true,
        severity: "warning",
        msg: "You can only add 10 fields",
      });
    }
  };

  // delete field
  const deleteFieldHandler = (idx) => {
    let newLabels = data.labels.slice();
    let newValues = data.values.slice();

    newLabels.splice(idx, 1);
    newValues.splice(idx, 1);

    setData({
      ...data,
      labels: [...newLabels],
      values: [...newValues],
    });
  };

  // title handler
  const onChangeTitleHandler = (e) => {
    setData({
      ...data,
      title: e.currentTarget.value,
    });
  };

  // labels handler
  const onChangeLabelHandler = (e, idx) => {
    let newLabels = data.labels.slice();
    newLabels[idx] = e.currentTarget.value;
    setData({
      ...data,
      labels: newLabels,
    });
  };

  // value handler
  const onChangeValueHandler = (e, idx) => {
    let newValues = data.values.slice();
    newValues[idx] = e.currentTarget.value;
    setData({
      ...data,
      values: newValues,
    });
  };

  // description handler
  const onChangeDescriptionHandler = (e) => {
    setData({
      ...data,
      description: e.currentTarget.value,
    });
  };

  return (
    <Fragment>
      <div className={classes.chart_header}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              size="small"
              fullWidth
              value={data.title}
              style={{ marginBottom: "20px" }}
              onChange={onChangeTitleHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              size="small"
              fullWidth
              value={data.description}
              style={{ marginBottom: "20px" }}
              onChange={onChangeDescriptionHandler}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.chart_component}>
        {map(data.labels, (ele, idx) => {
          return (
            <div className={classes.chart_feild_wrapper} key={idx}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    name="label"
                    variant="outlined"
                    label="Label"
                    size="small"
                    value={ele}
                    onChange={(e) => onChangeLabelHandler(e, idx)}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        variant="outlined"
                        label="Value"
                        name="data"
                        size="small"
                        value={data.values[idx]}
                        onChange={(e) => onChangeValueHandler(e, idx)}
                      />
                    </Grid>
                    <div className={classes.chart_feild_icon}>
                      {idx === data.labels.length - 1 && (
                        <Grid item xs={12} sm={3} key={`add-${idx}`}>
                          <AddCircleOutlineOutlinedIcon
                            onClick={addFieldHandler}
                            className={classes.chart_icons}
                          />
                        </Grid>
                      )}
                      {idx < data.labels.length - 1 && (
                        <Grid item xs={12} sm={3} key={`delete-${idx}`}>
                          <CancelOutlinedIcon
                            onClick={() => deleteFieldHandler(idx)}
                            className={classes.chart_icons}
                          />
                        </Grid>
                      )}
                    </div>
                    <div className={classes.chart_feild_index}>{`${
                      idx + 1
                    }.`}</div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
        })}
        <ScrollDown components={data.labels} />
      </div>
    </Fragment>
  );
};

export default ChartInput;
