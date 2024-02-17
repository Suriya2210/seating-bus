import { urlConstants } from "../constants";
import { axios } from "../utils";

export const authService = {
  login,
  logout,
};

function login(username, password) {
  return axios
    .post(urlConstants.LOGIN, {
      email: username,
      password,
    })
    .then(response => {
      console.log("working fine")
      localStorage.setItem("user",response.data.data.associate_name);
      localStorage.setItem("jwt_token",response.data.jwt_token);
      return response.data;
    });
}

function logout() {
  console.log("Logout function called!");
  localStorage.removeItem("jwt_token");
}
