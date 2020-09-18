const response = (res, data, msg, isError, statusCode) => {
  res.status(statusCode).json({
    msg,
    isError,
    data,
  });
};

export default response;
