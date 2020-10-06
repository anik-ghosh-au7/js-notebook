import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

//styles
import useStyles from "../component.style";

// reducer action
import { UPDATE_COMPONENTS } from "../../../redux/actions/notebooks.action";

const LinkComponent = ({
  component,
  idx,
  deleteHandler,
  updateComponent,
  notebookId,
  canEdit,
}) => {
  const classes = useStyles();

  // default data arr
  let dataArr = [];

  // edit state
  const [isEdit, setIsEdit] = React.useState(false);

  // note data state
  const [data, setData] = React.useState("");

  // error state
  const [isError, setIsError] = React.useState(false);

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <LinkRoundedIcon />
    </span>
  ));

  // edit handler
  const editHandler = () => {
    if (canEdit) setIsEdit(true);
  };

  const onChangeHandler = (e) => {
    setData(e.currentTarget.value);
  };

  // custom link validation
  const checkLink = (data) => {
    data = data.trim();
    dataArr = data.split(/\[(.*?)\]\((.*?)\)/g);

    if (
      dataArr.length !== 4 ||
      (dataArr[0].length !== 0 && dataArr[3].length !== 0)
    )
      return true;

    return false;
  };

  // save handler
  const saveHandler = (idx) => {
    let err = checkLink(data);
    if (!err) {
      setIsEdit(false);
      updateComponent(notebookId, idx, {
        linkName: dataArr[1],
        link: dataArr[2],
      });
    } else {
      setIsError(true);
    }
  };

  return (
    <div
      className={classes.component_wrapper}
      key={idx}
      onDoubleClick={() => editHandler()}
      onBlur={() => saveHandler(idx)}
    >
      <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
      <div className={classes.component}>
        {isEdit ? (
          <TextField
            id="standard-multiline-flexible"
            error={isError}
            helperText={
              isError ? "Please give link in formate [Link Name](Link)" : ""
            }
            fullWidth={true}
            multiline
            rows={2}
            autoFocus
            defaultValue={
              !!component.value
                ? `[${component.value.linkName}](${component.value.link})`
                : "[link name](link)"
            }
            onChange={onChangeHandler}
            className={classes.link_field}
          />
        ) : (
          <div className={classes.link_component}>
            {!!component.value ? (
              <a
                href={component.value.link}
                className={classes.link}
                target="blank"
              >
                <span style={{ fontSize: 30 }}>{component.value.linkName}</span>
              </a>
            ) : (
              <span className={classes.default_text}>[Link Name](Link)</span>
            )}
          </div>
        )}
        <DeleteOutlineOutlinedIcon
          className={classes.delete_icon}
          onClick={() => deleteHandler(idx)}
        />
        {!isEdit ? (
          <EditOutlinedIcon
            className={classes.edit_icon}
            onClick={() => editHandler(idx)}
          />
        ) : (
          <SaveOutlinedIcon
            className={classes.edit_icon}
            onClick={() => saveHandler(idx)}
          />
        )}
        <DragHandle />
      </div>
    </div>
  );
};

//Draggable elements
const SortableItem = sortableElement((props) => <LinkComponent {...props} />);

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
  };
};

export default connect(mapStateToProps, mapActionToProps)(SortableItem);
