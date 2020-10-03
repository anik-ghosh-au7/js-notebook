import notebookModel from "../models/notebook.model";
import userModel from "../models/user.model";

// catching errors
import catchError from "../utils/catchError";
// utils
import response from "../utils/response";

const controller = {};

// create notebooks ---------------------------------------------------------------------------
controller.create = catchError(async (req, res, next) => {
  let notebook = new notebookModel(req.body);
  let data = await notebook.save();

  // adding notebook in user model
  req.user.notebooks.push(data._id);
  let userData = await req.user.save();
  console.log("user data ===>", userData);

  response(res, data, "notebook created successfully", false, 200);
});

// all notebooks --------------------------------------------------------------------------------
controller.all = catchError(async (req, res, next) => {
  await userModel
    .findById(req.user._id)
    .populate("notebooks")
    .exec()
    .then((docs) => {
      console.log("docs ==> ", docs);
      response(res, docs.notebooks, "all notebooks fetched", false, 200);
    });
});

export default controller;
