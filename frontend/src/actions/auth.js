import { authConstants } from "../constants";
import { history } from "../helpers/history";
import { authService } from "../services";

export const authActions = {
  login,
  logout,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request(username));
    authService.login(username, password).then(response => {
        dispatch(success({user_name:response.data.associate_name,user_email:response.data.email}));
        const isAdmin = response.data.isAdmin;
        if(isAdmin){
          history.push('/admin/adminhome');
        }else{
          history.push('/');
        }
       
    })
    .catch(error => {
        if(error.response){
            dispatch(failure(error.response.data.message || error.response.statusText));
        }
        else{
            dispatch(failure(error))
        }
    });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    console.log("Name from actions : "+user.user_name);
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}
