import React from "react";
import { DropzoneDialog } from "material-ui-dropzone";

const DropZone = ({ isOpen, setIsOpen, axiosRequest }) => {
  const onSave = async (files) => {
    const file = files[0];

    let form_data = new FormData();
    form_data.append("file", file);
    axiosRequest(form_data);
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

export default DropZone;
