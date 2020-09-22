import React from "react";
import Modal from "@material-ui/core/Modal";

// styles
import { getModalStyle, useStyles } from "./fileInput.style";

const FileInputModal = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h1>Take a File</h1>
    </div>
  );

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {body}
      </Modal>
    </div>
  );
};

export default FileInputModal;
