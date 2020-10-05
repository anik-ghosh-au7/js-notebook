import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import { Card, CardContent, Typography, Button, Grid } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

// reducer action
import { ADD_NOTEBOOK } from "../../../redux/actions/notebooks.action";

// styles
import useStyles from "./notebooklist.style";

// components
import Copyright from "../../Copyright/Copyright";

const NotebookList = (props) => {
  const classes = useStyles();
  const {
    loading = true,
    inputData,
    addNotebook,
    history,
    type,
    page,
    setPage,
  } = props;

  let data = [1, 2, 3];

  const onClickHandler = (e) => {
    let { id } = e.currentTarget;
    let notebook = {
      ...inputData[id],
      components: JSON.parse(inputData[id].components),
      canEdit: type !== "Received Notebooks",
      isSearched: type === "Searched Notebooks",
    };
    addNotebook(notebook);

    // changing route
    history.push("/create");
  };

  return (
    <Fragment>
      <Grid container className={classes.notebook}>
        {loading ? (
          data.map((_, index) => (
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
        ) : (
          <Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                minHeight: "58vh",
                minWidth: "70vw",
                flexWrap: "wrap",
              }}
            >
              {inputData.map((item, index) => (
                <Box
                  key={index}
                  width={280}
                  height={200}
                  id={index}
                  marginRight={2}
                  my={5}
                  className={classes.list_container}
                  onClick={onClickHandler}
                >
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="textSecondary">
                        {item.title}
                      </Typography>
                      <Box pt={0.5}>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
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
            </div>
            <Grid
              container
              style={{ marginTop: "40px" }}
              // className={classes.buttons}
            >
              <Grid item xs>
                <Button
                  type="button"
                  width="50%"
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  style={{
                    float: "left",
                    marginLeft: "5%",
                    paddingRight: "15px",
                  }}
                  disabled={!page.prevPage}
                  onClick={() =>
                    setPage({ ...page, pageNumber: page.pageNumber - 1 })
                  }
                >
                  <ArrowLeftIcon
                    style={{ marginRight: "10px" }}
                    className={classes.page_icons}
                  />{" "}
                  <Typography color="textSecondary">Prev Page</Typography>
                </Button>
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <Button
                  type="button"
                  width="50%"
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  style={{
                    float: "right",
                    marginRight: "15%",
                    paddingLeft: "15px",
                  }}
                  disabled={!page.nextPage}
                  onClick={() =>
                    setPage({ ...page, pageNumber: page.pageNumber + 1 })
                  }
                >
                  <Typography color="textSecondary">Next Page</Typography>{" "}
                  <ArrowRightIcon
                    style={{ marginLeft: "10px" }}
                    className={classes.page_icons}
                  />
                </Button>
              </Grid>
            </Grid>
          </Fragment>
        )}
      </Grid>
      <Copyright className={classes.copyright} />
    </Fragment>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    addNotebook: (data) => {
      dispatch({
        type: ADD_NOTEBOOK,
        payload: data,
      });
    },
  };
};

export default connect(null, mapActionToProps)(withRouter(NotebookList));
