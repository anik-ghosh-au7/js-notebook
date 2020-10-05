// model
import notebookModel from "../models/notebook.model";

// utils
import response from "../utils/response";
import catchError from "../utils/catchError";

export default {
  imageController: (req, res) => {
    if (!!req.imgUrl) {
      response(res, { url: req.imgUrl }, "upload successful", false, 200);
      //   res.status(200).send({ url: req.imgUrl });
    } else {
      response(res, null, "upload unsuccessful, try again!!", true, 400);
      //   res.status(400).send({ err: "Upload unsuccessful, try again!!" });
    }
  },
  codeController: (req, res) => {
    if (!!req.codeResult && req.codeResult.stdout.length > 0) {
      response(
        res,
        { result: req.codeResult.stdout },
        "compilation successful",
        false,
        200
      );
    } else {
      response(
        res,
        { err: req.codeError },
        "compilation failed, try again!!",
        true,
        400
      );
    }
  },

  // search notebooks by title ----------------------------------------------------------------
  searchController: catchError(async (req, res, next) => {
    let nextPage = false,
      prevPage = false;
    let query = req.query.query.trim();
    let { limit, page } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    let notebooks = [];

    if (!!query) {
      notebooks = await notebookModel
        .find({
          $or: [{ title: query }, { title: { $regex: query, $options: "i" } }],
        })
        .skip((page - 1) * limit)
        .limit(limit + 1)
        .sort({ title: "asc" })
        .exec();
    }

    if (notebooks.length > limit) {
      nextPage = true;
      notebooks = notebooks.slice(0, notebooks.length - 1);
    }

    if (page > 1) prevPage = true;

    let data = {
      notebooks,
      prevPage,
      nextPage,
    };

    response(res, data, "Search result", false, 200);
  }),
};
