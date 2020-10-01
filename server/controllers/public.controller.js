// utils
import response from "../utils/response";

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
};
