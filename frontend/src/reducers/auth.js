import { authConstants } from "../constants";
let initialState;
  initialState={
  user:null,
  loggedIn:false,
  error: null,
  }
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggedIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case authConstants.LOGOUT:
      return {
        user:null,
        loggedIn:false
      };
    default:
      return state;
  }
};
