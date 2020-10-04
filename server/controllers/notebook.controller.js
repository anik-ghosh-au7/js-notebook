import notebookModel from "../models/notebook.model";
import userModel from "../models/user.model";

// catching errors
import catchError from "../utils/catchError";
// utils
import response from "../utils/response";

const controller = {};

// create and update notebooks ---------------------------------------------------------------------------
controller.create = catchError(async (req, res, next) => {
  // find notebook
  let notebook = await notebookModel.findOneAndUpdate(
    { id: req.body.id },
    { ...req.body },
    { new: true }
  );

  if (!notebook) {
    notebook = new notebookModel(req.body);
    let data = await notebook.save();
    // adding notebook in user model
    req.user.notebooks.push(data._id);
    await req.user.save();
  }

  response(res, null, "notebook saved successfully", false, 200);
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

// sharing notebook ------------------------------------------------------------------------------
controller.share = catchError(async (req, res, next) => {
  // if user try to share with himself
  if (req.user.email === req.body.email)
    return response(res, null, `You can't share with yourself`, true, 400);

  // if not, find user
  let shareWith = await userModel.findOne({ email: req.body.email });

  // if user (with whom to share) not found
  if (!shareWith)
    return response(
      res,
      null,
      `Person with email ${req.body.email} not found.`,
      true,
      404
    );

  // if user found then find notebook
  let notebookToShare = await notebookModel.findOne({
    id: req.body.notebookId,
  });

  // if notebook not found
  if (!notebookToShare)
    return response(
      res,
      null,
      "Please save the notebook before sharing",
      true,
      404
    );

  // if all good
  req.user.shared.push(notebookToShare._id);
  await req.user.save();

  shareWith.received.push(notebookToShare._id);
  await shareWith.save();

  response(
    res,
    null,
    `Notebook shared with ${shareWith.firstName}`,
    false,
    200
  );
});

// shared notebooks ----------------------------------------------------------------------
controller.shared = catchError(async (req, res, next) => {
  await userModel
    .findById(req.user._id)
    .populate("shared")
    .exec()
    .then((docs) => {
      console.log("docs ==> ", docs);
      response(res, docs.shared, "all shared notebooks fetched", false, 200);
    });
});

// received notebooks ----------------------------------------------------------------------
controller.received = catchError(async (req, res, next) => {
  await userModel
    .findById(req.user._id)
    .populate("received")
    .exec()
    .then((docs) => {
      console.log("docs ==> ", docs);
      response(
        res,
        docs.received,
        "all received notebooks fetched",
        false,
        200
      );
    });
});

// delete notebook ------------------------------------------------------------------------
controller.delete = catchError(async (req, res, next) => {
  let notebook = await notebookModel.findOneAndDelete({ id: req.body.id });
  console.log("Notebook===>", notebook);
  // if not found
  if (!notebook)
    return response(res, null, `Can't find the notebook`, true, 404);

  response(res, null, "Notebook deleted successfully", false, 200);
});

export default controller;
