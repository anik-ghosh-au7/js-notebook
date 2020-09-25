import React from "react";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";
import FolderSharedRoundedIcon from "@material-ui/icons/FolderSharedRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import BuildRoundedIcon from "@material-ui/icons/BuildRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import InsertChartRoundedIcon from "@material-ui/icons/InsertChartRounded";

export const mainButtons = (isSignIn, toggleSignIn) => {
  return [
    {
      name: "Create",
      Icon: () => <NoteAddRoundedIcon />,
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
    {
      name: "All Notebooks",
      Icon: () => <FileCopyRoundedIcon />,
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
      },
    },
    {
      name: "Shared Notebooks",
      Icon: () => <FolderSharedRoundedIcon />,
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
      onClick: (e) => {
        console.log(e.currentTarget);
        handleClick(e);
      },
    },
    {
      name: "Edit",
      Icon: () => <EditRoundedIcon />,
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
    {
      name: "Save",
      Icon: () => <SaveRoundedIcon />,
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
      },
    },
    {
      name: "Download",
      Icon: () => <GetAppRoundedIcon />,
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
    {
      name: "Share",
      Icon: () => <ShareRoundedIcon />,
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
      },
    },
    {
      name: "Delete",
      Icon: () => <DeleteRoundedIcon />,
      onClick: (e) => {
        if (!isSignIn) toggleSignIn();
        console.log(e.currentTarget);
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
        console.log(e.currentTarget);
      },
    },
    {
      name: "Code Snippet",
      Icon: () => <CodeRoundedIcon />,
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
    {
      name: "Image",
      Icon: () => <ImageRoundedIcon />,
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
    {
      name: "Link",
      Icon: () => <LinkRoundedIcon />,
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
    {
      name: "Chart",
      Icon: () => <InsertChartRoundedIcon />,
      onClick: (e) => {
        console.log(e.currentTarget);
      },
    },
  ];
};
