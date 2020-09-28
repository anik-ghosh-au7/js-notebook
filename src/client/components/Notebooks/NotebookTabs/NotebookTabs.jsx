import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { map } from "lodash";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

// styles
import useStyles from "./notebook.styles";

// components
import NewNotebook from "../NewNotebook/NewNotebook";

// reducer action
import { SET_TAB } from "../../../redux/actions/activetab.action";

const closeHandler = (id, idx) => {
  console.log(id, idx);
};

const TabPanel = (props) => {
  const { children, value, index, isDrawerOpen, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      className={clsx(classes.container, {
        [classes.containerShrink]: isDrawerOpen,
      })}
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

const NotebookTabs = ({ notebooks, isDrawerOpen, setActiveTab }) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const firstTabId = notebooks[0].id;

  // component did mount
  React.useEffect(() => {
    setActiveTab(firstTabId);
  }, [firstTabId, setActiveTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabHandler = (id) => {
    setActiveTab(id);
  };

  return (
    <div>
      <CssBaseline />
      {map(notebooks, (notebook, idx) => {
        return (
          <TabPanel
            value={value}
            index={idx}
            key={notebook.id}
            isDrawerOpen={isDrawerOpen}
          >
            <NewNotebook {...notebook} />
          </TabPanel>
        );
      })}

      <AppBar
        position="sticky"
        color="default"
        className={clsx(classes.stickToBottom, {
          [classes.tabBarShift]: isDrawerOpen,
        })}
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
                onClick={() => tabHandler(notebook.id)}
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

const mapStateToProps = (state) => {
  return {
    isDrawerOpen: state.tab,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    setActiveTab: (id) => {
      dispatch({
        type: SET_TAB,
        payload: id,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(NotebookTabs);
