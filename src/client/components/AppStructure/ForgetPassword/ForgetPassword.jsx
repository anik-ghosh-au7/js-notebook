import React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";

// component
import Body from "./Body";

// styles
import { getModalStyle, useStyles } from "./forgetPassword.style";

// reducer actions
import { forget } from "../../../redux/actions/sign.action";

const SignInModal = ({ isForget, toggleForget }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Body />
    </div>
  );

  return (
    <div>
      <Modal open={isForget} onClose={toggleForget}>
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ signData }) => {
  return {
    isForget: signData.forget,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    toggleForget: () => {
      dispatch({
        type: forget,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SignInModal);
