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
import DeleteIcon from "@material-ui/icons/Delete";

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

let data = [
  { name: "Name", value: "Anik Ghosh" },
  { name: "Email", value: "anik@gmail.com" },
  { name: "Github", value: "anik-ghosh-au7" },
];

function generate() {
  return data.map((value, idx) => (
    <ListItem key={idx}>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6" style={{ color: "#ff6f00" }}>
            {value.name}
          </Typography>
        }
        secondary={value.value}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
}

export default function InteractiveList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            Profile Details
          </Typography>
          <div className={classes.demo}>
            <List>{generate()}</List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
