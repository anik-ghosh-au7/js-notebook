import React, { Fragment } from "react";
import { map } from "lodash";

const ResultComponent = ({ result }) => {
  return (
    <Fragment>
      {map(result, (elem, idx) => (
        <h6 key={idx}>{elem}</h6>
      ))}
    </Fragment>
  );
};

export default ResultComponent;
