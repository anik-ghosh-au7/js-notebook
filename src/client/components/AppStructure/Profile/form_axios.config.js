const createConfig = () => {
  const authToken = localStorage.getItem("token");
  console.log("token ==> ", authToken);

  if (!!authToken) {
    return {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
      },
    };
  } else {
    return {
      headers: { "Content-Type": "multipart/form-data" },
    };
  }
};

export default createConfig;
