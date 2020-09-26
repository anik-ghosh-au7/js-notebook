import React, { Fragment } from "react";
import { map } from "lodash";
import { connect } from "react-redux";

// components
import NewNotebook from "../../components/NewNotebook/NewNotebook";

const Create = ({ notebooks }) => {
  return (
    <Fragment>
      {map(notebooks, (Notebook) => {
        return <NewNotebook key={Notebook.id} />;
      })}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notebooks: state.notebooks,
  };
};

export default connect(mapStateToProps)(Create);
