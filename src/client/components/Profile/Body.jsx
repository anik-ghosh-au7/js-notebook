import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { connect } from "react-redux";

// components
import List from "./List";

// styles
import useStyles from "./body.style";

const Body = ({ userImg }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Card className={classes.card_root}>
            <CardMedia title="Profile Image">
              <img
                src={userImg || "default_image.png"}
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

const mapStateToProps = (state) => {
  return {
    userImg: state.userData.img,
  };
};

export default connect(mapStateToProps)(Body);
