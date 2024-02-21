// import { Redirect } from "react-router";
import { useHistory } from 'react-router-dom';
import  Home  from "../components/Home/Home";
import { Login } from "../components/Login";
import UserManagementPage  from "../components/Admin/UserManagement/UserManagementPage";
import AdminHomePage  from "../components/Admin/AdminHomePage/AdminHomePage";
import ViewUserPage from "../components/Admin/ViewUserPage/ViewUserPage"
import  BookSeatPage  from "../components/BookSeatPage/BookSeatPage";
import AddNewUser from "../components/Admin/AddNewUser/AddNewUser"
import Table from "../components/Table";
import AuthLayout from "../layouts/Auth";
import DashboardLayout from '../layouts/Dashboard';

import Admin_seatlayout from "../components/Seats/AdminLayout/Admin_seatlayout"
import Manager_seatlayout from "../components/Seats/ManagerLayout/Manager_seatlayout";
import Employee_seatlayout from "../components/Seats/EmployeeLayout/Employee_seatlayout";


import UserProfile from "../components/User/UserProfilePage/UserProfile";
import UserBookHistory from "../components/User/UserBookHistory/UserBookHistory";

const history=useHistory();


export const routes = [
  {
    path: "/",
    exact: true,
    component: () => history.push("/home")
  },
  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      {
        path: "/auth/login",
        exact: true,
        component: Login,
      },
    ],
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: "/home",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <Home /> : history.push("/auth/login") }
          ,
      },
      {
        path: "/seatlayout",
        exact: true,
        component: (props) => {return !props.isAuthenticated ? history.push("/auth/login") : localStorage.getItem('id')==7 ? <Admin_seatlayout/> :  localStorage.getItem('id')==1234 ? <Manager_seatlayout/> : <Employee_seatlayout/> }
        // component: (props) => {return props.isAuthenticated ? <Page /> : history.push("/auth/login" />}
      },
      {
        path: "/admin/usermanagement",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <UserManagementPage /> : history.push("/auth/login")}
      },
      {
        path: "/user/userprofile",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <UserProfile /> : history.push("/auth/login" ) }
          ,
      },
      {
        path: "/user/userbookhistory",
        exact: true,
        component: (props) => {return props.isAuthenticated ?  <UserBookHistory /> : history.push("/auth/login") }
          ,
      },
      {
        path: "/admin/adminhome",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <AdminHomePage /> : history.push("/auth/login") }
          ,
      },
      {
        path: "/admin/viewuser/:associate_id",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <ViewUserPage /> : history.push("/auth/login")}
          ,
      },
      {
        path: "/bookyourseat",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <BookSeatPage /> : history.push("/auth/login")}
          ,
      },
      {
        path: "/admin/addnewuser",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <AddNewUser /> : history.push("/auth/login")}
          ,
      },
      {
        path:"/table",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <Table /> : history.push("/auth/login")}
      }
    ]
  }
];
