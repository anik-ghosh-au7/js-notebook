import React, { Fragment } from "react";
import { connect } from "react-redux";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { sortableElement, sortableHandle } from "react-sortable-hoc";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import axios from "axios";

//styles
import useStyles from "../component.style";

// reducer actions
import { UPDATE_COMPONENTS } from "../../../redux/actions/notebooks.action";
import { SET_NOTIFICATION } from "../../../redux/actions/notification.action";

//components
import DropZone from "../../DropZone/DropZone";

// axios config
import createConfig from "../../AppStructure/Profile/form_axios.config";

const ImageComponent = ({
  component,
  idx,
  deleteHandler,
  notebookId,
  updateComponent,
  setNotification,
}) => {
  const classes = useStyles();

  // Dropzone state
  const [isOpen, setIsOpen] = React.useState(false);

  // image maximize state
  const [max, setMax] = React.useState(false);

  // edit handler
  const editHandler = () => {
    setIsOpen(true);
  };

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <ImageOutlinedIcon />
    </span>
  ));

  // axios request
  const axiosRequest = async (formData) => {
    try {
      let response = await axios.post(
        "http://localhost:5000/api/public/image",
        formData,
        createConfig()
      );

      if (!!response.data.data.url) {
        updateComponent(notebookId, idx, response.data.data.url);
      }

      // if all good
      setNotification({
        open: true,
        severity: "success",
        msg: "upload successful",
      });

      setIsOpen(false);
    } catch (error) {
      // if err
      setNotification({
        open: true,
        severity: "error",
        msg: error.response.data.msg
          ? error.response.data.msg
          : "Internal server error",
      });
    }
  };

  return (
    <div
      className={classes.component_wrapper}
      key={idx}
      onDoubleClick={() => editHandler()}
    >
      <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
      <div className={classes.component}>
        {!isOpen ? (
          <div className={classes.note_component}>
            {!!component.value ? (
              <Fragment>
                <img
                  src={component.value}
                  alt="image_component"
                  style={{
                    maxHeight: max ? "100%" : "250px",
                    maxWidth: "100%",
                    padding: "20px 0 10px 0",
                  }}
                />
              </Fragment>
            ) : (
              <span className={classes.default_text}>
                Double Click To Upload
              </span>
            )}
          </div>
        ) : (
          <DropZone
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            axiosRequest={axiosRequest}
          />
        )}
        <DeleteOutlineOutlinedIcon
          className={classes.delete_icon}
          onClick={() => deleteHandler(idx)}
        />
        {!!component.value && (
          <>
            {!max ? (
              <ExpandMoreIcon
                className={classes.expand_contract_icon}
                onClick={() => setMax(true)}
              />
            ) : (
              <ExpandLessIcon
                className={classes.expand_contract_icon}
                onClick={() => setMax(false)}
              />
            )}
          </>
        )}
        {!isOpen && (
          <EditOutlinedIcon
            className={classes.edit_icon}
            onClick={() => editHandler()}
          />
        )}
        <DragHandle />
      </div>
    </div>
  );
};

//Draggable elements
const SortableItem = sortableElement((props) => <ImageComponent {...props} />);

const mapStateToProps = (state) => {
  return {
    notebookId: state.activeTab,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    updateComponent: (id, componentIdx, value) => {
      dispatch({
        type: UPDATE_COMPONENTS,
        payload: { id, componentIdx, value },
      });
    },
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(SortableItem);
