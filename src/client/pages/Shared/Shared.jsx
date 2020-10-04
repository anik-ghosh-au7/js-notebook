import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import FolderSharedOutlinedIcon from "@material-ui/icons/FolderSharedOutlined";
import FolderSpecialOutlinedIcon from "@material-ui/icons/FolderSpecialOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { fade, Grid, useTheme } from "@material-ui/core";
import httpRequest from "../../config/axios.config";

// styles
import useStyles from "./shared.style";

// components
import Copyright from "../../components/Copyright/Copyright";
import NotebookList from "../../components/Notebooks/NotebookList/NotebookList";

const Folders = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  const fetchSharedNotebooks = async () => {
    setClicked(true);
    try {
      let res = await httpRequest({
        method: "GET",
        url: "http://localhost:5000/api/protected/shared",
      });
      console.log("response ====>>>", res.data);
      setData(res.data.data);
    } catch (err) {
      console.log("err in shared ==>", err.response);
    }
    setLoading(false);
  };

  const fetchReceivedNotebooks = async () => {
    try {
      let res = await httpRequest({
        method: "GET",
        url: "http://localhost:5000/api/protected/received",
      });
      console.log("response in shared ==>", res.data);
    } catch (err) {
      console.log("err in shared ==>", err.response);
    }
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
              <Typography variant="h6" gutterBottom>
                {`Notebooks shared`}
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3} className={classes.details}>
            <div className={classes.card} onClick={fetchReceivedNotebooks}>
              <FolderSpecialOutlinedIcon className={classes.component_icon} />
              <Typography variant="h6" gutterBottom>
                {`Notebooks received`}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
        </Grid>
      )}
      {clicked && (
        <Fragment>
          <div className={classes.icon}>
            <ArrowBackIcon
              style={{
                fontSize: 40,
                color: fade(theme.palette.common.black, 0.5),
              }}
              onClick={() => setClicked(false)}
            />
          </div>
          <div className={classes.list}>
            <NotebookList loading={loading} inputData={data} />
          </div>
        </Fragment>
      )}
      <div className={classes.stickToBottom}>
        <Copyright />
      </div>
    </div>
  );
};

export default Folders;
