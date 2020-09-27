import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// style
import { StyledMenu, StyledMenuItem } from "./tool.style";

// tool buttons
import { toolButtons } from "./buttons";

const Tools = ({ handleClose, anchorEl }) => {
  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {toolButtons().map((button, index) => {
          const { name, Icon, onClick } = button;
          return (
            <StyledMenuItem key={index} onClick={onClick}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
};

export default Tools;
