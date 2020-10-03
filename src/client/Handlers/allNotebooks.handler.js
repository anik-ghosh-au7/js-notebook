import httpRequest from "../config/axios.config";

export default async () => {
  try {
    let response = await httpRequest({
      method: "GET",
      url: "http://localhost:5000/api/protected/all",
    });
    console.log("response==>", response);
  } catch (err) {
    console.log("error ===>", err.response);
  }
};
