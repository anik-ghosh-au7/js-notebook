import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { connect } from "react-redux";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import IconButton from "@material-ui/core/IconButton";

// components
import List from "./List";
import DropZone from "../DropZone/DropZone";

// styles
import useStyles from "./body.style";
import { SET_USER } from "../../redux/actions/user.action";

// edit button
const Button = ({ className, onClick }) => (
  <IconButton
    edge="end"
    aria-label="edit"
    name="edit_image"
    className={className}
    onClick={onClick}
  >
    <EditTwoToneIcon />
  </IconButton>
);

const Body = ({ userData, set_data }) => {
  const classes = useStyles();

  // state for button
  const [isShow, setIsShow] = React.useState(false);

  // initial user data
  const init_data = {
    Name: `${userData.firstName} ${
      !!userData.lastName ? userData.lastName : ""
    }`,
    Email: !!userData.email ? userData.email : "",
    Github: !!userData.github ? userData.github : "",
    Image: !!userData.img ? userData.img : null,
  };

  // field value state
  const [data, setUserData] = React.useState(init_data);

  const setData = (data) => {
    let names = data.Name.split(" ");
    let firstName = names[0];
    let lastName = names.slice(1, names.length).join(" ");
    setUserData(data);
    set_data({
      email: data.Email,
      github: data.Github,
      img: data.Image,
      firstName,
      lastName,
    });
  };

  // input modal open state
  const [isOpen, setIsOpen] = React.useState(false);

  // to change field type from text to input and vice-versa
  const [fieldType, setFieldType] = React.useState({ name: "" });

  const onMouseOver = () => {
    setIsShow(true);
  };

  const onMouseOut = () => {
    setIsShow(false);
  };

  const onButtonClick = () => {
    console.log("onclick");
    setIsOpen(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={6} onMouseOver={onMouseOver} onMouseLeave={onMouseOut}>
          <Card className={classes.card_root}>
            <CardMedia title="Profile Image">
              <Fragment>
                <img
                  src={data.Image}
                  className={classes.profile_img}
                  alt="profile"
                />
                {isShow && (
                  <Button className={classes.btn} onClick={onButtonClick} />
                )}
              </Fragment>
            </CardMedia>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <List
            data={data}
            setData={setData}
            init_data={init_data}
            fieldType={fieldType}
            setFieldType={setFieldType}
          />
        </Grid>
      </Grid>
      <DropZone
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
        setData={setData}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    set_data: (data) => dispatch({ type: SET_USER, payload: data }),
  };
};

export default connect(mapStateToProps, mapActionToProps)(Body);
