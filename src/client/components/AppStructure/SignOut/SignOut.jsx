import React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";

// component
import Body from "./Body";

// styles
import { getModalStyle, useStyles } from "./signout.style";

// reducer actions
import { signout } from "../../../redux/actions/sign.action";

const SignOutModal = ({ isSignOut, toggleSignOut }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Body toggleSignOut={toggleSignOut} />
    </div>
  );

  return (
    <div>
      <Modal open={isSignOut} onClose={toggleSignOut}>
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ signData }) => {
  return {
    isSignOut: signData.signout,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    toggleSignOut: () => {
      dispatch({
        type: signout,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SignOutModal);
