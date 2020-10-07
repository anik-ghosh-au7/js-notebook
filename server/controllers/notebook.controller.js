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
  let prevPage = false,
    nextPage = false;
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  let { notebooks } = await userModel
    .findById(req.user._id)
    .populate("notebooks")
    .exec();

  if (notebooks.length > limit) {
    nextPage = true;
    notebooks = notebooks.slice((page - 1) * limit, limit * page);
  }

  if (page > 1) prevPage = true;

  let data = { notebooks, prevPage, nextPage };

  response(res, data, "all notebooks fetched", false, 200);
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

  // check if notebook already present in users shared fields
  let idxOfShared = req.user.shared.findIndex(
    (id) => String(id) === String(notebookToShare._id)
  );

  console.log("index of shared ==>", idxOfShared);

  if (idxOfShared === -1) {
    // if all good
    req.user.shared.push(notebookToShare._id);
    await req.user.save();
  }

  // check if notebook already present in receivers received field
  let idxOfReceived = shareWith.received.findIndex(
    (id) => String(id) === String(notebookToShare._id)
  );

  console.log("received index ==>", idxOfReceived);

  // if notebook is already shared
  if (idxOfReceived !== -1)
    return response(
      res,
      null,
      `Notebook is already shared with ${shareWith.firstName}`,
      false,
      200
    );

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
  let prevPage = false,
    nextPage = false;
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  let { shared } = await userModel
    .findById(req.user._id)
    .populate("shared")
    .exec();

  if (shared.length > limit) {
    nextPage = true;
    shared = shared.slice((page - 1) * limit, limit * page);
  }

  if (page > 1) prevPage = true;

  let data = { notebooks: shared, prevPage, nextPage };

  response(res, data, "all shared notebooks fetched", false, 200);
});

// received notebooks ----------------------------------------------------------------------
controller.received = catchError(async (req, res, next) => {
  let prevPage = false,
    nextPage = false;
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  let { received } = await userModel
    .findById(req.user._id)
    .populate("received")
    .exec();

  if (received.length > limit) {
    nextPage = true;
    received = received.slice((page - 1) * limit, limit * page);
  }

  if (page > 1) prevPage = true;

  let data = { notebooks: received, prevPage, nextPage };

  response(res, data, "all received notebooks fetched", false, 200);
});

// delete notebook ------------------------------------------------------------------------
controller.delete = catchError(async (req, res, next) => {
  let notebook = await notebookModel.findOneAndDelete({ id: req.body.id });
  // if not found
  if (!notebook)
    return response(res, null, `Can't find the notebook`, true, 404);

  response(res, null, "Notebook deleted successfully", false, 200);
});

export default controller;
