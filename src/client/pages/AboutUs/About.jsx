import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import FolderSharedTwoToneIcon from "@material-ui/icons/FolderSharedTwoTone";
import { isEqual } from "lodash";

// import style
import useStyles from "./about.style";
import { Grid } from "@material-ui/core";

// components
import Copyright from "../../components/Copyright/Copyright";

const AboutUs = () => {
  const classes = useStyles();

  const [data, setData] = useState({});

  useEffect(() => {
    // axios call to BE to fetch data should be done here

    if (!isEqual(data, { users: 500, notebooks: 1200, shares: 700 }))
      setData({ ...data, users: 500, notebooks: 1200, shares: 700 });
  }, [data]);

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} className={classes.heading}>
        <Typography variant="h1" color="primary">
          Welcome
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" color="primary" align="center">
          We believe knowledge is meant to be shared. Alone we can do so little
          but together we can do so much. JS-NoteBook is a web application that
          you can use to create and share documents that contain live javascript
          code, equations, visualizations, text, and images. You can also
          download your notebook at a stroke.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={6} md={3} className={classes.details}>
          <Card className={classes.card}>
            <PeopleAltTwoToneIcon style={{ fontSize: 100 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {`${data.users}+ active users`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} className={classes.details}>
          <Card className={classes.card}>
            <FileCopyTwoToneIcon style={{ fontSize: 100 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {`${data.notebooks}+ notebooks created`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} className={classes.details}>
          <Card className={classes.card}>
            <FolderSharedTwoToneIcon style={{ fontSize: 100 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {`${data.shares}+ notebooks shared`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Copyright />
    </Grid>
  );
};

export default AboutUs;
