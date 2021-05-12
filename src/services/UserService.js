import axios from "axios";
import apiurl from "../config/api";

export async function login(credentials) {
  return axios.post(apiurl.loginUrl, credentials)
    .then((result) => {
      const { token } = result.data.data;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return result;
    }).catch((error) => {
      console.log(error);
      return error.response;
    });
}

export async function logout() {
  return axios.get(apiurl.loginOutUrl)
    .then((result) => {
      return result;
    }).catch((error) => {
      console.log(error);
      return error.response;
    });
}
