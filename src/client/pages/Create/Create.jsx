import React from "react";
import { connect } from "react-redux";

// components
import NotebookTabs from "../../components/NotebookTabs/NotebookTabs";

//styles
import useStyles from "./create.style";

const Create = ({ notebooks }) => {
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

export default connect(mapStateToProps)(Create);
