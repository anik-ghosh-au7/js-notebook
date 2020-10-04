import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import { Card, CardContent, Typography } from "@material-ui/core";

// styles
import useStyles from "./notebooklist.style";

const NotebookList = (props) => {
  const classes = useStyles();
  const { loading = true, inputData } = props;

  let data = [1, 2, 3];

  return (
    <Grid container className={classes.notebook}>
      {loading
        ? data.map((_, index) => (
            <Box
              key={index}
              width={250}
              marginRight={2}
              my={5}
              className={classes.list_container}
            >
              <Skeleton variant="rect" width={250} height={80} />
              <Box pt={0.5}>
                <Skeleton height={50} />
                <Skeleton width="60%" height={50} />
              </Box>
            </Box>
          ))
        : inputData.map((item, index) => (
            <Box
              key={index}
              width={250}
              marginRight={2}
              my={5}
              className={classes.list_container}
            >
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h4" color="textSecondary">
                    {item.title}
                  </Typography>
                  <Box pt={0.5}>
                    <Typography className={classes.pos} color="textSecondary">
                      by : {item.author}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Created On : {item.createdOn}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
    </Grid>
  );
};

export default NotebookList;
