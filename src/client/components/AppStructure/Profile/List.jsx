import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import ShortTextTwoToneIcon from "@material-ui/icons/ShortTextTwoTone";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { map } from "lodash";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";

// importing axios config to send form data
import createConfig from "./form_axios.config";

// styles
import useStyles from "./list.style";

// config
import homeUrl from "../../../config/url";

import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

const getFieldIcon = (name) => {
  if (name === "Name") return <ShortTextTwoToneIcon />;
  if (name === "Email") return <EmailTwoToneIcon />;
  if (name === "Github") return <GitHubIcon />;
  return <FolderIcon />;
};

const DataList = ({
  data,
  setData,
  init_data,
  fieldType,
  setFieldType,
  setNotification,
}) => {
  const classes = useStyles();

  const onEditHandler = (e) => {
    setFieldType({ name: e.currentTarget.value });
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.currentTarget.id]: e.currentTarget.value });
  };

  const saveHandler = async () => {
    try {
      let form_data = new FormData();

      Object.keys(data).forEach((key) => {
        form_data.append(key, data[key]);
      });

      let response = await axios.post(
        `${homeUrl}api/protected/profile`,
        form_data,
        createConfig()
      );

      // setting state variables based on response
      setFieldType({ name: "" });

      const responseData = {
        Name: `${response.data.data.firstName} ${
          !!response.data.data.lastName ? response.data.data.lastName : ""
        }`,
        Email: !!response.data.data.email ? response.data.data.email : "",
        Github: !!response.data.data.github ? response.data.data.github : "",
        Image: !!response.data.data.img ? response.data.data.img : null,
      };

      setData({ ...responseData });

      // if all good
      setNotification({
        open: true,
        severity: "success",
        msg: response.data.msg,
      });
    } catch (err) {
      // if err
      setNotification({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
    }
  };

  const discardHandler = () => {
    setFieldType({ name: "" });
    setData(init_data);
  };

  // function to generate profile fields dynamically
  const generate = () => {
    return map(Object.keys(data), (name, idx) => {
      if (name !== "Image") {
        return (
          <ListItem key={idx}>
            <ListItemAvatar>
              <Avatar>{getFieldIcon(name)}</Avatar>
            </ListItemAvatar>
            {fieldType.name === name ? (
              <TextField
                id={name}
                value={data[name]}
                label={
                  <Typography variant="h6" style={{ color: "secondary" }}>
                    {name}
                  </Typography>
                }
                onChange={onChangeHandler}
              />
            ) : (
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ color: "#ff6f00" }}>
                    {name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    style={{ wordWrap: "break-word" }}
                  >
                    {data[name]}
                  </Typography>
                }
              />
            )}
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                value={name}
                onClick={onEditHandler}
              >
                <EditTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      }
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" className={classes.title}>
            Profile Details
          </Typography>
          <div className={classes.demo}>
            <List>{generate()}</List>
          </div>
        </Grid>
        {fieldType.name && (
          <>
            <Grid item xs>
              <Button
                type="button"
                width="50%"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ float: "left", marginTop: "10px" }}
                onClick={saveHandler}
              >
                <CheckCircleIcon style={{ marginRight: "10px" }} /> Save
              </Button>
            </Grid>

            <Grid item xs>
              <Button
                type="button"
                width="50%"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ float: "right", marginTop: "10px" }}
                onClick={discardHandler}
              >
                <CancelIcon style={{ marginRight: "10px" }} /> Discard
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(null, mapActionToProps)(DataList);
