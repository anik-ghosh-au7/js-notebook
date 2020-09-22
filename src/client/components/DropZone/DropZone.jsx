import React from "react";
import { DropzoneDialog } from "material-ui-dropzone";

const DropZone = ({ isOpen, setIsOpen, data, setData }) => {
  const onSave = (files) => {
    const file = files[0];
    console.log(file);
    // upload image to server and save url into data object from response
    // setData({ ...data, Image: file });
    setIsOpen(false);
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
    />
  );
};

export default DropZone;
