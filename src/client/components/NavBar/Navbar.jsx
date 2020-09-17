import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";

// style
import useStyles from "./navBar.style";

// reducer actions
import { signin, signup } from "../../redux/actions/sign.action";

const NavBar = (props) => {
  const { toggleSignIn, toggleSignUp } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleModal = (event) => {
    if (event.target.innerText === "Sign-In") {
      toggleSignIn();
    }
    if (event.target.innerText === "Sign-Up") {
      toggleSignUp();
    }
    handleMenuClose();
  };

  const flag = true;

  const menuId = "primary-search-account-menu";
  const renderMenu = flag ? (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem name="signin" onClick={toggleModal}>
        Sign-In
      </MenuItem>
      <MenuItem name="signup" onClick={toggleModal}>
        Sign-Up
      </MenuItem>
    </Menu>
  ) : (
    <div>hello world</div>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = flag ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  ) : (
    <div>hello world</div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/*start icon*/}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="secondary"
          >
            <MenuIcon />
          </IconButton>

          {/*logo*/}
          <Typography
            color="secondary"
            className={classes.title}
            variant="h6"
            noWrap
          >
            JS-NoteBook
          </Typography>

          {/*search bar*/}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color="secondary" />
            </div>
            <InputBase
              style={{ color: "white" }}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>

          {/*space between search and profile*/}
          <div className={classes.grow} />

          {/*profile icon*/}
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
              color="secondary"
            >
              <AccountCircle />
            </IconButton>
          </div>

          {/*profile icon mobile version*/}
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    toggleSignUp: () => {
      dispatch({
        type: signup,
      });
    },
    toggleSignIn: () => {
      dispatch({
        type: signin,
      });
    },
  };
};

export default connect(null, mapActionToProps)(NavBar);
