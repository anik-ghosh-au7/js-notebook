import React, { Fragment, useCallback, useEffect, useState } from "react";
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
  const limit = 8;

  // state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [type, setType] = useState("");
  const [page, setPage] = useState({
    pageNumber: 1,
    nextPage: false,
    prevPage: false,
  });

  const { pageNumber } = page;

  // handlers
  const fetchSharedNotebooks = useCallback(async () => {
    try {
      let res = await httpRequest({
        method: "GET",
        url: `http://localhost:5000/api/protected/shared?page=${pageNumber}&limit=${limit}`,
      });

      const { notebooks, nextPage, prevPage } = res.data.data;
      setData(notebooks);
      setPage({ pageNumber, prevPage, nextPage });
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Internal Server Error",
      });
    }
    setLoading(false);
  }, [setNotification, pageNumber]);

  const fetchReceivedNotebooks = useCallback(async () => {
    try {
      let res = await httpRequest({
        method: "GET",
        url: `http://localhost:5000/api/protected/received?page=${pageNumber}&limit=${limit}`,
      });

      const { notebooks, nextPage, prevPage } = res.data.data;
      setData(notebooks);
      setPage({ pageNumber, prevPage, nextPage });
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Internal Server Error",
      });
    }
    setLoading(false);
  }, [pageNumber, setNotification]);

  useEffect(() => {
    if (type === "Shared Notebooks") fetchSharedNotebooks();
    if (type === "Received Notebooks") fetchReceivedNotebooks();
  }, [type, fetchReceivedNotebooks, fetchSharedNotebooks]);

  return (
    <Fragment>
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
            <Grid item xs={6} sm={6} md={3} className={classes.details}>
              <div
                className={classes.card}
                onClick={() => {
                  setClicked(true);
                  setType("Shared Notebooks");
                }}
              >
                <FolderSharedOutlinedIcon className={classes.component_icon} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {`Shared`}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={6} sm={6} md={3} className={classes.details}>
              <div
                className={classes.card}
                onClick={() => {
                  setClicked(true);
                  setType("Received Notebooks");
                }}
              >
                <FolderSpecialOutlinedIcon className={classes.component_icon} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {`Received`}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3}></Grid>
            <Grid item xs={6} sm={6} md={3}></Grid>
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
                  setPage({ pageNumber: 1, nextPage: false, prevPage: false });
                }}
              />
            </div>
            <div className={classes.list}>
              <NotebookList
                loading={loading}
                inputData={data}
                type={type}
                setLoading={setLoading}
                page={page}
                setPage={setPage}
              />
            </div>
          </Fragment>
        )}
      </div>
      <Copyright />
    </Fragment>
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
