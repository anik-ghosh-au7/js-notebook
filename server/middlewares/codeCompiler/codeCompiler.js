import { node } from "compile-run";

const middleware = async (req, res, next) => {
  try {
    if (!!req.fields && !!req.fields.code) {
      let result = await node.runSource(req.fields.code);
      if (!result.errorType) {
        req.codeResult = result;
      } else {
        let err_arr = result.stderr.split("\n");
        req.codeError = {
          error: err_arr[1],
          errorCause: err_arr[4],
          errorType: result.errorType,
        };
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default middleware;
