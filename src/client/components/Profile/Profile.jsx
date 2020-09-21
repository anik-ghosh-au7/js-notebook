import React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";

// component
import Body from "./Body";

// styles
import { getModalStyle, useStyles } from "./profile.style";

// reducer actions
import { profile } from "../../redux/actions/sign.action";

const ProfileModal = ({ isProfile, toggleProfile }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Body toggleProfile={toggleProfile} />
    </div>
  );

  return (
    <div>
      <Modal open={isProfile} onClose={toggleProfile}>
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ signData }) => {
  return {
    isProfile: signData.profile,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    toggleProfile: () => {
      dispatch({
        type: profile,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(ProfileModal);
