import React from "react";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { map } from "lodash";

// components
import NewNotebook from "../NewNotebook/NewNotebook";

const useStyles = makeStyles((theme) => ({
  stickToBottom: {
    position: "fixed",
    paddingLeft: "4%",
    top: "94vh",
    backgroundColor: fade(theme.palette.common.black, 0.005),
  },
}));
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      style={{ width: "300px" }}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `scrollable-force-tab-${index}`,
  };
};

const NotebookTabs = ({ notebooks }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <CssBaseline />
      {map(notebooks, (notebook, idx) => {
        return (
          <TabPanel value={value} index={idx} key={notebook.id}>
            <NewNotebook {...notebook} />
          </TabPanel>
        );
      })}

      <AppBar
        position="sticky"
        color="default"
        className={classes.stickToBottom}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {map(notebooks, (notebook, idx) => {
            return <Tab label={notebook.title} {...a11yProps(idx)} />;
          })}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default connect()(NotebookTabs);
