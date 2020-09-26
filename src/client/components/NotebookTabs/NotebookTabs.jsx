import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { map } from "lodash";
import CloseIcon from "@material-ui/icons/Close";

// styles
import useStyles from "./notebook.styles";

// components
import NewNotebook from "../NewNotebook/NewNotebook";

const closeHandler = (id, idx) => {
  console.log(id, idx);
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      className={classes.container}
      {...other}
    >
      {value === index && (
        <Box component="div" m={2}>
          {children}
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
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

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
            return (
              <Tab
                label={
                  <div className={classes.tab_label}>
                    {notebook.title}
                    <CloseIcon
                      className={classes.icon}
                      onClick={() => closeHandler(notebook.id, idx)}
                    />
                  </div>
                }
                {...a11yProps(idx)}
                key={idx}
              />
            );
          })}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default connect()(NotebookTabs);
