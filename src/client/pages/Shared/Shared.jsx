import React from "react";
import Typography from "@material-ui/core/Typography";
import FolderSharedOutlinedIcon from "@material-ui/icons/FolderSharedOutlined";
import FolderSpecialOutlinedIcon from "@material-ui/icons/FolderSpecialOutlined";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./shared.style";

// components
import Copyright from "../../components/Copyright/Copyright";

const Folders = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
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
          <div className={classes.card}>
            <FolderSharedOutlinedIcon className={classes.component_icon} />
            <Typography variant="h6" gutterBottom>
              {`Notebooks shared`}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3} className={classes.details}>
          <div className={classes.card}>
            <FolderSpecialOutlinedIcon className={classes.component_icon} />
            <Typography variant="h6" gutterBottom>
              {`Notebooks received`}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}></Grid>
        <Grid item xs={12} sm={6} md={3}></Grid>
      </Grid>
      <div className={classes.stickToBottom}>
        <Copyright />
      </div>
    </div>
  );
};

export default Folders;
