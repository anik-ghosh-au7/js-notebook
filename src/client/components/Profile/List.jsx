import React, { useState } from "react";
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
import { connect } from "react-redux";

// styles
import useStyles from "./list.style";
import { Button, TextField } from "@material-ui/core";

const getFieldIcon = (name) => {
  if (name === "Name") return <ShortTextTwoToneIcon />;
  if (name === "Email") return <EmailTwoToneIcon />;
  if (name === "Github") return <GitHubIcon />;
  return <FolderIcon />;
};

const DataList = ({ userData }) => {
  const classes = useStyles();

  // to change feild type from text to input and vice-versa
  const [feildType, setFeildType] = useState({ name: "" });

  // initial data
  const init_data = {
    Name: `${userData.firstName} ${
      !!userData.lastName ? userData.lastName : ""
    }`,
    Email: !!userData.email ? userData.email : null,
    Github: !!userData.githubUrl ? userData.githubUrl : null,
  };

  // feild value
  const [data, setData] = useState(init_data);

  const onEditHandler = (e) => {
    setFeildType({ name: e.currentTarget.value });
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.currentTarget.id]: e.currentTarget.value });
  };

  const discardHandler = () => {
    setFeildType({ name: "" });
    setData(init_data);
  };

  // function to generate profile feilds dynamically
  const generate = () => {
    return map(Object.keys(data), (name, idx) => {
      if (!!data[name]) {
        return (
          <ListItem key={idx}>
            <ListItemAvatar>
              <Avatar>{getFieldIcon(name)}</Avatar>
            </ListItemAvatar>
            {feildType.name === name ? (
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
                aria-label="delete"
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
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" className={classes.title}>
              Profile Details
            </Typography>
            <div className={classes.demo}>
              <List>{generate()}</List>
            </div>
          </Grid>
          {feildType.name && (
            <>
              <Grid item xs>
                <Button
                  type="button"
                  width="50%"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ float: "left", marginTop: "10px" }}
                  // onClick={onClickHandler}
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
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps)(DataList);
