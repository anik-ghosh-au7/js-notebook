import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { map } from "lodash";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    textAlign: "center",
  },
}));

const getFieldIcon = (name) => {
  if (name === "Name") return <ShortTextTwoToneIcon />;
  if (name === "Email") return <EmailTwoToneIcon />;
  if (name === "Github") return <GitHubIcon />;
  return <FolderIcon />;
};

const generate = (data) => {
  return map(data, (value, idx) => {
    if (!!value.value) {
      return (
        <ListItem key={idx}>
          <ListItemAvatar>
            <Avatar>{getFieldIcon(value.name)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="h6" style={{ color: "#ff6f00" }}>
                {value.name}
              </Typography>
            }
            secondary={
              <Typography variant="body2" style={{ wordWrap: "break-word" }}>
                {value.value}
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <EditTwoToneIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    }
  });
};

const DataList = ({ userData }) => {
  const classes = useStyles();

  let data = [
    {
      name: "Name",
      value: `${userData.firstName} ${
        !!userData.lastName ? userData.lastName : ""
      }`,
    },
    { name: "Email", value: !!userData.email ? userData.email : null },
    {
      name: "Github",
      value: !!userData.githubUrl ? userData.githubUrl : null,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" className={classes.title}>
            Profile Details
          </Typography>
          <div className={classes.demo}>
            <List>{generate(data)}</List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps)(DataList);
