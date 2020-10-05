import React, { useState, useEffect, useCallback } from "react";
import httpRequest from "../../config/axios.config";
import { connect } from "react-redux";

// styles
import useStyles from "./searched.style";

// reducer actions
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// components
import NotebookList from "../../components/Notebooks/NotebookList/NotebookList";

const SearchedNotebooks = ({ setNotification, history }) => {
  const classes = useStyles();
  const limit = 8;

  // state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    pageNumber: 1,
    nextPage: false,
    prevPage: false,
  });

  // handlers
  const fetchSearchedNotebooks = useCallback(async () => {
    try {
      let res = await httpRequest({
        method: "GET",
        url: `http://localhost:5000/api/public/search?query=${history.location.search.slice(
          1
        )}&page=${page.pageNumber}&limit=${limit}`,
      });
      setData(res.data.data.notebooks);
      if (page.nextPage !== res.data.data.nextPage)
        setPage({ ...page, nextPage: res.data.data.nextPage });
      if (page.prevPage !== res.data.data.prevPage)
        setPage({ ...page, prevPage: res.data.data.prevPage });
    } catch (err) {
      setNotification({
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Internal Server Error",
      });
    }
    setLoading(false);
  }, [setNotification, history.location.search, page]);

  useEffect(() => {
    fetchSearchedNotebooks();
  }, [fetchSearchedNotebooks]);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>
        Search results for {history.location.search.slice(1)}
      </h1>
      <div className={classes.list}>
        <NotebookList
          loading={loading}
          inputData={data}
          type="Searched Notebooks"
          page={page}
          setPage={setPage}
        />
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
