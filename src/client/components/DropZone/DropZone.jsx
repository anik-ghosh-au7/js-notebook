import React from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import axios from "axios";

// importing axios config to send form data
import createConfig from "../Profile/form_axios.config";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";
import { connect } from "react-redux";

const DropZone = ({ isOpen, setIsOpen, data, setData, setNotification }) => {
  const onSave = async (files) => {
    try {
      const file = files[0];
      console.log(file);
      // upload image to server and save url into data object from response

      let form_data = new FormData();
      form_data.append("file", file);

      let response = await axios.post(
        "http://localhost:5000/api/protected/profile",
        form_data,
        createConfig()
      );

      console.log("response ===>>>> ", response);
      setData({ ...data, Image: response.data.data.img });

      // if all good
      setNotification({
        open: true,
        severity: "success",
        msg: response.data.msg,
      });

      setIsOpen(false);
    } catch (err) {
      // if err
      setNotification({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
    }
  };
  return (
    <DropzoneDialog
      acceptedFiles={["image/*"]}
      filesLimit={1}
      cancelButtonText={"cancel"}
      submitButtonText={"submit"}
      maxFileSize={5000000}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={onSave}
      showPreviews={true}
      showFileNamesInPreview={true}
      canRestart={false}
    />
  );
};

const mapActionToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(null, mapActionToProps)(DropZone);
