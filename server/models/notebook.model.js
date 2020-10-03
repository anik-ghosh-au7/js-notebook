import mongoose from "mongoose";
import { List } from "@material-ui/core";

// making schema
const notebookSchema = mongoose.Schema;

// defining schema
const notebook = new notebookSchema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  modifiedOn: {
    type: String,
    required: true,
  },
  components: [
    {
      type: String,
    },
  ],
});

// creating model
const notebookModel = mongoose.model("notebook", notebook);

export default notebookModel;
