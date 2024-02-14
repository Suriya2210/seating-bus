import { Redirect } from "react-router";
import { Home } from "../components/Home";
import { Login } from "../components/Login";
import  UserManagementPage  from "../components/Admin/UserManagement/UserManagementPage";
import  BookSeatPage  from "../components/BookSeatPage/BookSeatPage";
import AddNewUser from "../components/Admin/AddNewUser/AddNewUser"
import Table from "../components/Table";
import AuthLayout from "../layouts/Auth";
import DashboardLayout from '../layouts/Dashboard';

export const routes = [
  {
    path: "/",
    exact: true,
    component: () =>  <Redirect to="/home" />,
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
        component: (props) => {return props.isAuthenticated ? <Home /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/admin/usermanagement",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <UserManagementPage /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/bookyourseat",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <BookSeatPage /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/admin/addnewuser",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <AddNewUser /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path:"/table",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <Table /> : <Redirect to="/auth/login" />}
      }
    ]
  }
];
