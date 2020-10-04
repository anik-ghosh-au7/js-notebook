import React, { useState, useEffect, useCallback } from "react";
import httpRequest from "../../config/axios.config";

// styles
import useStyles from "./allNotebooks.style";

// components
import Copyright from "../../components/Copyright/Copyright";
import NotebookList from "../../components/Notebooks/NotebookList/NotebookList";

const AllNotebooks = () => {
  const classes = useStyles();

  // state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // handlers
  const fetchAllNotebooks = useCallback(async () => {
    try {
      let res = await httpRequest({
        method: "GET",
        url: "http://localhost:5000/api/protected/all",
      });
      console.log("response ====>>>", res.data);
      setData(res.data.data);
    } catch (err) {
      console.log("err in shared ==>", err.response);
    }
    setLoading(false);
  }, []);

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

export default AllNotebooks;
