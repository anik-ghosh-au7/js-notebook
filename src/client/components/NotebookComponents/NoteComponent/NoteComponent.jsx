import React from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

//styles
import useStyles from "../component.style";

const NoteComponent = ({ component, idx, deleteHandler }) => {
  const classes = useStyles();

  // edit state
  const [isEdit, setIsEdit] = React.useState(true);

  // note data state
  const [data, setData] = React.useState("");

  //Drag handler
  const DragHandle = sortableHandle(() => (
    <span className={classes.component_icon} title="Move Vertically">
      <NotesRoundedIcon />
    </span>
  ));

  const onChangeHandler = (e) => {
    setData(e.currentTarget.value);
  };

  // edit handler
  const editHandler = (idx) => {};

  return (
    <div
      className={classes.component_wrapper}
      key={idx}
      onDoubleClick={() => editHandler(idx)}
    >
      <h3 className={classes.input}>{`In [ ${idx + 1} ] : `}</h3>
      <div className={classes.component}>
        {isEdit ? (
          <TextareaAutosize
            rowsMin={3}
            placeholder="Type here"
            className={classes.text_field}
            fullWidth={true}
          />
        ) : (
          <h1 style={{ textAlign: "center" }}>{component}</h1>
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
          <SaveOutlinedIcon className={classes.edit_icon} />
        )}
        <DragHandle />
      </div>
    </div>
  );
};

//Draggable elements
const SortableItem = sortableElement((props) => <NoteComponent {...props} />);

export default SortableItem;

// {/*<TextField
//             id="standard-multiline-flexible"
//             multiline
//             rows={3}
//             fullWidth={true}
//             value={data}
//             className={classes.text_field}
//             onChange={onChangeHandler}
//           />
// eubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufh eubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufheubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufheubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufheubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufheubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufheubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufheubdfwufweurfrbfiwebrwfenfoiweo fwehnfoneworfnoiernoifnioernoif eroif eriofioer freiojfioerjijfioereifjei ewbfduiwebfuiew rfbwuoreofbewuofnweof ejr fbuoreuifrireo foreuifurenfutgnut tnoertgnioengiorneoirnfgioernf eriof ehrfef eiofoerjhfioherif eriofhioer fhierohf eriof herohferhf eruofhuerhfuerhferhofhreuiohfurehf eruhfuerhfuhhuerhufhuerhfuheruf reuhferfuerhfuerhuf erufhurehf erufhe rfuherf erufhe rfuherufh?
// */}
