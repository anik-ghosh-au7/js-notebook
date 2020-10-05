import React, { useState, useEffect, useCallback } from "react";
import httpRequest from "../../config/axios.config";
import { connect } from "react-redux";

// styles
import useStyles from "./allNotebooks.style";

// reducer actions
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// components
import Copyright from "../../components/Copyright/Copyright";
import NotebookList from "../../components/Notebooks/NotebookList/NotebookList";

const AllNotebooks = ({ setNotification }) => {
  const classes = useStyles();

  // state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // handlers
  const fetchAllNotebooks = useCallback(async () => {
    try {
      let res = await httpRequest({
        method: "GET",
        url: "http://localhost:5000/api/protected/all?page=1&limit=8",
      });
      setData(res.data.data.notebooks);
    } catch (err) {
      console.log("err in shared ==>", err.response);
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Internal Server Error",
      });
    }
    setLoading(false);
  }, [setNotification]);

  useEffect(() => {
    fetchAllNotebooks();
  }, [fetchAllNotebooks]);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>All Notebooks</h1>
      <div className={classes.list}>
        <NotebookList loading={loading} inputData={data} />
      </div>
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

export default connect(null, mapActionToProps)(AllNotebooks);
