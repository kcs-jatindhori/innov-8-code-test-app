import * as UserService from "../services/UserService";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const login = (credentials) => async dispatch => {
  let retResponse = { status: false, data: {} };
  try {
    const resData = await UserService.login(credentials);
    if (resData.data.success) {
      dispatch({
        type: USER_LOGGED_IN,
        user: resData.data.data,
      });
    }
    return resData.data;
  } catch (e) {
    console.log('Login Error:', e);
  }
  return retResponse;
};


export const logout = () => async dispatch => {
  let retResponse = { status: false, data: {} };
  try {
    const data = await UserService.logout();
      dispatch({
        type: USER_LOGGED_OUT,
        user: []
      });
    return data.data;
  } catch (e) {
    console.log('Logout Error:', e);
  }
  return retResponse;
};
