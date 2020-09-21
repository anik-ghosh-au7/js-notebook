import { SET_USER, CLEAR_USER } from "../redux/actions/user.action";

export const setUserData = (data, token) => (dispatch) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(data));
  let payload = {
    token,
    ...data,
  };

  dispatch({
    type: SET_USER,
    payload,
  });
};

export const clearUserData = () => (dispatch) => {
  localStorage.clear("token");
  localStorage.clear("user");
  dispatch({
    type: CLEAR_USER,
  });
};
