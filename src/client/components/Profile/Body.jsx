import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import List from "./List";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card_root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  profile_img: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
}));

const Body = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Card className={classes.card_root}>
            <CardMedia title="Profile Image">
              <img
                src="default_image.png"
                className={classes.profile_img}
                alt="profile"
              />
            </CardMedia>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <List />
        </Grid>
      </Grid>
    </div>
  );
};

export default Body;
