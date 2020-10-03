import React, { useEffect } from "react";
import { connect } from "react-redux";

// components
import NotebookTabs from "../../components/Notebooks/NotebookTabs/NotebookTabs";

//styles
import useStyles from "./create.style";

// reducer actions
import { SET_TAB } from "../../redux/actions/activetab.action";

const Create = ({ notebooks, clearId }) => {
  // hook for clearing id during unmount
  useEffect(() => {
    return () => {
      clearId();
    };
  }, [clearId]);

  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <NotebookTabs notebooks={notebooks} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notebooks: state.notebooks,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    clearId: () =>
      dispatch({
        type: SET_TAB,
        payload: -1,
      }),
  };
};

export default connect(mapStateToProps, mapActionToProps)(Create);
