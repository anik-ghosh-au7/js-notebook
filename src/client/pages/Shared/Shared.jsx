import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import FolderSharedOutlinedIcon from "@material-ui/icons/FolderSharedOutlined";
import FolderSpecialOutlinedIcon from "@material-ui/icons/FolderSpecialOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { fade, Grid, useTheme } from "@material-ui/core";
import httpRequest from "../../config/axios.config";
import { connect } from "react-redux";

// styles
import useStyles from "./shared.style";

// reducer actions
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// components
import Copyright from "../../components/Copyright/Copyright";
import NotebookList from "../../components/Notebooks/NotebookList/NotebookList";

const SharedNotebooks = ({ setNotification }) => {
  const classes = useStyles();
  const theme = useTheme();

  // state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [type, setType] = useState("");

  // handlers
  const fetchSharedNotebooks = async () => {
    setClicked(true);
    try {
      let res = await httpRequest({
        method: "GET",
        url: "http://localhost:5000/api/protected/shared?limit=8&page=1",
      });
      console.log("response ====>>>", res.data);
      setType("Shared Notebooks");
      setData(res.data.data);
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Internal Server Error",
      });
    }
    setLoading(false);
  };

  const fetchReceivedNotebooks = async () => {
    setClicked(true);
    try {
      let res = await httpRequest({
        method: "GET",
        url: "http://localhost:5000/api/protected/received?limit=8&page=1",
      });
      setType("Received Notebooks");
      setData(res.data.data);
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Internal Server Error",
      });
    }
    setLoading(false);
  };

  return (
    <div className={classes.wrapper}>
      {!clicked && (
        <Grid
          item
          xs={12}
          container
          spacing={5}
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={6} md={3} className={classes.details}>
            <div className={classes.card} onClick={fetchSharedNotebooks}>
              <FolderSharedOutlinedIcon className={classes.component_icon} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {`Shared`}
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3} className={classes.details}>
            <div className={classes.card} onClick={fetchReceivedNotebooks}>
              <FolderSpecialOutlinedIcon className={classes.component_icon} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {`Received`}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
        </Grid>
      )}
      {clicked && (
        <Fragment>
          <h1 className={classes.heading}>{type}</h1>
          <div className={classes.icon}>
            <ArrowBackIcon
              style={{
                fontSize: 40,
                color: fade(theme.palette.common.black, 0.5),
              }}
              onClick={() => {
                setLoading(true);
                setClicked(false);
              }}
            />
          </div>
          <div className={classes.list}>
            <NotebookList
              loading={loading}
              inputData={data}
              type={type}
              setLoading={setLoading}
            />
          </div>
        </Fragment>
      )}
      <div className={classes.stickToBottom}>
        <Copyright />
      </div>
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (payload) =>
      dispatch({
        type: SET_NOTIFICATION,
        payload,
      }),
  };
};

export default connect(null, mapActionToProps)(SharedNotebooks);
