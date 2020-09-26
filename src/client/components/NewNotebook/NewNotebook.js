import React from "react";

const NewNotebook = ({ title, author, component, id }) => {
  return (
    <h1>
      {title} by : {author}
    </h1>
  );
};

export default NewNotebook;
