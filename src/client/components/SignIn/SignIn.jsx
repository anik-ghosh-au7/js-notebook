import React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";

// component
import Body from "./Body";

// styles
import { getModalStyle, useStyles } from "./signIn.style";

// reducer actions
import { signin } from "../../redux/actions/sign.action";

const SignInModal = ({ isSignIn, toggleSignIn }) => {
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
      <Modal open={isSignIn} onClose={toggleSignIn}>
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ signData }) => {
  return {
    isSignIn: signData.signin,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    toggleSignIn: () => {
      dispatch({
        type: signin,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SignInModal);
