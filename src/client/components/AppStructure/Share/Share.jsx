import React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";

// component
import Body from "./Body";

// styles
import { getModalStyle, useStyles } from "./share.style";

// reducer actions
import { share } from "../../../redux/actions/sign.action";

const SignInModal = ({ isShare, toggleShare }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Body toggleShare={toggleShare} />
    </div>
  );

  return (
    <div>
      <Modal open={isShare} onClose={toggleShare}>
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ signData }) => {
  return {
    isShare: signData.share,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    toggleShare: () => {
      dispatch({
        type: share,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SignInModal);
