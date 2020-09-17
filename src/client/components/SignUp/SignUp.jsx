import React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";

// styles
import { getModalStyle, useStyles } from "./signUp.style";

// reducer actions
import { signup } from "../../redux/actions/sign.action";

// components
import Body from "./Body";

const SignUpModal = ({ isSignUp, toggleSignUp }) => {
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
      <Modal open={isSignUp} onClose={toggleSignUp}>
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ signData }) => {
  return {
    isSignUp: signData.signup,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    toggleSignUp: () => {
      dispatch({
        type: signup,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SignUpModal);
