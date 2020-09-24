const simplyfyErr = (err) => {
  let uniqKey = {};
  let arr = [];
  err.map((e) => {
    if (!(e.param in uniqKey)) {
      uniqKey[e.param] = true;
      arr.push(e);
    }
  });
  return arr;
};

export default simplyfyErr;
