import React, { useState, useEffect, useCallback } from "react";
import httpRequest from "../../config/axios.config";
import { connect } from "react-redux";

// styles
import useStyles from "./searched.style";

// reducer actions
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// components
import Copyright from "../../components/Copyright/Copyright";
import NotebookList from "../../components/Notebooks/NotebookList/NotebookList";

const SearchedNotebooks = ({ setNotification, history }) => {
  const classes = useStyles();

  // state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("pathname =====>", history.location.search);

  // handlers
  const fetchSearchedNotebooks = useCallback(async () => {
    try {
      let res = await httpRequest({
        method: "GET",
        url: `http://localhost:5000/api/public/search?query=${history.location.search.slice(
          1
        )}`,
      });
      setData(res.data.data);
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Internal Server Error",
      });
    }
    setLoading(false);
  }, [setNotification, history.location.search]);

  useEffect(() => {
    fetchSearchedNotebooks();
  }, [fetchSearchedNotebooks]);

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

export default connect(null, mapActionToProps)(SearchedNotebooks);
