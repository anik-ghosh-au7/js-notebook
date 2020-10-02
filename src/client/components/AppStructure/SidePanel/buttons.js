import React from "react";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";
import FolderSharedRoundedIcon from "@material-ui/icons/FolderSharedRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import BuildRoundedIcon from "@material-ui/icons/BuildRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import InsertChartRoundedIcon from "@material-ui/icons/InsertChartRounded";
import ClearAllRoundedIcon from "@material-ui/icons/ClearAllRounded";

// handlers
import {
  addComponent,
  clearAllComponents,
  deleteNotebook,
  runAllCode,
} from "../../../Handlers";

export const mainButtons = (isSignIn, toggleSignIn, history, addNotebook) => {
  return [
    {
      name: "Create",
      Icon: () => <NoteAddRoundedIcon />,
      label: "Create",
      onClick: (e) => {
        if (history.location.pathname !== "/create") history.push("/create");
        else addNotebook();
      },
    },
    {
      name: "All Notebooks",
      Icon: () => <FileCopyRoundedIcon />,
      label: "All Notebooks",
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
      },
    },
    {
      name: "Shared Notebooks",
      Icon: () => <FolderSharedRoundedIcon />,
      label: "Shared Notebooks",
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
      },
    },
  ];
};

export const notebookButtons = (isSignIn, toggleSignIn, handleClick) => {
  return [
    {
      name: "Tools",
      Icon: () => <BuildRoundedIcon />,
      label: "Tools",
      onClick: (e) => {
        handleClick(e);
      },
    },
    {
      name: "Run All",
      Icon: () => <PlayCircleFilledRoundedIcon />,
      label: "Run All",
      onClick: () => {
        runAllCode();
      },
    },
    {
      name: "Save",
      Icon: () => <SaveRoundedIcon />,
      label: "Save",
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
      },
    },
    {
      name: "Download",
      Icon: () => <GetAppRoundedIcon />,
      label: "Download",
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
    {
      name: "Share",
      Icon: () => <ShareRoundedIcon />,
      label: "Share",
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
      },
    },
    {
      name: "Clear All",
      Icon: () => <ClearAllRoundedIcon />,
      label: "Clear All",
      onClick: () => {
        clearAllComponents();
      },
    },
    {
      name: "Delete",
      Icon: () => <DeleteRoundedIcon />,
      label: "Delete",
      onClick: () => {
        deleteNotebook();
      },
    },
  ];
};

export const toolButtons = () => {
  return [
    {
      name: "Note",
      Icon: () => <NotesRoundedIcon />,
      onClick: (e) => {
        addComponent("Note");
      },
    },
    {
      name: "Code Snippet",
      Icon: () => <CodeRoundedIcon />,
      onClick: (e) => {
        addComponent("Code");
      },
    },
    {
      name: "Image",
      Icon: () => <ImageRoundedIcon />,
      onClick: (e) => {
        addComponent("Image");
      },
    },
    {
      name: "Link",
      Icon: () => <LinkRoundedIcon />,
      onClick: (e) => {
        addComponent("Link");
      },
    },
    {
      name: "Chart",
      Icon: () => <InsertChartRoundedIcon />,
      onClick: (e) => {
        addComponent("Chart");
      },
    },
  ];
};
