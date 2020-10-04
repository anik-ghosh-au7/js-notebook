import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

const NotebookList = (props) => {
  const { loading = true, inputData } = props;

  let data = [1, 2, 3];

  return (
    <Grid container wrap="nowrap">
      {loading
        ? data.map((item, index) => (
            <Box key={index} width={250} marginRight={2} my={5}>
              <Skeleton variant="rect" width={250} height={80} />
              <Box pt={0.5}>
                <Skeleton height={50} />
                <Skeleton width="60%" height={50} />
              </Box>
            </Box>
          ))
        : inputData.map((item, index) => (
            <Box key={index} width={250} marginRight={2} my={5}>
              {/* <Skeleton variant="rect" width={250} height={80} /> */}
              <h1>{item.title}</h1>
              <Box pt={0.5}>
                {/* <Skeleton height={50} /> */}
                <h3>{item.author}</h3>
                {/* <Skeleton width="60%" height={50} /> */}
                <h3>{item.createdOn}</h3>
              </Box>
            </Box>
          ))}
    </Grid>
  );
};

export default NotebookList;
